#!/bin/bash
set -e
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "localzdemo" -f /docker-entrypoint-initdb.d/mock_data.sql_ign