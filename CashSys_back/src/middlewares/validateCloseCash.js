const validateCloseCash = (req, res, next) => {
    const { finalAmount } = req.body;

    if (finalAmount === undefined || finalAmount < 0) {
        return res.status(400).json({
            message: 'Erro: Valor final do caixa inválido.',
        });
    }

    // Se a validação passar, continue para o próximo middleware ou controlador
    next();
};

module.exports = validateCloseCash;
