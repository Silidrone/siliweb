#!/bin/sh

docker network create siliweb
docker compose -f proxy.yml -p proxy up --build
