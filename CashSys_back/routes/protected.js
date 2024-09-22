function roleMiddleware(requiredRole) {
  return function (req, res, next) {
    if (req.user.role !== requiredRole) {
      return res.status(403).json({ message: 'Acesso negado' });
    }
    next();
  };
}

// Exemplo: Apenas administradores podem acessar essa rota
app.get('/admin', authMiddleware, roleMiddleware('admin'), (req, res) => {
  res.send('Acesso autorizado para administradores');
});
