#!/bin/sh
set -e

cd /app

exec node dist/main.js
