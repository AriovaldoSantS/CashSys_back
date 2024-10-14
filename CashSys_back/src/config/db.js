import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: process.env.DB_CONN_LIMIT || 10
});

export default db;
