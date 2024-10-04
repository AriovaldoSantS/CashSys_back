const express = require('express');
const router = express.Router();
const db = require('../db');

// Rota para registrar venda
router.post('/registrar', (req, res) => {
    const { id_usuario, id_produto, quantidade } = req.body;

    if (!id_usuario || !id_produto || !quantidade) {
        return res.status(400).json({ error: 'Usuário, produto e quantidade são obrigatórios' });
    }

    if (typeof quantidade !== 'number' || quantidade <= 0) {
        return res.status(400).json({ error: 'Quantidade deve ser um número positivo' });
    }

    // Inicia uma transação para garantir que todas as operações sejam atômicas
    db.beginTransaction((err) => {
        if (err) {
            return res.status(500).json({ error: `Erro ao iniciar transação: ${err.message}` });
        }

        // Busca o produto para calcular o total
        db.query('SELECT preco, quantidade_estoque FROM produtos WHERE id = ?', [id_produto], (err, results) => {
            if (err || results.length === 0) {
                return db.rollback(() => {
                    res.status(500).json({ error: 'Erro ao buscar produto ou produto não encontrado' });
                });
            }

            const produto = results[0];
            const precoTotal = produto.preco * quantidade;

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
                db.query('UPDATE produtos SET quantidade_estoque = quantidade_estoque - ? WHERE id = ?', 
                [quantidade, id_produto], (err) => {
                    if (err) {
                        return db.rollback(() => {
                            res.status(500).json({ error: 'Erro ao atualizar estoque' });
                        });
                    }

                    // Confirma a transação se tudo ocorreu bem
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
