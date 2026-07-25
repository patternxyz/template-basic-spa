# React + NestJS monorepo

Minimal npm-workspace monorepo with a Vite React SPA and a NestJS/Express API backed by PostgreSQL through TypeORM.

## Development

Requires Node.js 22.13 or newer and a reachable PostgreSQL database.

```sh
nvm use
cp .env.example .env
npm install
npm run dev
```

The SPA runs at `http://localhost:5173` and proxies `/api` to the API at `http://localhost:3000`.

## Production

```sh
npm run build
npm start
```

Or build and run the container:

```sh
docker build -t basic-spa .
docker run --env-file .env -p 3000:3000 basic-spa
```

Set `DB_SYNCHRONIZE=true` only for local prototyping. Use migrations in production.
