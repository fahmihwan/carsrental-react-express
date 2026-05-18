#!/usr/bin/env sh
set -e

cd /app

mkdir -p logs

exec /usr/bin/supervisord -n -c /etc/supervisor/conf.d/supervisord.conf