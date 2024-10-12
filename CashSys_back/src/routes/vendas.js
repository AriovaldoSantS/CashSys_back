const express = require('express');
const router = express.Router();
const db = require('../../db');

// Rota para registrar venda
router.post('/registrar', (req, res) => {
    const { id_usuario, id_produto, quantidade } = req.body;

    // Verificação dos campos obrigatórios
    if (!id_usuario || !id_produto || !quantidade) {
        return res.status(400).json({ error: 'Usuário, produto e quantidade são obrigatórios' });
    }

    // Verificação se a quantidade é um número válido
    if (typeof quantidade !== 'number' || quantidade <= 0) {
        return res.status(400).json({ error: 'Quantidade deve ser um número positivo' });
    }

    // Iniciar uma transação para garantir que todas as operações sejam atômicas
    db.beginTransaction((err) => {
        if (err) {
            return res.status(500).json({ error: `Erro ao iniciar transação: ${err.message}` });
        }

        // Busca o produto para calcular o preço total e verificar estoque
        db.query('SELECT preco_unitario, quantidade_estoque FROM produtos WHERE id_produto = ?', [id_produto], (err, results) => {
            if (err || results.length === 0) {
                return db.rollback(() => {
                    res.status(500).json({ error: 'Erro ao buscar produto ou produto não encontrado' });
                });
            }

            const produto = results[0];
            const precoTotal = produto.preco_unitario * quantidade;

            // Verifica se há estoque suficiente
            if (produto.quantidade_estoque < quantidade) {
                return db.rollback(() => {
                    res.status(400).json({ error: 'Estoque insuficiente' });
                });
            }

            // Registra a venda
            db.query('INSERT INTO vendas (id_usuario, id_produto, quantidade, preco_total) VALUES (?, ?, ?, ?)', 
            [id_usuario, id_produto, quantidade, precoTotal], (err, results) => {
                if (err) {
                    return db.rollback(() => {
                        res.status(500).json({ error: 'Erro ao registrar venda' });
                    });
                }

                // Atualiza o estoque
                db.query('UPDATE produtos SET quantidade_estoque = quantidade_estoque - ? WHERE id_produto = ?', 
                [quantidade, id_produto], (err) => {
                    if (err) {
                        return db.rollback(() => {
                            res.status(500).json({ error: 'Erro ao atualizar estoque' });
                        });
                    }

                    // Confirma a transação
                    db.commit((err) => {
                        if (err) {
                            return db.rollback(() => {
                                res.status(500).json({ error: 'Erro ao confirmar transação' });
                            });
                        }
                        res.status(201).json({ message: 'Venda registrada com sucesso' });
                    });
                });
            });
        });
    });
});

module.exports = router;
