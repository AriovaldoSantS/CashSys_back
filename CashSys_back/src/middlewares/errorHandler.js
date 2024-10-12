const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Ocorreu um erro interno.' });
};

module.exports = errorHandler;
