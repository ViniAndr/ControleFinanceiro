import { recuperarItens } from "./localStorageModule.js";
import { atualizarValores } from "./domManipulacao.js";

function calcularTotal(tipo) {
  const dados = recuperarItens();
  const total = dados
    .filter((d) => d.tipo === tipo)
    .reduce((total, item) => total + item.valor, 0);
  return total.toFixed(2);
}

function calcularBalanco() {
  const totalEntradas = parseFloat(calcularTotal("Entrada"));
  const totalSaidas = parseFloat(calcularTotal("Saida"));
  const balanco = totalEntradas - totalSaidas;
  return balanco.toFixed(2);
}

export function cardValores() {
  atualizarValores(
    calcularTotal("Entrada"),
    calcularTotal("Saida"),
    calcularBalanco()
  );
}
