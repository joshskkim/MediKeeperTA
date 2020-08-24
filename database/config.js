/* eslint-disable import/no-unresolved */
require('dotenv').config();
const promise = require('bluebird');
const pgp = require('pg-promise');

const options = {
  promiseLib: promise,
};

const client = pgp(options);

const connection = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

const db = client(connection);

module.exports = db;
