#!/usr/bin/env sh
set -e

cd /app

: "${PORT:?PORT must be set in backend-express/.env}"
sed "s/__BACKEND_APP_PORT__/${PORT}/g" \
  /etc/nginx/templates/default.conf.template \
  > /etc/nginx/conf.d/default.conf

if [ ! -d node_modules/@prisma/client ] || [ ! -d node_modules/prisma ]; then
  npm ci
fi

npx prisma generate

exec /usr/bin/supervisord -n -c /etc/supervisor/conf.d/supervisord.conf
