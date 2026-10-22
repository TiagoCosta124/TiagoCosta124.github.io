// A. declaração de variáveis

const nodeInputNumero = document.querySelector(
  "#registo input[type='number']",
);

const nodeInputSubmit = document.querySelector(
  "#registo input[type='submit']",
);

const nodeUlColecao = document.querySelector("#colecao ul");
const nodeUlRepetidos = document.querySelector("#repetidos ul");

const nodeTotalColecao = document.querySelector(
  "#colecao .total",
);

const nodeTotalRepetidos = document.querySelector(
  "#repetidos .total",
);

const form = document.querySelector("#registo form");

const colecao =
  JSON.parse(localStorage.getItem("colecao")) || [];

const repetidos =
  JSON.parse(localStorage.getItem("repetidos")) || [];


// B. event handlers

function guardaDados() {
  localStorage.setItem(
    "colecao",
    JSON.stringify(colecao),
  );

  localStorage.setItem(
    "repetidos",
    JSON.stringify(repetidos),
  );
}

function atualizaTotais() {
  nodeTotalColecao.textContent = colecao.length;
  nodeTotalRepetidos.textContent = repetidos.length;
}

function atualizaLista(lista, nodeUl) {
  nodeUl.innerHTML = "";

  lista.forEach((numero, indice) => {
    const nodeLi = document.createElement("li");

    if (nodeUl === nodeUlRepetidos) {
      nodeLi.innerHTML =
        numero +
        ' <button type="button" data-indice="' +
        indice +
        '">Eliminar</button>';
    } else {
      nodeLi.textContent = numero;
    }

    nodeUl.append(nodeLi);
  });

  if (nodeUl === nodeUlRepetidos) {
    associaEventosEliminar();
  }
}

function guardaCarta() {
  const numero = Number(nodeInputNumero.value);

  if (colecao.includes(numero)) {
    repetidos.push(numero);
    repetidos.sort((a, b) => a - b);
  } else {
    colecao.push(numero);
    colecao.sort((a, b) => a - b);
  }

  guardaDados();

  atualizaLista(colecao, nodeUlColecao);
  atualizaLista(repetidos, nodeUlRepetidos);

  atualizaTotais();

  nodeInputNumero.value = "";
  nodeInputNumero.focus();

  nodeInputSubmit.value = "Registar Cromo";
}

function eliminarRepetido(event) {
  const indice = Number(event.target.dataset.indice);

  repetidos.splice(indice, 1);

  guardaDados();

  atualizaLista(repetidos, nodeUlRepetidos);
  atualizaTotais();
}


// C. event listeners

form.onsubmit = (event) => {
  event.preventDefault();

  guardaCarta();
};

function associaEventosEliminar() {
  document
    .querySelectorAll("#repetidos button")
    .forEach((button) => {
      button.onclick = eliminarRepetido;
    });
}


// D. inicialização da página

atualizaLista(colecao, nodeUlColecao);
atualizaLista(repetidos, nodeUlRepetidos);
atualizaTotais();
