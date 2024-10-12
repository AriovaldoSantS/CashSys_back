const express = require('express');
const router = express.Router();
const db = require('../../db'); // Conexão com o banco de dados

// Buscar todos os produtos
router.get('/', (req, res) => {
    db.query('SELECT id_produto AS id, nome, preco_unitario AS price, quantidade_estoque AS stock, descricao FROM produtos', (err, results) => {
        if (err) {
            return res.status(500).send(`Erro ao buscar produtos: ${err.message}`);
        }
        res.json(results);
    });
});

// Adicionar novo produto
router.post('/', (req, res) => {
    const { nome, preco_unitario, quantidade_estoque } = req.body;

    if (!nome || preco_unitario === undefined || quantidade_estoque === undefined) {
        return res.status(400).send('Todos os campos (nome, preco_unitario, quantidade_estoque) são obrigatórios');
    }

    // Verificar tipos de dados
    if (typeof preco_unitario !== 'number' || typeof quantidade_estoque !== 'number') {
        return res.status(400).send('preco_unitario e quantidade_estoque devem ser números');
    }

    db.query(
        'INSERT INTO produtos (nome, preco_unitario, quantidade_estoque) VALUES (?, ?, ?)',
        [nome, preco_unitario, quantidade_estoque],
        (err, results) => {
            if (err) {
                return res.status(500).send(`Erro ao adicionar produto: ${err.message}`);
            }
            res.status(201).json({ message: 'Produto adicionado com sucesso', id: results.insertId });
        }
    );
});

// Atualizar produto
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nome, preco_unitario, quantidade_estoque } = req.body;

    if (!nome || preco_unitario === undefined || quantidade_estoque === undefined) {
        return res.status(400).send('Todos os campos (nome, preco_unitario, quantidade_estoque) são obrigatórios para atualizar');
    }

    // Verificar tipos de dados
    if (typeof preco_unitario !== 'number' || typeof quantidade_estoque !== 'number') {
        return res.status(400).send('preco_unitario e quantidade_estoque devem ser números');
    }

    db.query(
        'UPDATE produtos SET nome = ?, preco_unitario = ?, quantidade_estoque = ? WHERE id_produto = ?',
        [nome, preco_unitario, quantidade_estoque, id],
        (err, results) => {
            if (err) {
                return res.status(500).send(`Erro ao atualizar produto: ${err.message}`);
            }
            if (results.affectedRows === 0) {
                return res.status(404).send('Produto não encontrado');
            }
            res.json({ message: `Produto ID ${id} atualizado com sucesso` });
        }
    );
});

// Excluir produto
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM produtos WHERE id_produto = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).send(`Erro ao excluir produto: ${err.message}`);
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Produto não encontrado');
        }
        res.json({ message: `Produto ID ${id} excluído com sucesso` });
    });
});

module.exports = router;
