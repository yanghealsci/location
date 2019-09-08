import {Pool} from 'pg'
let _pool = null;

export function getPool () {
  if (_pool) return _pool

  //TODO: set connection config in ENV
  _pool = new Pool({
    user: 'postgres',
    host: '0.0.0.0',
    database: 'localzdemo',
    password: 'postgres',
    port: 5433
  })
  return _pool
}