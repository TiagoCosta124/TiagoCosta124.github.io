const passar = document.querySelector("#passar");

const pinta = document.querySelector("#pinta");
const botoesCores = document.querySelectorAll("[data-color]");

const escrever = document.querySelector("#escrever");

const formCor = document.querySelector("#form-cor");
const cor = document.querySelector("#cor");

const botaoContar = document.querySelector("#contar");
const textoContador = document.querySelector("#contador");

let contador = 0;


/* 1 - PASSAR O RATO */

passar.onmouseover = function () {
  passar.textContent = "Obrigado por passares!";
};


/* 2 - PINTAR A PALAVRA */

botoesCores.forEach(function (button) {
  button.onclick = function () {
    pinta.style.color = button.dataset.color;
  };
});


/* 3 - COR DA CAIXA AO ESCREVER */

const cores = ["yellow", "black", "lightblue", "orange"];

escrever.onkeyup = function () {
  const quantidade = escrever.value.length;
  const posicao = quantidade % cores.length;

  escrever.style.backgroundColor = cores[posicao];

  if (cores[posicao] === "black") {
    escrever.style.color = "white";
  } else {
    escrever.style.color = "black";
  }
};


/* 4 - COR DO FUNDO */

formCor.onsubmit = function () {
  document.body.style.backgroundColor = cor.value;

  return false;
};


/* 5 - CONTADOR */

botaoContar.onclick = function () {
  contador++;

  textoContador.textContent = contador;
};
