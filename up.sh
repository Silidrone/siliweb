#!/bin/sh

export UID=$(id -u)
export GID=$(id -g)
cp .env backend/.env

if [ "$1" = "--prod" ]; then
  docker network create siliweb 2>/dev/null
  docker network create traefik 2>/dev/null
  docker compose -f docker-compose.prod.yml -p siliweb up --build
else
  docker compose -p siliweb up --build
fi