const express = require('express');
const router = express.Router();

// Exemplo de rota de produtos (substitua por seu controlador de produtos)
router.get('/', (req, res) => {
  res.send('Rota de produtos funcionando!');
});

module.exports = router;
