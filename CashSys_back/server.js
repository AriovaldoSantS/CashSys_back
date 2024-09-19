const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Bem-vindo ao CXFODA!');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
