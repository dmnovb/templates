# Templates

Reusable starters.

## Frontend

Vite + React + Tailwind + shadcn/ui, with Docker.

```sh
cd Frontend
npm install
npm run dev
```

Pushes to `main` under `Frontend/` publish `bleudechanel/frontend:latest` to Docker Hub. See `Frontend/README.md` for the required GitHub secrets.

## Hobby

Hono hobby backend, with Docker.

```sh
cd Hobby
npm install
npm run dev
```

Pushes to `main` under `Hobby/` publish `bleudechanel/hobby:latest` to Docker Hub. See `Hobby/README.md` for the required GitHub secrets.

## Enterprise

NestJS enterprise backend, with Docker.

```sh
cd Enterprise
npm install
npm run dev
```

Pushes to `main` under `Enterprise/` publish `bleudechanel/enterprise:latest` to Docker Hub. See `Enterprise/README.md` for the required GitHub secrets.
