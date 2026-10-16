const passar = document.querySelector("#passar");
const pinta = document.querySelector("#pinta");
const botoesCores = document.querySelectorAll("[data-color]");
const escrever = document.querySelector("#escrever");
const formCor = document.querySelector("#form-cor");
const cor = document.querySelector("#cor");
const botaoContar = document.querySelector("#contar");
const textoContador = document.querySelector("#contador");

let contador = 0;

passar.onmouseover = function () {
  passar.textContent = "Obrigado por passares!";
};

botoesCores.forEach(function (button) {
  button.onclick = function () {
    pinta.style.color = button.dataset.color;
  };
});

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

formCor.onsubmit = function () {
  document.body.style.backgroundColor = cor.value;
  return false;
};

botaoContar.onclick = function () {
  contador++;
  textoContador.textContent = contador;
};
