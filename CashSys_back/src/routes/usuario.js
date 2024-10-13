const express = require('express');
const router = express.Router();

// Exemplo de rota de usuários (substitua por seu controlador de usuários)
router.get('/', (req, res) => {
  res.send('Rota de usuários funcionando!');
});

module.exports = router;