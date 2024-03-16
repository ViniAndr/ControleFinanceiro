export default class Bd {
  // Método construtor para inicializar a classe
  constructor() {
    // Verifica se já existe um ID no armazenamento local
    const id = localStorage.getItem("id");

    // Se não houver um ID, define o ID inicial como 0
    if (id == null) {
      localStorage.setItem("id", 0);
    }
  }

  // Método para obter o ID atual do armazenamento local
  getId() {
    return localStorage.getItem("id");
  }

  // Método para obter o próximo ID disponível
  getProximoId() {
    return parseInt(this.getId()) + 1;
  }

  // Método para salvar um item no armazenamento local
  salvar(item) {
    // Obtém o próximo ID disponível
    let id = this.getProximoId();

    localStorage.setItem(id, JSON.stringify(item));

    // Atualiza o ID no armazenamento local
    localStorage.setItem("id", id);
  }

  // Método para recuperar todos os dados do armazenamento local
  recuperarDados() {
    // Obtém o ID máximo atual do armazenamento local
    const id = localStorage.getItem("id");
    const itens = [];
    for (let i = 0; i <= id; i++) {
      // Recupera o item do armazenamento local e o converte de JSON para objeto JavaScript
      const item = JSON.parse(localStorage.getItem(i));

      // Verifica se o item é válido e o adiciona ao array de itens
      if (item) {
        itens.push(item);
      }
    }
    return itens;
  }
}
