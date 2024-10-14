import db from '../config/db.js';

// Função para abrir o caixa
export const openCash = async (req, res, next) => {
  const { funcionario, valor_inicial } = req.body;

  // Validação básica dos campos obrigatórios
  if (!funcionario || valor_inicial === undefined) {
    return res.status(400).json({ message: 'Erro: Funcionário e valor inicial são obrigatórios.' });
  }

  try {
    // Insere o valor inicial do caixa com o id do funcionário baseado no nome
    const query = `
      INSERT INTO caixa (funcionario_id, valor_inicial) 
      VALUES ((SELECT id FROM usuarios WHERE nome = ?), ?)
    `;
    const [result] = await db.query(query, [funcionario, valor_inicial]);

    if (result.affectedRows > 0) {
      res.status(201).json({ message: 'Caixa aberto com sucesso.' });
    } else {
      res.status(500).json({ message: 'Erro ao abrir o caixa. Usuário não encontrado ou erro no banco de dados.' });
    }

  } catch (error) {
    // Passa o erro para o middleware de tratamento de erros
    next(error);  
  }
};
