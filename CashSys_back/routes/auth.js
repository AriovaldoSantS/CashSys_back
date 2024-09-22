const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Verificar se o usuário existe no banco de dados (substitua pela lógica do banco)
  const user = {}; // Exemplo fictício: buscar usuário no banco

  if (!user) {
    return res.status(400).json({ message: 'Usuário não encontrado' });
  }

  // Verificar se a senha está correta
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Senha incorreta' });
  }

  // Gerar token JWT com o ID do usuário e uma chave secreta
  const token = jwt.sign({ id: user.id }, 'secretKey', { expiresIn: '1h' });
  res.json({ token });
});
