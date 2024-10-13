const db = require('../config/db');

// Função para abrir o caixa
const openCash = async (req, res, next) => {
  const { funcionario, valor_inicial } = req.body;

  if (!funcionario || valor_inicial === undefined) {
    return res.status(400).json({ message: 'Erro: Funcionário e valor inicial são obrigatórios.' });
  }

  try {
    const query = 'INSERT INTO caixa (funcionario_id, valor_inicial) VALUES ((SELECT id FROM usuarios WHERE nome = ?), ?)';
    await db.query(query, [funcionario, valor_inicial]);

    res.status(201).json({ message: 'Caixa aberto com sucesso.' });
  } catch (error) {
    next(error);  // Envia o erro para o middleware de tratamento de erros
  }
};

module.exports = { openCash };
