import * as dom from "./assets/modules/domManipulacao.js";
import * as storage from "./assets/modules/localStorageModule.js";
import { cardValores } from "./assets/modules/calculo.js";
import { inputsValidos } from "./assets/modules/dataHandler.js";

dom.formarLista();

const btnFrom = document.querySelector("#btnFrom");
const btnCancelar = document.querySelector("#btnCancelar");

document.addEventListener("click", (e) => {
  const elementoHtml = e.target;

  if (elementoHtml == btnFrom || elementoHtml == btnCancelar) {
    dom.toggleModal("adicionar");
  } else if (elementoHtml == dom.btnAdicionar) {
    salvarDados();
  }
});

function salvarDados() {
  if (inputsValidos()) {
    console.log("aqui");
    storage.salvarNovoitem(inputsValidos(storage.getProximoId()));
    dom.formarItem(inputsValidos());
    cardValores();
    dom.inputValor.value = "";
    dom.inputDescricao.value = "";
  }
}
