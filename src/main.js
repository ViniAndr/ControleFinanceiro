import formarItem from "./assets/modules/formarTabela.js";
import attValores from "./assets/modules/calculo.js";
import * as storage from "./assets/modules/localStorageModule.js";

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

  if (elementoHtml == btnFrom) {
    ativarModal();
  } else if (elementoHtml == btnCancelar) {
    saiModal();
  } else if (elementoHtml == btnAdicionar) {
    salvarDados();
  }
});

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
    id: storage.getProximoId(),
    valor,
    descricao,
    tipo,
  };

  storage.salvar(obj);
  formarItem(obj);
  attValores();

  inputValor.value = "";
  inputDescricao.value = "";
}
