COMPOSE = docker compose --env-file backend-express/.env --env-file frontend-react/.env

.PHONY: docker-config docker-build docker-up docker-down docker-logs

docker-config:
	$(COMPOSE) config

docker-build:
	$(COMPOSE) build

docker-up:
	$(COMPOSE) up -d

docker-down:
	$(COMPOSE) down

docker-logs:
	$(COMPOSE) logs -f
