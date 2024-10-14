import { Router } from 'express';

const router = Router();

// Exemplo de rota de produtos (substitua por seu controlador de produtos)
router.get('/', (_req, res) => {
  res.send('Rota de produtos funcionando!');
});

export default router;
