const db = require('../config/db');

exports.blockSalesAndLogout = (req, res) => {
  const query = 'UPDATE vendas SET bloqueado = ? WHERE id = ?';
  db.query(query, [true, 1], (err) => {
    if (err) {
      return res.status(500).send('Erro ao bloquear vendas.');
    }

    const logoutQuery = 'UPDATE usuarios SET logged_in = ?';
    db.query(logoutQuery, [false], (err) => {
      if (err) {
        return res.status(500).send('Erro ao deslogar usuários.');
      }
      res.status(200).send('Vendas bloqueadas e usuários deslogados.');
    });
  });
};
