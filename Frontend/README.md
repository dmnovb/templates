# Frontend

Vite + React + Tailwind + shadcn/ui, with Docker for both local HMR and a production nginx build. Run commands from this directory.

## Stack

- Vite 8 + React 19 + TypeScript
- Tailwind CSS 4 (`@tailwindcss/vite`)
- shadcn/ui (Nova / Radix)
- Multi-stage `Dockerfile` + Compose

## Start locally

```sh
npm install
npm run dev
```

App runs at [http://localhost:5173](http://localhost:5173).

## Start with Docker

Dev server (source mounted, HMR on):

```sh
docker compose up --build
```

Production image (static files behind nginx on port 8080):

```sh
docker compose --profile prod up --build
```

Rebuild the image after dependency changes. The anonymous `node_modules` volume keeps container installs off your host.

## Add shadcn components

```sh
npx shadcn@latest add dialog
```

Then import from `@/components/ui/...`. Theme lives in `src/index.css`. Dark mode uses `next-themes` with a class on `<html>`.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run build` | Typecheck + production bundle |
| `npm run preview` | Serve the production bundle |
| `npm run lint` | Oxlint |
