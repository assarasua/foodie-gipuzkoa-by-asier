# Gipuzkoa Foodie

Curated restaurant guide for Gipuzkoa with React frontend and Railway API backend.

## Stack

- Vite
- React + TypeScript
- Tailwind CSS + shadcn/ui
- Express + Prisma (apps/api)
- PostgreSQL (Railway)

## Local development

```sh
npm install
npm run dev
```

API (separate terminal):

```sh
npm run dev:api
```

## Build

```sh
npm run build
npm run build:api
```

## Database

```sh
npm run api:migrate
npm run api:seed
```

Backend deployment/env reference:

- `docs/railway-backend.md`

## Cloudflare deploy

`wrangler.jsonc` is configured for static assets and SPA fallback.

```sh
npm run deploy:cf
```
