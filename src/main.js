import formarItem from "./assets/modules/formarTabela.js";
import Bd from "./assets/modules/localStorageModule.js";

const container = document.querySelector(".container");
const btnFrom = document.querySelector("#btnFrom");
const modal = document.querySelector(".modal");
const btnAdicionar = document.querySelector("#btnAdicionar");
const btnCancelar = document.querySelector("#btnCancelar");
const inputValor = document.querySelector("#valor");
const inputDescricao = document.querySelector("#descricao");
const inputSaida = document.querySelector("#saida");

document.addEventListener("click", (e) => {
  const elementoHtml = e.target;
  // reduzir a condição if
  const btnRemover = elementoHtml.classList.contains("btnRemover");
  const containerDisab = container.classList.contains("containerDisab");

  if (btnRemover && !containerDisab) {
    apagarLinha(elementoHtml);
  } else if (elementoHtml == btnFrom) {
    ativarModal();
  } else if (elementoHtml == btnCancelar) {
    saiModal();
  } else if (elementoHtml == btnAdicionar) {
    salvarDados();
  }
});

function apagarLinha(el) {
  // dois parentElement, um é da celular e outro é a linha
  const linha = el.parentElement.parentElement;
  linha.remove();
}
function ativarModal() {
  modal.classList.toggle("modalAtivado");
  container.classList.toggle("containerDisab");
}
function saiModal() {
  modal.classList.remove("modalAtivado");
  container.classList.remove("containerDisab");
}

function salvarDados() {
  const valor = Number(inputValor.value);
  const descricao = inputDescricao.value;
  const tipo = inputSaida.checked ? "Saida" : "Entrada";

  if (valor <= 0 || descricao === "") {
    return;
  }

  const obj = {
    valor,
    descricao,
    tipo,
  };

  const bd = new Bd();
  bd.salvar(obj);
  formarItem(obj);

  inputValor.value = "";
  inputDescricao.value = "";
}
