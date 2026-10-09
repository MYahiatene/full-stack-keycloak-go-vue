# Makefile für das Vue-Frontend (Vite / Node.js)

.PHONY: all install dev build preview lint test clean

all: install build

install:
	@echo "Installiere Frontend-Abhängigkeiten..."
	npm install

dev:
	@echo "Starte Vue Dev-Server..."
	npm run dev

build:
	@echo "Erstelle Production-Build..."
	npm run build

preview:
	@echo "Starte Vite Preview..."
	npm run preview

lint:
	@echo "Linte Vue-Code..."
	npm run lint

test:
	@echo "Führe Frontend-Tests aus..."
	npm run test:unit

clean:
	@echo "Räume Frontend auf (lösche dist & node_modules)..."
	rm -rf dist node_modules