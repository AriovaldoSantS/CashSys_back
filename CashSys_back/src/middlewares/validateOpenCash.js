const validateOpenCash = (req, res, next) => {
    const { initialAmount } = req.body;

    if (initialAmount === undefined || initialAmount < 0) {
        return res.status(400).json({
            message: 'Erro: Valor inicial do caixa inválido.',
        });
    }

    // Se a validação passar, continue para o próximo middleware ou controlador
    next();
};

module.exports = validateOpenCash;
