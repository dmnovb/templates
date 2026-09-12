#!/bin/sh
set -e

cd /app

if [ ! -x node_modules/.bin/nest ]; then
  npm ci
fi

exec npm run dev
