const express = require('express');
const router = express.Router();

// Exemplo de rota de vendas (substitua por seu controlador de vendas)
router.get('/', (req, res) => {
  res.send('Rota de vendas funcionando!');
});

module.exports = router;
