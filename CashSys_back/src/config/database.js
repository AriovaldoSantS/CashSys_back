require('dotenv').config();  // Carrega as variáveis do arquivo .env
const mysql = require('mysql2');

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: process.env.DB_CONN_LIMIT || 10,  // Defina o limite de conexões
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
