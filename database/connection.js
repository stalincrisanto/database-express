/*const pgp = require('pg-promise')();

const db = pgp('postgresql://postgres:stalin@localhost:5432/db_exercises');

module.exports = db;**/
const knex = require('knex')({
    client: 'postgres',
    connection: {
      host : 'localhost',
      port : 5432,
      user : 'postgres',
      password : 'stalin',
      database : 'db_exercises'
    }
  });

module.exports = knex;