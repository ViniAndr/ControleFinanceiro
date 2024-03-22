import * as db from "./localStorageModule.js";
import { formatarData, inputsValidos } from "./dataHandler.js";

// modal
const modal = document.querySelector(".modal");
const container = document.querySelector(".container");

// valores
const entradasElemento = document.querySelector("#valorEntrada");
const saidasElemento = document.querySelector("#valorSaida");
const balancoElemento = document.querySelector("#balanco");

//tabela
const tabelaElemento = document.querySelector("#tabelaValores");

export const btnAdicionar = document.querySelector("#btnAdicionar");
export const btnAtualizar = document.querySelector("#btnAtualizar");

// inputs, alguns modulos terám acesso a eles
export const inputValor = document.querySelector("#valor");
export const inputDescricao = document.querySelector("#descricao");
export const inputSaida = document.querySelector("#saida");
export const inputData = document.querySelector("#data");

// ativar e desativar o modal
export function toggleModal(btn) {
  modal.classList.toggle("modalAtivado");
  container.classList.toggle("containerDisab");
  if (btn == "adicionar") {
    btnAtualizar.style.display = "none";
    btnAdicionar.style.display = "block";
  } else {
    btnAdicionar.style.display = "none";
    btnAtualizar.style.display = "block";
  }
}

// atualizar valores no front
export function atualizarValores(entrada, saida, balanco) {
  entradasElemento.textContent = `R$${entrada}`;
  saidasElemento.textContent = `R$${saida}`;
  balancoElemento.textContent = `R$${balanco}`;
}

// Função para formar um item na tabela a partir dos dados fornecidos
export function formarItem({ id, valor, descricao, data, tipo }) {
  // Insere uma nova linha na tabela
  const linha = tabelaElemento.insertRow();
  linha.setAttribute("id", id);

  // Insere os valores nas células da linha
  linha.insertCell(0).textContent = `R$ ${valor.toFixed(2)}`;
  linha.insertCell(1).textContent = descricao;
  linha.insertCell(2).textContent = tipo;
  linha.insertCell(3).textContent = formatarData(data);

  // Adiciona uma célula para ação (botão de remover) na linha
  const celulaAcao = linha.insertCell(4);
  celulaAcao.classList.add("alinhaBtnRemover");

  // Cria o botão de editar e o adiciona à célula de ação
  const botaoEditar = document.createElement("button");
  botaoEditar.className = "btnEditar";
  botaoEditar.textContent = "Editar";
  celulaAcao.appendChild(botaoEditar);

  // Cria o botão de remover e o adiciona à célula de ação
  const botaoRemover = document.createElement("button");
  botaoRemover.className = "btnRemover";
  botaoRemover.textContent = "Remover";
  botaoRemover.addEventListener("click", () => {
    apagarLinha(id, botaoRemover);
  });
  celulaAcao.appendChild(botaoRemover);
}

// Função para apagar uma linha da tabela e remover o item do armazenamento local
function apagarLinha(id, el) {
  // talvez uma possivel alteração
  // const linha = document.querySelector(`tr[data-id="${id}"]`);
  const linha = el.parentElement.parentElement;
  console.log(linha);
  linha.remove();
  db.removerItem(id);
  atualizarValores();
}

// Função para formar a lista de itens na tabela
export function formarLista() {
  try {
    // Recupera os dados do armazenamento local ou cria um array vazio se não houver dados
    const dados = db.recuperarItens() || [];

    // Itera sobre os dados e chama a função formarItem para cada item
    dados.forEach((item) => {
      formarItem(item);
    });
  } catch (e) {
    // Em caso de erro, exibe uma mensagem de erro no console
    console.error("Erro ao recuperar dados:", e);
  }
}
