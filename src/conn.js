const pg = require('pg')

const client = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'openf1',
    password: '1206',
    port: 5432
})

module.exports = client