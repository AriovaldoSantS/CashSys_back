// Função para formatar datas
const formatarData = (date) => {
  const dia = String(date.getDate()).padStart(2, '0');
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const ano = date.getFullYear();
  return `${dia}/${mes}/${ano}`;
};

// Função para pegar a hora formatada
const formatarHora = (date) => {
  const horas = String(date.getHours()).padStart(2, '0');
  const minutos = String(date.getMinutes()).padStart(2, '0');
  const segundos = String(date.getSeconds()).padStart(2, '0');
  return `${horas}:${minutos}:${segundos}`;
};

module.exports = { formatarData, formatarHora };
