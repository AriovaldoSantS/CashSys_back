exports.closeCash = (req, res) => {
  const { valorFinal, user } = req.body;

  // Consulta para pegar o valor de abertura
  const queryAbertura = 'SELECT openingCash FROM caixa WHERE id = 1';

  db.query(queryAbertura, (err, resultadoAbertura) => {
    if (err) {
      return res.status(500).send('Erro ao buscar o valor de abertura.');
    }

    const openingCash = resultadoAbertura[0].openingCash;

    // Consulta para pegar o total de vendas do dia
    const queryVendas = 'SELECT SUM(valor_total) AS totalVendas FROM vendas WHERE DATE(data_venda) = CURDATE()';

    db.query(queryVendas, (err, resultadoVendas) => {
      if (err) {
        return res.status(500).send('Erro ao buscar o valor das vendas.');
      }

      const totalVendas = resultadoVendas[0].totalVendas || 0;

      // Consulta para pegar o total de saídas do dia
      const querySaidas = 'SELECT SUM(valor_saida) AS totalSaidas FROM saidas WHERE DATE(data_saida) = CURDATE()';

      db.query(querySaidas, (err, resultadoSaidas) => {
        if (err) {
          return res.status(500).send('Erro ao buscar as saídas.');
        }

        const totalSaidas = resultadoSaidas[0].totalSaidas || 0;

        // Cálculo do valor esperado no caixa
        const expectedCash = openingCash + totalVendas - totalSaidas;

        // Verifica se o valor informado pelo usuário bate com o valor esperado
        if (valorFinal != expectedCash) {
          const motivo = req.body.motivo || 'Não informado';
          registerLog(`Discrepância no fechamento. Esperado: R$ ${expectedCash.toFixed(2)}, Informado: R$ ${valorFinal}. Motivo: ${motivo}`, user);
          return res.status(400).send(`Fechamento com discrepância. Esperado: R$ ${expectedCash.toFixed(2)}, Informado: R$ ${valorFinal}`);
        }

        // Fechar o caixa e registrar log
        const closeQuery = 'UPDATE caixa SET status = "fechado", closingCash = ? WHERE id = 1';
        db.query(closeQuery, [valorFinal], (err) => {
          if (err) {
            return res.status(500).send('Erro ao fechar o caixa.');
          }
          registerLog(`Caixa fechado com sucesso. Valor: R$ ${valorFinal}`, user);
          res.status(200).send('Caixa fechado com sucesso.');
        });
      });
    });
  });
};
