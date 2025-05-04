#!/bin/bash

set -e

docker-compose pull
docker-compose run --rm -w=/usr/src/app api npm run migration:run:prod
docker-compose up -d --remove-orphans

docker image prune -a -f