# Manky

Manky is a web application for learning words — building and drilling vocabulary
to help you memorize new words and their meanings.

> The project is in an early stage; the UI is still a placeholder while the
> foundations are being put in place.

## Tech stack

- **[Next.js](https://nextjs.org) 16** (App Router) with **React 19** and **TypeScript**.
- **[oxlint](https://oxc.rs)** for linting and **oxfmt** for formatting.
- **[pnpm](https://pnpm.io)** as the package manager.
- **PostgreSQL 18** as the database (run via Docker Compose).
- **Docker** multi-stage build producing a minimal standalone image.

> **Note on Next.js:** this project pins a version of Next.js with breaking
> changes from the widely known releases — APIs, conventions, and file structure
> may differ. The bundled guides under `node_modules/next/dist/docs/` are the
> source of truth; see `AGENTS.md` for details.

## Getting started

Install dependencies and start the development server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app. The page
auto-updates as you edit files under `app/`.

### Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the development server |
| `pnpm build` | Build for production |
| `pnpm start` | Run the production build (`next start`) |
| `pnpm lint` | Lint with oxlint |
| `pnpm lint:fix` | Lint and auto-fix |
| `pnpm fmt` | Format with oxfmt |

## Docker

The app and a PostgreSQL database are defined in `docker-compose.yml`. Provide
a `.env` file with `POSTGRES_USER`, `POSTGRES_PASSWORD`, and `POSTGRES_DB`, then:

```bash
docker compose up --build
```

The app is served on [http://localhost:3000](http://localhost:3000) and Postgres
is exposed on port `5301`.

### Standalone output

The Docker build sets `BUILD_STANDALONE=1`, which enables Next.js
`output: "standalone"` and emits a self-contained server bundle
(`.next/standalone`) for a small runtime image. This flag is off by default so
that `pnpm start` (`next start`) keeps working locally, since `next start` is
incompatible with standalone output. See `next.config.ts`.
