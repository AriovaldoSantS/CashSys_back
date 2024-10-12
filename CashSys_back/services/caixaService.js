const db = require('../db');

// Função para abrir o caixa
const abrirCaixa = async (funcionario, valor_inicial) => {
  const query = 'INSERT INTO caixa (funcionario, valor_inicial) VALUES (?, ?)';
  return db.query(query, [funcionario, valor_inicial]);
};

// Função para fechar o caixa
const fecharCaixa = async (id_caixa, valor_final) => {
  const query = 'UPDATE caixa SET valor_final = ?, data_fechamento = NOW() WHERE id = ?';
  return db.query(query, [valor_final, id_caixa]);
};

module.exports = { abrirCaixa, fecharCaixa };
