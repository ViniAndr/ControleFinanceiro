import * as dom from "./domManipulacao.js";
export function formatarData(data) {
  const [ano, mes, dia] = data.split("-");
  const dataFormatada = `${dia}/${mes}/${ano}`;
  return dataFormatada;
}

export function inputsValidos(id) {
  const valor = Number(dom.inputValor.value);
  const descricao = dom.inputDescricao.value;
  const tipo = dom.inputSaida.checked ? "Saida" : "Entrada";
  const data = dom.inputData.value;
  console.log(dom.inputData.value, "data");

  if (valor <= 0 || descricao === "" || data == "") {
    console.log(tipo);
    return;
  }
  return {
    id,
    valor,
    descricao,
    data,
    tipo,
  };
}
