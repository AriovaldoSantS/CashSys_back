const express = require('express');
const { openCash } = require('../controllers/opencash');
const { closeCash } = require('../controllers/closecash');
const router = express.Router();

// Rota para abrir o caixa
router.post('/abrir', openCash);

// Rota para fechar o caixa
router.post('/fechar', closeCash);

module.exports = router;
