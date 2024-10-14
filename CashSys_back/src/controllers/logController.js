// src/controllers/logController.js
const db = require('../config/db');

exports.registerLog = (message, user) => {
  const query = 'INSERT INTO logs (message, timestamp, user) VALUES (?, NOW(), ?)';
  db.query(query, [message, user], (err, result) => {
    if (err) {
      console.error('Erro ao registrar log:', err);
    }
  });
};
