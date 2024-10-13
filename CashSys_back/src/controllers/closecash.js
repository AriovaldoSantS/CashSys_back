const db = require('../config/db');

// Função para fechar o caixa
const closeCash = async (req, res, next) => {
  const { funcionario, valor_final } = req.body;

  if (!funcionario || valor_final === undefined) {
    return res.status(400).json({ message: 'Erro: Funcionário e valor final são obrigatórios.' });
  }

  try {
    const query = 'UPDATE caixa SET valor_final = ?, fechado_em = CURRENT_TIMESTAMP, status = "fechado" WHERE funcionario_id = (SELECT id FROM usuarios WHERE nome = ?) AND status = "aberto"';
    await db.query(query, [valor_final, funcionario]);

    res.status(200).json({ message: 'Caixa fechado com sucesso.' });
  } catch (error) {
    next(error);
  }
};

module.exports = { closeCash };
