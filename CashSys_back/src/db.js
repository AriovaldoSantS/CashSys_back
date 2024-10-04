const mysql = require('mysql2');

// Configuração do pool de conexões
const pool = mysql.createPool({
    host: 'localhost',
    user: 'AriSants',
    password: '676600ari',
    database: 'ProjectCXFODA',
    waitForConnections: true,
    connectionLimit: 10, // Número máximo de conexões no pool
    queueLimit: 0 // Sem limite para filas
});

// Verificar conexão com o banco de dados
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
        return;
    }
    console.log('Conexão ao banco de dados MySQL bem-sucedida!');
    connection.release(); // Libera a conexão de volta ao pool
});

module.exports = pool;
