const errorHandler = (err, req, res, next) => {
  console.error(err.stack);  // Loga o erro no console
  res.status(500).json({ message: 'Algo deu errado!', error: err.message });  // Envia uma resposta com o erro
};

export default errorHandler;
