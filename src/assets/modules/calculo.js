import { recuperarDados } from "./localStorageModule.js";

const entradasElemento = document.querySelector("#valorEntrada");
const saidasElemento = document.querySelector("#valorSaida");
const balancoElemento = document.querySelector("#balanco");

function calcularTotal(tipo) {
  const dados = recuperarDados();
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

export default function atualizarValores() {
  entradasElemento.textContent = calcularTotal("Entrada");
  saidasElemento.textContent = calcularTotal("Saida");
  balancoElemento.textContent = calcularBalanco();
}

atualizarValores();
