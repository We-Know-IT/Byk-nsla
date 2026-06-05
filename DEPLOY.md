# Deploying Bykänsla on DigitalOcean

This guide walks through production deployment on a **DigitalOcean Droplet** using **Docker Compose**, with **Managed PostgreSQL** (recommended) and **Caddy** for HTTPS. The same Docker setup works locally; see the [README](README.md#docker-quick-start) for a one-command dev stack.

## Architecture

```text
Internet
    │
    ├── app.yourdomain.com ──► Caddy (443) ──► web container (:3000)
    │
    └── api.yourdomain.com ──► Caddy (443) ──► backend container (:4000)
                                      │
                                      └──► DigitalOcean Managed PostgreSQL
```

| Component | Role |
| --- | --- |
| **Droplet** | Runs Docker: `web`, `backend`, and optionally local `db` |
| **Managed PostgreSQL** | Production database (recommended) |
| **Caddy** (on host) | TLS termination and reverse proxy to published ports |
| **DNS** | `app` and `api` A records pointing at the Droplet |

### Environment variables (production)

| Variable | Where | Example |
| --- | --- | --- |
| `DATABASE_URL` | backend, migrate | `postgresql://user:pass@db-host:25060/bykansla?sslmode=require` |
| `BACKEND_URL` | web (runtime) | `http://backend:4000` (internal Compose hostname) |
| `APP_URL` | web (runtime) | `https://app.yourdomain.com` |
| `NEXT_PUBLIC_API_URL` | web (**build time**) | `https://api.yourdomain.com/api` |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | web (build time) | Your Mapbox token |

`NEXT_PUBLIC_*` values are embedded when the **web image is built**. After changing them, rebuild:

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d web
```

Some features (admin theme, navigation, root layout) call the API **from the browser** using `NEXT_PUBLIC_API_URL`. Next.js API routes use `BACKEND_URL` for server-side calls only.

---

## Prerequisites

- [DigitalOcean](https://www.digitalocean.com/) account
- Domain name (optional but required for HTTPS with Let's Encrypt)
- SSH key added to your DO account
- Git access to this repository

---

## 1. Create Managed PostgreSQL

1. In the DigitalOcean control panel: **Databases** → **Create Database Cluster**.
2. Choose **PostgreSQL 15** (or compatible), the **same region** as your Droplet.
3. Name the database (e.g. `bykansla`) and note the connection details.
4. Under **Users & Databases**, ensure your app user can access that database.
5. **Trusted sources**: add your Droplet’s public IP (or use VPC peering if Droplet and DB are in the same VPC).
6. Copy the **connection string** (URI). Append SSL if required:

   ```text
   postgresql://doadmin:PASSWORD@db-host.db.ondigitalocean.com:25060/bykansla?sslmode=require
   ```

Use this as `DATABASE_URL` in your server `.env` file.

---

## 2. Create a Droplet

1. **Create** → **Droplets**.
2. **Image**: Ubuntu 24.04 LTS (or 22.04).
3. **Size**: at least **2 GB RAM / 1 vCPU** (web + API + OS).
4. **Region**: same as the database cluster.
5. **Authentication**: SSH key (recommended).
6. Create the Droplet and note its **public IP**.

### Install Docker on the Droplet

SSH in as root or a sudo user:

```bash
ssh root@YOUR_DROPLET_IP
```

Install Docker and the Compose plugin:

```bash
apt-get update
apt-get install -y ca-certificates curl
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
chmod a+r /etc/apt/keyrings/docker.asc
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt-get update
apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

Optional: add your deploy user to the `docker` group.

### Firewall

Allow SSH and HTTP/S only; do not expose app ports publicly once Caddy is in place:

```bash
ufw allow OpenSSH
ufw allow 80
ufw allow 443
ufw enable
```

---

## 3. Deploy the application

### Clone and configure

```bash
cd /opt
git clone https://github.com/YOUR_ORG/Byk-nsla.git bykansla
cd bykansla
cp .env.docker.example .env
nano .env
```

Set production values in `.env`:

```env
DATABASE_URL=postgresql://doadmin:PASSWORD@db-host.db.ondigitalocean.com:25060/bykansla?sslmode=require

BACKEND_URL=http://backend:4000
BACKEND_PORT=4000
WEB_PORT=3000

APP_URL=https://app.yourdomain.com
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token

WEATHER_PROVIDER=mock
```

Build and start **without** the local Postgres container (Managed DB):

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
```

The `migrate` service runs `prisma migrate deploy` once; then `backend` and `web` start.

### Verify (before TLS)

On the Droplet:

```bash
curl -s http://127.0.0.1:4000/health
curl -sI http://127.0.0.1:3000
docker compose -f docker-compose.yml -f docker-compose.prod.yml logs migrate
```

### All-in-one (small / trial)

To run Postgres on the same Droplet (not recommended for production):

```bash
docker compose up --build -d
```

Use `DATABASE_URL=postgresql://admin:adminpassword@db:5432/bykansla` from `.env.docker.example`.

---

## 4. DNS

At your registrar or **DigitalOcean Networking → Domains**:

| Type | Host | Value |
| --- | --- | --- |
| A | `app` | Droplet public IP |
| A | `api` | Droplet public IP |

Wait for DNS to propagate before configuring HTTPS.

---

## 5. TLS with Caddy (on the host)

Install Caddy on the Droplet (not in Compose) so it can obtain certificates and proxy to published ports.

```bash
apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list
apt update
apt install caddy
```

Create `/etc/caddy/Caddyfile`:

```caddy
app.yourdomain.com {
    reverse_proxy localhost:3000
}

api.yourdomain.com {
    reverse_proxy localhost:4000
}
```

Replace hostnames with your domain. Reload:

```bash
systemctl reload caddy
```

Caddy requests Let's Encrypt certificates automatically. Ensure ports **80** and **443** reach the Droplet.

### Rebuild web after HTTPS API URL

If you first built with `http://localhost:4000/api`, update `.env` with `NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api` and rebuild:

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d web
```

---

## 6. Updates and migrations

On each release:

```bash
cd /opt/bykansla
git pull
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
```

Migrations run via the `migrate` service on every `up`. Check logs if deploy fails:

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml logs -f migrate backend web
```

---

## 7. Backups and operations

| Resource | Recommendation |
| --- | --- |
| Managed PostgreSQL | Enable automated backups in the DO database panel |
| Local `db` volume | Snapshot Droplet or attached volume |
| Secrets | Keep only in server `.env`; never commit |

Rotate database passwords in DO and update `.env`, then restart:

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

---

## 8. Troubleshooting

| Symptom | Likely cause | What to check |
| --- | --- | --- |
| `migrate` exits with error | DB unreachable or SSL | `DATABASE_URL`, trusted sources on Managed DB, `?sslmode=require` |
| Events return 502 | Backend down or wrong `BACKEND_URL` | `curl http://127.0.0.1:4000/health`, `docker compose logs backend` |
| Admin / theme broken | Wrong public API URL | `NEXT_PUBLIC_API_URL` must match `https://api.yourdomain.com/api`; rebuild web image |
| Certificate errors | DNS not pointing to Droplet | `dig app.yourdomain.com`, Caddy logs: `journalctl -u caddy` |
| Cannot connect to DB from Droplet | Firewall | Add Droplet IP under database **Trusted sources** |

---

## 9. Optional: Container Registry

For faster deploys you can build images locally or in CI, push to **DigitalOcean Container Registry**, and change `docker-compose.yml` to `image:` instead of `build:`. That is optional; building on the Droplet is fine for small teams.

---

## 10. Security checklist

- [ ] Strong unique `DATABASE_URL` credentials (Managed DB)
- [ ] `.env` only on the server, not in git
- [ ] `ufw` allows only 22, 80, 443
- [ ] Database trusted sources limited to Droplet IP / VPC
- [ ] SSH key authentication (disable password login if possible)
- [ ] `NEXT_PUBLIC_*` and secrets not baked into public repos

---

## Local Docker reference

```bash
cp .env.docker.example .env
docker compose up --build
```

- Web: http://localhost:3000  
- API: http://localhost:4000  
- Health: http://localhost:4000/health  

Postgres only (for `npm run dev`):

```bash
docker compose up db -d
```

See [README.md](README.md) for local development without Docker.
