const pgp = require('pg-promise')();

const db = pgp('postgresql://postgres:stalin@localhost:5432/db_exercises');

module.exports = db;