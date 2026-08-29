.PHONY: docker-start docker-refresh

# Local Vite dev server (source mounted, HMR on :5173)
docker-start:
	docker compose up

# Rebuild images and recreate volumes (use after dependency changes)
docker-refresh:
	docker compose down -v
	docker compose up --build --force-recreate
