# Bykänsla

## Prerequisites

- **Node.js** 20+ (LTS recommended)
- **npm** (ships with Node)

## Quick start

Run the API and the web app in **two terminals** from the repository root.

### 1. Backend API

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Default URL: [http://localhost:4000](http://localhost:4000). Health check: [http://localhost:4000/health](http://localhost:4000/health).

### 2. Web app

```bash
cd web
cp .env.example .env
npm install
npm run dev
```

Default URL: [http://localhost:3000](http://localhost:3000).

The Next.js app proxies data through **App Router API routes** (`web/app/api/...`), which call the backend using `BACKEND_URL` (default `http://localhost:4000`). Start the backend first if you use features that depend on it.

### Environment variables

| App | File | Purpose |
| --- | --- | --- |
| Backend | `backend/.env` | `PORT`, `EVENTS_PROVIDER`, `WEATHER_PROVIDER`, optional Ticketmaster keys — see `backend/.env.example` and [backend/README.md](backend/README.md). |
| Web | `web/.env` | `NEXT_PUBLIC_MAPBOX_TOKEN` for Mapbox maps (start page and Samhällsbygge). Optional: `BACKEND_URL` (default `http://localhost:4000`), `APP_URL` (default `http://localhost:3000`) for server-side fetches to your own API routes. |

Never commit real secrets; keep them in local `.env` files (they are gitignored where applicable).

## Repository layout

```text
Lineroligt/
├── backend/          # Express API (adapters, modules, routes)
├── web/              # Next.js App Router UI + BFF-style API routes
├── temp-docs/        # Scratch / internal docs (optional)
└── README.md         # This file
```

### Backend (`backend/`)

TypeScript **Express** server with an **adapter** pattern: domain modules depend on contracts (ports); concrete providers (mocks, Ticket Lund APIs, etc.) are selected via environment variables.

| Path | Role |
| --- | --- |
| `src/server.ts` | HTTP server entry |
| `src/app.ts` | Express app wiring (middleware, routers) |
| `src/routes/` | HTTP route handlers |
| `src/modules/` | Domain services used by routes |
| `src/adapters/contracts/` | Port interfaces |
| `src/adapters/providers/` | Provider implementations |
| `src/adapters/registry/` | Maps `env` → provider instance |
| `src/config/env.ts` | Typed environment configuration |
| `src/shared/` | Shared HTTP helpers |

**Useful scripts:** `npm run dev`, `npm run dev:watch`, `npm run build`, `npm start`, `npm run lint`.

**HTTP API (current):**

- `GET /health`
- `GET /api/events`
- `GET /api/weather`
- `GET /api/frivilligkraft`
- `GET /api/samhallsbygge`

Provider switching (events, weather, etc.) is documented in [backend/README.md](backend/README.md).

### Web (`web/`)

**Next.js 16** App Router, **React 19**, **Tailwind CSS 4**, **Mapbox GL** where maps are used.

| Path | Role |
| --- | --- |
| `app/page.tsx` | Home / start route |
| `app/layout.tsx` | Root layout |
| `app/*/page.tsx` | Top-level routes (e.g. `event`, `frivilligkraft`, `samhallsbygge`, `utforska`, `trafik`, `vader`) |
| `app/api/` | Next.js route handlers that forward to the backend |
| `app/modules/` | Feature UI and data hooks per module |
| `app/shared/` | Shared UI, `site.config.ts`, module nav config |
| `app/adapters/` | Client-side adapters (e.g. map provider) |
| `public/` | Static assets |

**Useful scripts:** `npm run dev`, `npm run build`, `npm start`, `npm run lint`.

Branding and area copy live in `web/app/shared/config/site.config.ts`. Navigation modules are listed in `web/app/shared/config/modules.ts`.

## Production builds

Backend:

```bash
cd backend
npm run build
npm start
```

Web:

```bash
cd web
npm run build
npm start
```

Set `BACKEND_URL`, `APP_URL`, and any provider keys appropriately for your deployment environment.
