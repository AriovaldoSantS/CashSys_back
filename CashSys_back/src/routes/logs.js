const express = require('express');
const { registerLog } = require('../controllers/logController');
const router = express.Router();

router.post('/register', (req, res) => {
  const { message, user } = req.body;
  registerLog(message, user);
  res.status(200).send('Log registrado com sucesso.');
});

module.exports = router;
