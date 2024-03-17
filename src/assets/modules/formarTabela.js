import { recuperarDados, removerDados } from "./localStorageModule.js";
import attValores from "./calculo.js";

const tabelaElemento = document.querySelector("#tabelaValores");

// Função para formar um item na tabela a partir dos dados fornecidos
function formarItem({ id, valor, descricao, data, tipo }) {
  // Insere uma nova linha na tabela
  const linha = tabelaElemento.insertRow();

  // Insere os valores nas células da linha
  linha.insertCell(0).textContent = `R$ ${valor.toFixed(2)}`;
  linha.insertCell(1).textContent = descricao;
  linha.insertCell(2).textContent = tipo;
  linha.insertCell(3).textContent = data;

  // Adiciona uma célula para ação (botão de remover) na linha
  const celulaAcao = linha.insertCell(4);
  celulaAcao.classList.add("alinhaBtnRemover");

  // Cria o botão de remover e o adiciona à célula de ação
  const botaoRemover = document.createElement("button");
  botaoRemover.className = "btnRemover";
  botaoRemover.textContent = "Remover";
  botaoRemover.addEventListener("click", () => {
    apagarLinha(botaoRemover, id);
  });
  celulaAcao.appendChild(botaoRemover);
}

// Função para formar a lista de itens na tabela
function formarLista() {
  try {
    // Recupera os dados do armazenamento local ou cria um array vazio se não houver dados
    const dados = recuperarDados() || [];

    // Itera sobre os dados e chama a função formarItem para cada item
    dados.forEach((item) => {
      formarItem(item);
    });
  } catch (e) {
    // Em caso de erro, exibe uma mensagem de erro no console
    console.error("Erro ao recuperar dados:", e);
  }
}

// Chama a função formarLista no carregar da página
formarLista();

function apagarLinha(el, id) {
  // dois parentElement, um é da celular e outro é a linha
  const linha = el.parentElement.parentElement;
  linha.remove();
  removerDados(id);
  attValores();
}
export default formarItem;
