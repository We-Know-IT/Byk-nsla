# Bykänsla Backend

Simple TypeScript + Express backend with adapter-based integration boundaries.

## Run

1. Copy `.env.example` to `.env`.
2. Install dependencies:
   - `npm install`
3. Start dev server:
   - `npm run dev`

Server default: `http://localhost:4000`

## Available endpoints

- `GET /health`
- `GET /api/events`
- `GET /api/weather`

## Adapter structure

- `src/adapters/contracts/` - interfaces (ports) consumed by modules
- `src/adapters/providers/` - concrete providers (mock first)
- `src/adapters/registry/` - provider selection from environment

Modules only depend on contracts, not provider internals.

## Provider switching

Current providers:

- **Events:** `EVENTS_PROVIDER=mock` (default) or `EVENTS_PROVIDER=ticketmaster`
- **Weather:** `WEATHER_PROVIDER=mock`

### Ticketmaster events (testdata)

Set `EVENTS_PROVIDER=ticketmaster` and provide an API key:

- `TICKETMASTER_API_KEY` or `TICKETMASTER_CONSUMER_KEY` (either name works)

Optional discovery filters (defaults match the bykansla-api-tester playground):

- `TICKETMASTER_CITY` (default `Lund`)
- `TICKETMASTER_COUNTRY_CODE` (default `SE`)
- `TICKETMASTER_SIZE` — page size (default `20`)
- `TICKETMASTER_SORT` (default `date,asc`)

To add another real provider:

1. Add a class in `src/adapters/providers/` implementing the contract.
2. Extend `src/config/env.ts` provider parser if needed.
3. Update the corresponding registry switch in `src/adapters/registry/`.
4. No route-handler changes should be needed.
