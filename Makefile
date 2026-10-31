.PHONY: all dev stop clean build test \
	docker-run docker-down \
	backend-build backend-run backend-watch backend-test backend-itest backend-clean \
	frontend-install frontend-dev frontend-build frontend-preview frontend-lint frontend-test frontend-clean

all: build test

# ---------------------------------------------------------------------------
# Gesamtes Projekt
# ---------------------------------------------------------------------------

dev:
	@echo "1. Starte Infrastruktur (Keycloak, Datenbanken)..."
	$(MAKE) docker-run

	@echo "2. Starte Backend (Watch-Mode)..."
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
	@echo "Stoppe lokale Entwicklungsprozesse (Go/Vite)..."
	@pkill -f "air" || true
	@pkill -f "vite" || true
	@echo "Alles gestoppt."

build: backend-build frontend-build

test: backend-test frontend-test

clean: stop backend-clean frontend-clean
	docker compose down -v

# ---------------------------------------------------------------------------
# Docker (Keycloak + Datenbanken)
# ---------------------------------------------------------------------------

# --wait blockiert, bis alle Services mit Healthcheck (die Datenbanken) healthy sind
docker-run:
	docker compose up -d --wait

docker-down:
	@if docker compose down 2>/dev/null; then \
		: ; \
	else \
		docker-compose down; \
	fi

# ---------------------------------------------------------------------------
# Backend (Go)
# ---------------------------------------------------------------------------

backend-build:
	@echo "Building..."
	@cd backend && go build -o main ./cmd/api/main.go

backend-run:
	@cd backend && go run cmd/api/main.go

backend-test:
	@echo "Testing..."
	@cd backend && go test ./... -v

# Integrationstests
backend-itest:
	@echo "Running integration tests..."
	@cd backend && go test ./internal/database -v

backend-clean:
	@echo "Cleaning..."
	@rm -f backend/main

# Live Reload
backend-watch:
	@cd backend && if command -v air > /dev/null; then \
		air; \
	else \
		read -p "Go's 'air' is not installed on your machine. Do you want to install it? [Y/n] " choice; \
		if [ "$$choice" != "n" ] && [ "$$choice" != "N" ]; then \
			go install github.com/air-verse/air@latest; \
			air; \
		else \
			echo "You chose not to install air. Exiting..."; \
			exit 1; \
		fi; \
	fi

# ---------------------------------------------------------------------------
# Frontend (Vue / Vite)
# ---------------------------------------------------------------------------

frontend-install:
	@echo "Installiere Frontend-Abhängigkeiten..."
	cd frontend && npm install

frontend-dev:
	@echo "Starte Vue Dev-Server..."
	cd frontend && npm run dev

frontend-build:
	@echo "Erstelle Production-Build..."
	cd frontend && npm run build

frontend-preview:
	@echo "Starte Vite Preview..."
	cd frontend && npm run preview

frontend-lint:
	@echo "Linte Vue-Code..."
	cd frontend && npm run lint

frontend-test:
	@echo "Führe Frontend-Tests aus..."
	cd frontend && npm run test:unit

frontend-clean:
	@echo "Räume Frontend auf (lösche dist & node_modules)..."
	rm -rf frontend/dist frontend/node_modules
