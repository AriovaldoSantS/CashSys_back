const express = require('express');
const router = express.Router();
const db = require('../../db');

// Buscar todos os usuários
router.get('/', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) {
            return res.status(500).send('Erro ao buscar usuários');
        }
        res.json(results);
    });
});

// Adicionar novo usuário (sem bcrypt)
router.post('/', (req, res) => {
    const { nome, senha, nivel_acesso } = req.body;

    if (!nome || !senha || !nivel_acesso) {
        return res.status(400).send('Todos os campos (nome, senha, nivel_acesso) são obrigatórios');
    }

    db.query('INSERT INTO usuarios (nome, senha, nivel_acesso) VALUES (?, ?, ?)', 
    [nome, senha, nivel_acesso], 
    (err, results) => {
        if (err) {
            return res.status(500).send('Erro ao adicionar usuário');
        }
        res.status(201).send(`Usuário adicionado com sucesso, ID: ${results.insertId}`);
    });
});

// Login do usuário (sem bcrypt)
router.post('/login', (req, res) => {
    const { nome, senha } = req.body;

    if (!nome || !senha) {
        return res.status(400).send('Nome e senha são obrigatórios');
    }

    db.query('SELECT * FROM usuarios WHERE nome = ? AND senha = ?', [nome, senha], (err, results) => {
        if (err) {
            return res.status(500).send('Erro ao buscar usuário');
        }

        if (results.length === 0) {
            return res.status(401).send('Usuário ou senha incorretos');
        }

        const user = results[0]; // Primeiro resultado da consulta
        res.json({
            employeeName: user.nome, // Retorna o nome do funcionário
            userId: user.id_usuario, // Pode adicionar outras informações se necessário
        });
    });
});

// Atualizar usuário (sem bcrypt)
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nome, senha, nivel_acesso } = req.body;

    if (!nome || !senha || !nivel_acesso) {
        return res.status(400).send('Todos os campos (nome, senha, nivel_acesso) são obrigatórios para atualizar');
    }

    db.query('UPDATE usuarios SET nome = ?, senha = ?, nivel_acesso = ? WHERE id_usuario = ?',
    [nome, senha, nivel_acesso, id],
    (err, results) => {
        if (err) {
            return res.status(500).send('Erro ao atualizar usuário');
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Usuário não encontrado');
        }
        res.send(`Usuário ID ${id} atualizado com sucesso`);
    });
});

module.exports = router;
