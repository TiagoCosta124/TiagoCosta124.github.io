const passar = document.querySelector("#passar");
const pinta = document.querySelector("#pinta");
const botoesCores = document.querySelectorAll("button.color");
const escrever = document.querySelector("#escrever");

const selecionarCor = document.querySelector("#cor-pagina");

const textoContador = document.querySelector("#contador");
const incrementar = document.querySelector("#incrementar");
const decrementar = document.querySelector("#decrementar");
const reset = document.querySelector("#reset");

const formulario = document.querySelector("#form-utilizador");
const nome = document.querySelector("#nome");
const idade = document.querySelector("#idade");
const frase = document.querySelector("#frase");

const automatico = document.querySelector("#automatico");

const direcao = document.querySelector("#direcao");
const bolas = document.querySelector("#bolas");

passar.onmouseover = () => {
  passar.textContent = "Obrigado por passares!";
};

botoesCores.forEach((button) => {
  button.onclick = () => {
    pinta.style.color = button.dataset.color;
  };
});

const cores = ["yellow", "black", "lightblue", "orange"];

escrever.onkeyup = () => {
  if (escrever.value.length === 0) {
    escrever.style.backgroundColor = "white";
    escrever.style.color = "black";
    return;
  }

  const posicao = (escrever.value.length - 1) % cores.length;

  escrever.style.backgroundColor = cores[posicao];

  if (cores[posicao] === "black") {
    escrever.style.color = "white";
  } else {
    escrever.style.color = "black";
  }
};

selecionarCor.onchange = function () {
  document.body.style.backgroundColor = this.value;
};

if (!localStorage.getItem("contador")) {
  localStorage.setItem("contador", 0);
}

let contador = Number(localStorage.getItem("contador"));

const atualizarContador = () => {
  textoContador.textContent = contador;
  localStorage.setItem("contador", contador);
};

atualizarContador();

incrementar.onclick = () => {
  contador++;
  atualizarContador();
};

decrementar.onclick = () => {
  contador--;
  atualizarContador();
};

reset.onclick = () => {
  contador = 0;
  atualizarContador();
};

formulario.onsubmit = (e) => {
  e.preventDefault();

  frase.textContent =
    "Olá, o " + nome.value + " tem " + idade.value + "!";
};

let contadorAutomatico = 0;

const contarAutomaticamente = () => {
  contadorAutomatico++;
  automatico.textContent = contadorAutomatico;
};

setInterval(contarAutomaticamente, 1000);

direcao.onchange = function () {
  bolas.style.flexDirection = this.value;
};
