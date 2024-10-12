const db = require('../config/database');

// Função para fechar o caixa
const closeCash = async (req, res, next) => {
    const { id_caixa, valor_final } = req.body;

    console.log('Fechando caixa com ID:', id_caixa);
    console.log('Valor final recebido:', valor_final);

    try {
        // Verificar se o caixa está aberto
        const [caixa] = await db.query('SELECT * FROM caixa WHERE id = ? AND data_fechamento IS NULL', [id_caixa]);
        console.log('Resultado da busca do caixa:', caixa);

        if (caixa.length === 0) {
            return res.status(400).json({ message: 'Caixa já foi fechado ou não encontrado' });
        }

        // Fechar o caixa, calculando vendas e somando o valor final
        const [vendas] = await db.query('SELECT SUM(preco_total) AS total_vendas FROM vendas WHERE id_caixa = ?', [id_caixa]);
        console.log('Total de vendas do caixa:', vendas);

        const totalVendas = vendas[0].total_vendas || 0;

        // Atualizar o caixa com o valor final e registrar a data de fechamento
        await db.query('UPDATE caixa SET valor_final = ?, data_fechamento = NOW() WHERE id = ?', 
            [valor_final + totalVendas, id_caixa]);

        res.status(200).json({ message: 'Caixa fechado com sucesso', totalVendas });
    } catch (error) {
        console.error('Erro ao fechar o caixa:', error.message);
        next(error); // Enviar erro para o middleware de erros
    }
};

module.exports = { closeCash };
