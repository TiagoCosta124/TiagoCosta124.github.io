let contador = 0;

const textoContador = document.querySelector("#contador");
const titulo = document.querySelector("#titulo");
const mensagem = document.querySelector("#mensagem");
const fotografia = document.querySelector("#fotografia");
const coordenadas = document.querySelector("#coordenadas");
const zonaRato = document.querySelector("#zona-rato");

const botaoContador = document.querySelector("#botao-contador");
const botaoDuplo = document.querySelector("#botao-duplo");

function incrementarContador() {
  contador++;
  textoContador.textContent = contador;
}

function duploClique() {
  titulo.textContent = "Fizeste duplo clique!";
  titulo.style.color = "yellow";
}

function ratoEntrou() {
  mensagem.textContent = "O rato entrou na imagem!";
  fotografia.style.transform = "scale(1.05)";
  fotografia.style.border = "5px solid green";
}

function ratoSaiu() {
  mensagem.textContent = "O rato saiu da imagem.";
  fotografia.style.transform = "scale(1)";
  fotografia.style.border = "none";
}

function moverRato(event) {
  coordenadas.textContent =
    "Posição do rato: X = " +
    event.offsetX +
    " | Y = " +
    event.offsetY;

  zonaRato.style.backgroundColor = "#ddd";
}

botaoContador.addEventListener("click", incrementarContador);
botaoDuplo.addEventListener("dblclick", duploClique);
fotografia.addEventListener("mouseover", ratoEntrou);
fotografia.addEventListener("mouseout", ratoSaiu);
zonaRato.addEventListener("mousemove", moverRato);
