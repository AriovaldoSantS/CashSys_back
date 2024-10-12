const express = require('express');
const router = express.Router();
const { openCash } = require('../controllers/opencash');
const { closeCash } = require('../controllers/closecash');
const validateOpenCash = require('../middlewares/validateOpenCash');
const validateCloseCash = require('../middlewares/validateCloseCash');

// Rota para abrir o caixa com validação
router.post('/abrir', validateOpenCash, openCash);

// Rota para fechar o caixa com validação
router.post('/fechar', validateCloseCash, closeCash);

module.exports = router;
