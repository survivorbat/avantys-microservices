SHELL := /bin/bash

.PHONY: help

.DEFAULT_GOAL := help

help:
	@echo "Please use 'make <target>' where <target> is one of"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z\._-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

### Development commands ###

dev.up: ## Up containers in development mode
	COMPOSE_HTTP_TIMEOUT=500 docker-compose -f docker/docker-compose.yml -f docker/docker-compose.dev.yml -p avantys up -d
	@echo Great! The application will soon appear over at: https://localhost/

dev.down: ## Down containers in development mode
	docker-compose -f docker/docker-compose.yml -f docker/docker-compose.dev.yml -p avantys down

dev.restart: ## Restart containers in development mode
	docker-compose -f docker/docker-compose.yml -f docker/docker-compose.dev.yml -p avantys restart

dev.build: ## Build containers
	docker-compose -f docker/docker-compose.yml -f docker/docker-compose.dev.yml -p avantys build

dev.expose.secrets: ## Expose secrets and export to a file in development
	ansible-playbook ansible/expand-secrets-dev.yml --vault-password-file=../.avantys-vault-password

prod.up:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml -p avantys up -d

prod.down:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml -p avantys down

prod.restart:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml -p avantys restart

prod.build:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml -p avantys build
