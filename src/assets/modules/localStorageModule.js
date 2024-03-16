export default class Bd {
  // Método para obter o próximo ID disponível
  getProximoId() {
    const itens = this.recuperarDados();

    // Cria um conjunto com todos os IDs existentes
    const idsExistentes = new Set(itens.map((item) => parseInt(item.id)));

    // Encontra o próximo ID disponível na sequência
    let proximoId = 1;
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
    const itens = [];
    for (let i = 0; i <= localStorage.length; i++) {
      // Recupera o item do armazenamento local e o converte de JSON para objeto JavaScript
      const item = JSON.parse(localStorage.getItem(i));

      // Verifica se o item é válido e o adiciona ao array de itens
      if (item) {
        itens.push(item);
      }
    }
    return itens;
  }

  removerDados(id) {
    localStorage.removeItem(id);
  }
}
