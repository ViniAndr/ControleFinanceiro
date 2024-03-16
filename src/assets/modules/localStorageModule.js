// Função para obter o próximo ID disponível
function getProximoId() {
  const itens = recuperarDados();

  // Cria um conjunto com todos os IDs existentes, para evitar repetições.
  const idsExistentes = new Set(itens.map((item) => parseInt(item.id)));

  // Encontra o próximo ID disponível, não segue uma sequência obrigatória.
  let proximoId = 1; // Começa do ID 1
  // Se já existir, procura outro.
  while (idsExistentes.has(proximoId)) {
    proximoId++;
  }
  return proximoId;
}

// Função para salvar um item no armazenamento local
function salvar(item) {
  // Obtém o próximo ID disponível
  let id = getProximoId();
  localStorage.setItem(id, JSON.stringify(item));
}

// Função para recuperar todos os dados do armazenamento local
function recuperarDados() {
  // Consigo pegar todas as chaves do meu localStorage e converto para número, ex: (2, 4)
  const keys = Object.keys(localStorage).map(Number);
  const itens = [];

  // Percorro todas as chaves, que é o mesmo que percorrer todas as chaves que não são sequenciais
  keys.forEach((key) => {
    try {
      const item = JSON.parse(localStorage.getItem(key));
      if (item) {
        itens.push(item);
      }
    } catch (error) {
      console.error(`Erro ao recuperar item com chave ${key}:`, error);
    }
  });

  return itens;
}

// Função para remover um item do armazenamento local
function removerDados(id) {
  localStorage.removeItem(id);
}

// Exportando as funções como padrão
export { getProximoId, salvar, recuperarDados, removerDados };
