let contador = 0;

const textoContador = document.querySelector("#contador");
const titulo = document.querySelector("#titulo");
const mensagem = document.querySelector("#mensagem");
const fotografia = document.querySelector("#fotografia");
const coordenadas = document.querySelector("#coordenadas");
const zonaRato = document.querySelector("#zona-rato");

function incrementarContador() {
  contador++;

  textoContador.textContent = contador;

  console.log("Contador:", contador);
}

function duploClique() {
  titulo.textContent = "Fizeste duplo clique!";

  titulo.style.color = "yellow";

  console.log("Evento dblclick executado");
}

function ratoEntrou() {
  mensagem.textContent = "O rato entrou na imagem!";

  fotografia.style.transform = "scale(1.05)";
  fotografia.style.border = "5px solid green";

  console.log("Evento mouseover executado");
}

function ratoSaiu() {
  mensagem.textContent = "O rato saiu da imagem.";

  fotografia.style.transform = "scale(1)";
  fotografia.style.border = "none";

  console.log("Evento mouseout executado");
}

function moverRato(event) {
  coordenadas.textContent =
    "Posição do rato: X = " +
    event.offsetX +
    " | Y = " +
    event.offsetY;

  zonaRato.style.backgroundColor = "#dddddd";
}
