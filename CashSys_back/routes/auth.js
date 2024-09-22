const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Verifique o usuário e a senha no banco de dados
  const user = {}; // Lógica fictícia para obter o usuário do banco
  if (!user) {
    return res.status(400).json({ message: 'Usuário não encontrado' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Senha incorreta' });
  }

  // Gera o token JWT com o papel do usuário
  const token = jwt.sign({ id: user.id, role: user.role }, 'secretKey', { expiresIn: '1h' });
  res.json({ token });
});
