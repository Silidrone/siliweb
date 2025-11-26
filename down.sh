#!/bin/sh

if [ "$1" = "--prod" ]; then
  docker compose -f docker-compose.prod.yml -p siliweb down --remove-orphans
else
  docker compose -p siliweb down
fi