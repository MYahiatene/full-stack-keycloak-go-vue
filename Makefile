.PHONY: all dev dev-infra dev-backend dev-frontend stop clean docker-run docker-down

all: build test

dev:
	@echo "1. Starte globale Infrastruktur (Keycloak)..."
	$(MAKE) docker-run

	@echo "2. Starte Backend (Infrastruktur + Watch-Mode)..."
	$(MAKE) -C backend docker-run
	cd backend && air &

	@echo "3. Starte Vue-Frontend..."
	cd frontend && npm run dev &

	@echo "--------------------------------------------------"
	@echo "Alle Dienste laufen im Hintergrund!"
	@echo "Keycloak: http://localhost:8080"
	@echo "Backend:  http://localhost:8088 (oder dein Port)"
	@echo "Frontend: http://localhost:5173"
	@echo "Drücke 'make stop', um alles zu stoppen."
	@echo "--------------------------------------------------"

stop:
	@echo "Stoppe Docker-Dienste..."
	$(MAKE) docker-down
	$(MAKE) -C backend docker-down
	@echo "Stoppe lokale Entwicklungsprozesse (Go/Vite)..."
	@pkill -f "air" || true
	@pkill -f "vite" || true
	@echo "Alles gestoppt."


build:
	$(MAKE) -C backend build
	$(MAKE) -C frontend build

test:
	$(MAKE) -C backend test
	$(MAKE) -C frontend test

clean: stop
	$(MAKE) -C backend clean
	$(MAKE) -C frontend clean
	docker compose down -v
	$(MAKE) -C backend docker-down

docker-run:
	@if docker compose up -d 2>/dev/null; then \
		: ; \
	else \
		docker-compose up -d; \
	fi

docker-down:
	@if docker compose down 2>/dev/null; then \
		: ; \
	else \
		docker-compose down; \
	fi