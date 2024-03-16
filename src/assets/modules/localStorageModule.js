export default class Bd {
  // Método para obter o próximo ID disponível
  getProximoId() {
    const itens = this.recuperarDados();

    // Cria um conjunto com todos os IDs existentes, para não repetir.
    const idsExistentes = new Set(itens.map((item) => parseInt(item.id)));

    // Encontra o próximo ID disponível, não segue uma sequencia obrigatoriamente.
    let proximoId = 1; // começa do ID 1
    // se já exitir procura outro.
    while (idsExistentes.has(proximoId)) {
      proximoId++;
    }
    return proximoId;
  }

  // Método para salvar um item no armazenamento local
  salvar(item) {
    // Obtém o próximo ID disponível
    let id = this.getProximoId();
    localStorage.setItem(id, JSON.stringify(item));
  }

  // Método para recuperar todos os dados do armazenamento local
  recuperarDados() {
    // consigo pegar todas as chaves do meu localStorage e converto para num. ex: (2, 4)
    const keys = Object.keys(localStorage).map(Number);
    const itens = [];

    // percorro todas as chaves, que é o mesmo que percorrer todos as key que não são sequencial
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

  // Método para remover um item do armazenamento local
  removerDados(id) {
    localStorage.removeItem(id);
  }
}
