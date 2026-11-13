// A. Estado e variáveis com referência de elementos do DOM

let produtos = [];

const apiBase =
  "https://deisishop.pw.deisi.ulusofona.pt";

const nodeProdutos = document.querySelector(
  "#produtos .lista-produtos",
);

const nodeCesto = document.querySelector(
  "#cesto .lista-cesto",
);

const nodeTotal =
  document.querySelector("#total");

const nodeFiltro =
  document.querySelector("#filtro");

const nodeOrdenar =
  document.querySelector("#ordenar");

const nodePesquisa =
  document.querySelector("#pesquisa");

const nodeEstudante =
  document.querySelector("#estudante");

const nodeCupao =
  document.querySelector("#cupao");

const nodeComprar =
  document.querySelector("#comprar");

const nodeReferencia =
  document.querySelector("#referencia");

const nodeTotalCompra =
  document.querySelector("#total-compra");

const chaveCesto =
  "produtos-selecionados";


// B. Funções utilitárias


// LOCAL STORAGE

function obterCesto() {

  const dados =
    localStorage.getItem(chaveCesto);

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


// CRIAR PRODUTO DA LOJA

function criarProduto(produto) {

  const article =
    document.createElement("article");


  const titulo =
    document.createElement("h3");

  titulo.textContent =
    produto.title;


  const imagem =
    document.createElement("img");

  imagem.alt =
    produto.title;


  if (produto.image !== null) {

    if (
      produto.image.indexOf("http") === 0
    ) {

      imagem.src =
        produto.image;
    }

    else {

      imagem.src =
        apiBase + produto.image;
    }
  }


  const preco =
    document.createElement("p");

  preco.textContent =
    "Custo total: " +
    produto.price +
    " €";


  const categoria =
    document.createElement("p");

  categoria.textContent =
    "Categoria: " +
    produto.category;


  const descricao =
    document.createElement("p");

  descricao.textContent =
    produto.description;


  const avaliacao =
    document.createElement("p");

  avaliacao.textContent =
    "Avaliação: " +
    produto.rating.rate;


  const botao =
    document.createElement("button");

  botao.type =
    "button";

  botao.textContent =
    "+ Adicionar ao Cesto";


  botao.addEventListener(
    "click",
    () => {

      const cesto =
        obterCesto();

      cesto.push(produto);

      guardarCesto(cesto);

      atualizaCesto();
    },
  );


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


// CRIAR PRODUTO DO CESTO

function criarProdutoCesto(
  produto,
  indice,
) {

  const article =
    document.createElement("article");


  const titulo =
    document.createElement("h3");

  titulo.textContent =
    produto.title;


  const imagem =
    document.createElement("img");

  imagem.alt =
    produto.title;


  if (produto.image !== null) {

    if (
      produto.image.indexOf("http") === 0
    ) {

      imagem.src =
        produto.image;
    }

    else {

      imagem.src =
        apiBase + produto.image;
    }
  }


  const preco =
    document.createElement("p");

  preco.textContent =
    "Custo total: " +
    produto.price +
    " €";


  const botao =
    document.createElement("button");

  botao.type =
    "button";

  botao.textContent =
    "- Remover do Cesto";


  botao.addEventListener(
    "click",
    () => {

      const cesto =
        obterCesto();

      cesto.splice(
        indice,
        1,
      );

      guardarCesto(cesto);

      atualizaCesto();
    },
  );


  article.append(
    titulo,
    imagem,
    preco,
    botao,
  );


  return article;
}


// API - PRODUTOS

function carregarProdutos() {

  fetch(
    apiBase + "/products",
  )

    .then(
      (response) =>
        response.json(),
    )

    .then(
      (dados) => {

        console.log(
          "PRODUTOS DA API:",
          dados,
        );

        produtos =
          dados;

        renderizarProdutos(
          produtos,
        );
      },
    )

    .catch(
      (erro) => {

        console.log(
          "Erro nos produtos:",
          erro,
        );
      },
    );
}


// API - CATEGORIAS

function carregarCategorias() {

  fetch(
    apiBase + "/categories",
  )

    .then(
      (response) =>
        response.json(),
    )

    .then(
      (categorias) => {

        console.log(
          "CATEGORIAS DA API:",
          categorias,
        );


        categorias.forEach(
          (categoria) => {

            console.log(
              "CATEGORIA:",
              categoria,
            );

            console.log(
              "NOME DA CATEGORIA:",
              categoria.name,
            );


            const option =
              document.createElement(
                "option",
              );

            option.value =
              categoria.name;

            option.textContent =
              categoria.name;

            nodeFiltro.append(
              option,
            );
          },
        );
      },
    )

    .catch(
      (erro) => {

        console.log(
          "Erro nas categorias:",
          erro,
        );
      },
    );
}


// C. Event handlers


// MOSTRAR PRODUTOS

function renderizarProdutos(
  listaProdutos,
) {

  nodeProdutos.innerHTML =
    "";


  listaProdutos.forEach(
    (produto) => {

      const article =
        criarProduto(produto);

      nodeProdutos.append(
        article,
      );
    },
  );
}


// FILTRO + ORDENAÇÃO + PESQUISA

function atualizarProdutos() {

  let lista =
    [...produtos];


  const categoria =
    nodeFiltro.value;

  const ordem =
    nodeOrdenar.value;

  const pesquisa =
    nodePesquisa.value;


  if (
    categoria !== ""
  ) {

    lista =
      lista.filter(
        (produto) =>
          produto.category ===
          categoria,
      );
  }


  if (
    pesquisa !== ""
  ) {

    lista =
      lista.filter(
        (produto) =>
          produto.title.indexOf(
            pesquisa,
          ) !== -1,
      );
  }


  if (
    ordem ===
    "crescente"
  ) {

    lista.sort(
      (
        produto1,
        produto2,
      ) =>
        Number(produto1.price) -
        Number(produto2.price),
    );
  }


  if (
    ordem ===
    "decrescente"
  ) {

    lista.sort(
      (
        produto1,
        produto2,
      ) =>
        Number(produto2.price) -
        Number(produto1.price),
    );
  }


  renderizarProdutos(
    lista,
  );
}


// ATUALIZAR CESTO

function atualizaCesto() {

  const cesto =
    obterCesto();

  nodeCesto.innerHTML =
    "";

  let total =
    0;


  cesto.forEach(
    (
      produto,
      indice,
    ) => {

      const article =
        criarProdutoCesto(
          produto,
          indice,
        );

      nodeCesto.append(
        article,
      );


      total =
        total +
        Number(produto.price);
    },
  );


  nodeTotal.textContent =
    total.toFixed(2);
}


// CHECKOUT

function comprar() {

  const cesto =
    obterCesto();


  const produtosCompra =
    [];


  cesto.forEach(
    (produto) => {

      produtosCompra.push(
        produto.id,
      );
    },
  );


  const dadosCompra = {

    products:
      produtosCompra,

    student:
      nodeEstudante.value ===
      "sim",

    coupon:
      nodeCupao.value,

    name:
      "",
  };


  fetch(
    apiBase + "/buy",
    {

      method:
        "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body:
        JSON.stringify(
          dadosCompra,
        ),
    },
  )

    .then(
      (response) =>
        response.json(),
    )

    .then(
      (dados) => {

        if (
          dados.error
        ) {

          console.log(
            "Erro:",
            dados.error,
          );

          return;
        }


        nodeReferencia.textContent =
          dados.reference;


        nodeTotalCompra.textContent =
          dados.totalCost;


        console.log(
          dados.message,
        );
      },
    )

    .catch(
      (erro) => {

        console.log(
          "Erro:",
          erro,
        );
      },
    );
}


// D. Event Listeners

nodeFiltro.addEventListener(
  "change",
  atualizarProdutos,
);


nodeOrdenar.addEventListener(
  "change",
  atualizarProdutos,
);


nodePesquisa.addEventListener(
  "keyup",
  atualizarProdutos,
);


nodeComprar.addEventListener(
  "click",
  comprar,
);


// E. Inicialização

if (
  localStorage.getItem(
    chaveCesto,
  ) === null
) {

  guardarCesto([]);
}


carregarProdutos();

carregarCategorias();

atualizaCesto();