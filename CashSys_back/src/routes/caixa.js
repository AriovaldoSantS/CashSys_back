const express = require('express');
const router = express.Router();
const db = require('../db');

// Rota para abrir o caixa
router.post('/abrir', (req, res) => {
    const { id_usuario, valor_inicial } = req.body;

    // Verificar se os campos obrigatórios estão presentes
    if (!id_usuario || valor_inicial == null) {
        return res.status(400).json({ error: 'ID do usuário e valor inicial são obrigatórios' });
    }

    // Verificar tipos de dados
    if (typeof valor_inicial !== 'number' || valor_inicial < 0) {
        return res.status(400).json({ error: 'Valor inicial deve ser um número positivo' });
    }

    // Inserir abertura de caixa
    db.query(
        'INSERT INTO caixa (id_usuario, valor_inicial, valor_final, status, data_abertura) VALUES (?, ?, 0, "aberto", NOW())',
        [id_usuario, valor_inicial],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: `Erro ao abrir caixa: ${err.message}` });
            }
            res.status(201).json({ message: 'Caixa aberto com sucesso', id_caixa: results.insertId });
        }
    );
});

module.exports = router;
