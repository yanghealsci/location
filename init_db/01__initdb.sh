#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER localzdemo with encrypted password 'localzdemo';
    CREATE DATABASE localzdemo WITH ENCODING 'UTF-8';
	GRANT ALL PRIVILEGES ON DATABASE localzdemo TO localzdemo;
    GRANT USAGE ON SCHEMA public TO localzdemo;
    GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO localzdemo;
    GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO localzdemo;
EOSQL

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "localzdemo" -f /docker-entrypoint-initdb.d/init_db.sql_ign