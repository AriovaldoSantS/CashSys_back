import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// Rota para fazer login
router.post('/login', async (req, res) => {
  const { nome, senha } = req.body;

  if (!nome || !senha) {
    return res.status(400).json({ message: 'Nome e senha são obrigatórios' });
  }

  try {
    // Consulta o usuário pelo nome
    const [rows] = await db.query('SELECT * FROM usuarios WHERE nome = ?', [nome]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const usuario = rows[0];

    // Verifica se a senha está correta
    if (senha === usuario.senha) {  // Substitua isso por bcrypt.compare() se as senhas estiverem criptografadas
      res.status(200).json({ message: 'Login bem-sucedido', usuario });
    } else {
      res.status(401).json({ message: 'Senha incorreta' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login', error });
  }
});

export default router;
