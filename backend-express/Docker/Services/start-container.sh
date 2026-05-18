#!/usr/bin/env sh
set -e

cd /app

if [ ! -d node_modules/@prisma/client ] || [ ! -d node_modules/prisma ]; then
  npm ci
fi

npx prisma generate

exec /usr/bin/supervisord -n -c /etc/supervisor/conf.d/supervisord.conf
