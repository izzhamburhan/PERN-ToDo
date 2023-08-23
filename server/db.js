const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'todoapp',
    password: 'K0t4ksakti',
    port: 5432, // Default PostgreSQL port
  });

module.exports = pool