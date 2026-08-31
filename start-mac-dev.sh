#!/usr/bin/env bash
set -euo pipefail

project_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
cd "$project_dir"

command -v docker >/dev/null || { echo 'Docker Desktop is required.' >&2; exit 1; }
docker compose -f docker-compose.dev.yml up -d --build

for _ in $(seq 1 30); do
    if /usr/bin/curl --fail --silent http://127.0.0.1:18080/api/session/ >/dev/null && /usr/bin/curl --fail --silent http://127.0.0.1:18080/ >/dev/null; then
        echo 'Ready: http://127.0.0.1:18080/  Admin: http://127.0.0.1:18080/dashboard'
        exit 0
    fi
    sleep 1
done

docker compose -f docker-compose.dev.yml logs --tail=80
exit 1
