import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import errorHandler from './src/middlewares/errorHandler.js';

// Carregar variáveis de ambiente
dotenv.config();

// Inicialize a aplicação
const app = express();

// Permite CORS para todas as origens
app.use(cors());

// Middleware para processar JSON
app.use(express.json());

// Importar rotas
import caixaRoutes from './src/routes/caixa.js';
import produtosRoutes from './src/routes/produtos.js';
import usuariosRoutes from './src/routes/usuarios.js';
import vendasRoutes from './src/routes/vendas.js';

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
