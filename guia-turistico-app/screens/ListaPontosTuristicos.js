// NO CÓDIGO ATUAL (aproximadamente linha 20-30):
const dadosAdaptados = response.data.map(item => ({
  id: String(item.id),
  nome: item.title,
  descricao: item.body,
  imagem: `https://picsum.photos/id/${item.id % 100}/150/150`,
  detalhesCompletos: item.body + ' ' + item.title,
  // FALTAVAM AS COORDENADAS AQUI
}));