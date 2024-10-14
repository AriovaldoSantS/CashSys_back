const express = require('express');
const { blockSalesAndLogout } = require('../controllers/blockSalesAndLogout');
const router = express.Router();

router.post('/fechar', (req, res) => {
  // Chama a função de fechamento do caixa no controlador
  closeCash(req, res);
});

router.post('/bloquear-vendas', blockSalesAndLogout);

module.exports = router;
