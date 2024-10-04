const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Inicialize a aplicação antes de configurar rotas ou middlewares
const app = express();

// Permite CORS para todas as origens (ou especifique uma origem específica)
app.use(cors());

// Middleware para processar JSON no corpo das requisições
app.use(bodyParser.json());

// Importar rotas depois da inicialização da aplicação
const caixaRoutes = require('./src/routes/caixa');
const vendasRoutes = require('./src/routes/vendas');
const usuariosRoutes = require('./src/routes/usuarios');
const produtosRoutes = require('./src/routes/produtos');

// Usar as rotas do projeto
app.use('/api/caixa', caixaRoutes);
app.use('/api/vendas', vendasRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/produtos', produtosRoutes);

// Porta em que o servidor vai rodar
const PORT = 3000;

// Inicializa o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
