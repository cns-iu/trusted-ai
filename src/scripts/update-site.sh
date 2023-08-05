#!/bin/bash
export PGHOST=${PGHOST="dbr.cns.iu.edu"}
export PGPORT=${PGPORT=5433}
export PGDATABASE=${PGDATABASE="agc2_simon"}
export PGUSER=${PGUSER="your_username"}
export PGPASSWORD=${PGPASSWORD="--password"}

set -ev

for sql in src/queries/*.sql; do
    echo $(basename $sql)
    psql -h "$PGHOST" -U "$PGUSER" "$PGDATABASE" -p "$PGPORT" -f $sql "$PGPASSWORD"
done
