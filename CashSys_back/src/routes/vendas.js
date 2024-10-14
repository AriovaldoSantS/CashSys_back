import express from 'express';

const router = express.Router();

// Exemplo de rota de vendas (substitua por seu controlador de vendas)
router.get('/', (_req, res) => {
  res.send('Rota de vendas funcionando!');
});

export default router;
