#!/bin/sh
set -e

cd /app

if [ ! -x node_modules/.bin/tsx ]; then
  npm ci
fi

exec npm run dev
