// A. Estado e variáveis com referência de elementos do DOM

const nodeProdutos = document.querySelector(
  "#produtos .lista-produtos",
);

const nodeCesto = document.querySelector(
  "#cesto .lista-cesto",
);

const nodeTotal = document.querySelector("#total");

const chaveCesto = "produtos-selecionados";


// B. Funções utilitárias

function obterCesto() {
  const dados = localStorage.getItem(chaveCesto);

  if (dados === null) {
    return [];
  }

  return JSON.parse(dados);
}

function guardarCesto(cesto) {
  localStorage.setItem(
    chaveCesto,
    JSON.stringify(cesto),
  );
}

function criarProduto(produto) {
  const article = document.createElement("article");

  const titulo = document.createElement("h3");
  titulo.textContent = produto.title;

  const imagem = document.createElement("img");
  imagem.src = produto.image;
  imagem.alt = produto.title;

  const preco = document.createElement("p");
  preco.textContent =
    "Custo total: " + produto.price + " €";

  const categoria = document.createElement("p");
  categoria.textContent =
    "Categoria: " + produto.category;

  const descricao = document.createElement("p");
  descricao.textContent = produto.description;

  const avaliacao = document.createElement("p");
  avaliacao.textContent =
    "Avaliação: " + produto.rating.rate;

  const botao = document.createElement("button");
  botao.type = "button";
  botao.textContent = "+ Adicionar ao Cesto";

  botao.addEventListener("click", () => {
    const cesto = obterCesto();

    cesto.push(produto);

    guardarCesto(cesto);

    atualizaCesto();
  });

  article.append(
    titulo,
    imagem,
    preco,
    categoria,
    descricao,
    avaliacao,
    botao,
  );

  return article;
}

function criarProdutoCesto(produto, indice) {
  const article = document.createElement("article");

  const titulo = document.createElement("h3");
  titulo.textContent = produto.title;

  const imagem = document.createElement("img");
  imagem.src = produto.image;
  imagem.alt = produto.title;

  const preco = document.createElement("p");
  preco.textContent =
    "Custo total: " + produto.price + " €";

  const botao = document.createElement("button");
  botao.type = "button";
  botao.textContent = "- Remover do Cesto";

  botao.addEventListener("click", () => {
    const cesto = obterCesto();

    cesto.splice(indice, 1);

    guardarCesto(cesto);

    atualizaCesto();
  });

  article.append(
    titulo,
    imagem,
    preco,
    botao,
  );

  return article;
}


// C. Event handlers

function renderizarProdutos(listaProdutos) {
  nodeProdutos.innerHTML = "";

  listaProdutos.forEach((produto) => {
    const article = criarProduto(produto);

    nodeProdutos.append(article);
  });
}

function atualizaCesto() {
  const cesto = obterCesto();

  nodeCesto.innerHTML = "";

  let total = 0;

  cesto.forEach((produto, indice) => {
    const article = criarProdutoCesto(
      produto,
      indice,
    );

    nodeCesto.append(article);

    total += produto.price;
  });

  nodeTotal.textContent = total.toFixed(2);
}


// D. Event Listeners

// Os event listeners dos botões são criados
// dentro de criarProduto() e criarProdutoCesto().


// E. Inicialização

if (localStorage.getItem(chaveCesto) === null) {
  guardarCesto([]);
}

renderizarProdutos(produtos);
atualizaCesto();