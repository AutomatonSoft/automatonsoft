#!/usr/bin/env bash
set -euo pipefail

project_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
cd "$project_dir"
docker compose -f docker-compose.dev.yml down
echo 'Local containers stopped. Data and uploaded screenshots are preserved in Docker volumes.'
