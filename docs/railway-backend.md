# Railway backend setup

## Production variables (API service)

Set these variables in Railway for the backend service:

- `DATABASE_PUBLIC_URL=postgresql://postgres:kGjmxboctzzrvZOFBjSJQXxlyaouvapM@gondola.proxy.rlwy.net:47227/railway`
- `DATABASE_URL=${DATABASE_PUBLIC_URL}`
- `API_BASE_URL=https://api.gipuzkoafoodie.eu`
- `CORS_ORIGIN=https://gipuzkoafoodie.eu,https://www.gipuzkoafoodie.eu`
- `PORT=8080`
- `NODE_ENV=production`

## Production variables (Web service)

- `VITE_API_URL=https://api.gipuzkoafoodie.eu/v1`

## API endpoints

- `GET /v1/health`
- `GET /v1/categories?locale=es|en`
- `GET /v1/restaurants?locale=es|en&categorySlug=<slug>&includeYoungTalents=false&page=1&limit=24`

## Local backend commands

From repository root:

```bash
npm --prefix apps/api install
npm run api:migrate
npm run api:seed
npm run dev:api
```

## Notion import format for restaurants

Preferred source files (in this order):

- `apps/api/prisma/restaurants.notion.csv`
- `apps/api/prisma/restaurants.notion.json`
- fallback legacy: `apps/api/prisma/restaurants.notion.txt`

CSV/JSON columns supported:

- `Categoria`
- `Nombre`
- `Valoracion` (number or stars)
- `Precio` (`€`, `€€`, `€€€`, `€€€€`)
- `🧑‍🍳 especialidad`
- `🎯 comentario`
- `Google maps`
- optional: `Ciudad`

Then run:

```bash
npm run api:seed
```

If valid lines exist, seed will use Notion data to rebuild categories and restaurants.

## Validation checklist

```bash
curl https://api.gipuzkoafoodie.eu/v1/health
```

Expected: status code `200` and JSON payload with `status: "ok"`.

## Security note

Do not expose `DATABASE_URL` or `DATABASE_PUBLIC_URL` in frontend code.
Rotate DB credentials after the first stable production deployment.
