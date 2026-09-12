# Enterprise

NestJS on Node.js, with Docker for both local watch mode and a compiled production image. Run commands from this directory.

## Stack

- NestJS 12 (ESM) + TypeScript
- Config validation (Zod), Helmet, CORS, global `ValidationPipe`
- OpenAPI at `/docs`, health at `/health`
- Vitest + Oxlint
- `.docker/Dockerfile.base` (Node OS + deps) with `.docker/local/` and `.docker/remote/` overlays

## Start locally

```sh
npm install
npm run dev
```

API runs at [http://localhost:3000](http://localhost:3000). Swagger UI is at [http://localhost:3000/docs](http://localhost:3000/docs).

| Route | What it does |
| --- | --- |
| `GET /` | Stack info |
| `GET /health` | Liveness |
| `POST /ping` | Smoke test (`{ "name": "atlas" }`) |
| `GET /docs` | OpenAPI |

Copy `.env.example` to `.env` to override `PORT`, `HOST`, or `CORS_ORIGIN`.

## Start with Docker

Dev server (local overlay, source mounted, watch on):

```sh
make docker-start
```

Rebuild the local overlay after dependency or Dockerfile changes (drops the anonymous `node_modules` volume and recreates containers):

```sh
make docker-refresh
```

Production image (remote overlay, compiled Node server on port 3000):

```sh
docker compose --profile prod up --build
```

Published image from Docker Hub (`latest`, no git pull, no local build):

```sh
docker compose --profile hub pull
docker compose --profile hub up
```

The anonymous `node_modules` volume keeps container installs off your host.

### Docker layout

| Path | Role |
| --- | --- |
| `.docker/Dockerfile.base` | Node Alpine base image with `npm ci` and app source |
| `.docker/local/Dockerfile.local` | Dev overlay; runs `nest start --watch` via `entrypoint.sh` |
| `.docker/remote/Dockerfile.remote` | Production overlay; compiles TypeScript and runs `node dist` |
| `.docker/local/entrypoint.sh` | Setup, then `exec npm run dev` (long-running) |
| `.docker/remote/entrypoint.sh` | `exec node dist/main.js` (long-running) |

`make docker-start` and `make docker-refresh` run the **local** overlay only (`local` service). The **remote** overlay is the `prod` profile (`remote` service). `base` is a build-only image; the Makefile does not start it as a container.

## Publish `latest` (GitHub Actions → Docker Hub)

Pushes to `main` that touch `Enterprise/` build the production image and push `bleudechanel/enterprise:latest` (and a `sha-…` tag).

Add these on the GitHub repo (**Settings → Secrets and variables → Actions**):

| Name | Where | Value |
| --- | --- | --- |
| `DOCKERHUB_USERNAME` | Variable or secret | Docker Hub username |
| `DOCKERHUB_TOKEN` | Secret | [Access token](https://hub.docker.com/settings/security) with Read & Write |

Override the pull image name with `DOCKERHUB_IMAGE=youruser/enterprise:latest` if it is not `bleudechanel/enterprise`.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Watch and restart on change |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run start:prod` | Run the compiled server |
| `npm run lint` | Oxlint |
| `npm test` | Unit tests (Vitest) |
| `npm run test:e2e` | End-to-end tests |
