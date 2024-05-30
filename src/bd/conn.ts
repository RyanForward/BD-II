const pg = require('pg')

const client = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'openf1',
    password: 'admin',
    port: 5432
})

client.query('SELECT NOW()', (err, res) => {
    console.log('teste')
    if (err) {
      console.error('Erro ao executar a consulta', err.stack);
    } else {
      console.log('Hora atual no banco de dados:', res.rows[0]);
    }
    client.end();
  });

module.exports = client