const pg = require('pg')

const client = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'openf1',
    password: 'admin',
    port: 5432
})

module.exports = client