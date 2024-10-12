const express = require('express');
const cors = require('cors');
const errorHandler = require('./src/middlewares/errorHandler');
require('dotenv').config();  // Carregar variáveis de ambiente

// Inicialize a aplicação
const app = express();

// Permite CORS para todas as origens (ou especifique uma origem específica)
app.use(cors());

// Middleware para processar JSON no corpo das requisições
app.use(express.json());  // Usando express.json() no lugar do body-parser

// Importar rotas
const caixaRoutes = require('./src/routes/caixa');
const vendasRoutes = require('./src/routes/vendas');
const usuariosRoutes = require('./src/routes/usuarios');
const produtosRoutes = require('./src/routes/produtos');

// Usar as rotas do projeto
app.use('/api/caixa', caixaRoutes);
app.use('/api/vendas', vendasRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/produtos', produtosRoutes);

// Middleware de erro (deve estar depois das rotas)
app.use(errorHandler);

// Porta em que o servidor vai rodar
const PORT = process.env.PORT || 3000;

// Inicializa o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
