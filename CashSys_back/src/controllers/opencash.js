const db = require('../config/database'); // Caminho ajustado

// Função para abrir o caixa
const openCash = async (req, res, next) => {
  const { funcionario, valor_inicial } = req.body;

  // Verifica se os dados foram fornecidos corretamente
  if (!funcionario || valor_inicial === undefined) {
    return res.status(400).json({ message: 'Erro: Funcionário e valor inicial são obrigatórios.' });
  }

  try {
    // Query para inserir dados na tabela caixa
    const query = 'INSERT INTO caixa (funcionario, valor_inicial) VALUES (?, ?)';
    await db.query(query, [funcionario, valor_inicial]);

    // Resposta de sucesso ao abrir o caixa
    res.status(201).json({ message: 'Caixa aberto com sucesso.' });
  } catch (error) {
    next(error);  // Envia o erro para o middleware de tratamento de erros
  }
};

module.exports = { openCash };
