require('dotenv').config();
const mysql = require('mysql2');

// Criando a conexão com o banco de dados MySQL
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  connectionLimit: process.env.DB_CONN_LIMIT || 10
});

// Testando a conexão
connection.getConnection((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conexão ao banco de dados MySQL bem-sucedida!');
  }
});

module.exports = connection;
