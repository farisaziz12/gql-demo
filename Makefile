.PHONY: up start-server start-client

up:
	cd ./client && docker-compose up || exit

start-server:
	@echo "Starting server..."
	@sh ./scripts/start.sh --server

start-client:
	@echo "Starting client..."
	@sh ./scripts/start.sh --client
