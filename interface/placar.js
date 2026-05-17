const TOTAL_TERRITORIOS = 27;

function criarItensLista(lista, paises) {
  lista.innerHTML = "";

  paises.forEach(pais => {
    const item = document.createElement("li");
    item.textContent = pais;
    lista.appendChild(item);
  });
}

export function atualizarPlacar(jogador1, jogador2) {
  const qtdJogador1 = document.getElementById("qtd-jogador1");
  const qtdJogador2 = document.getElementById("qtd-jogador2");

  const porcentagemJogador1 = document.getElementById("porcentagem-jogador1");
  const porcentagemJogador2 = document.getElementById("porcentagem-jogador2");

  const listaJogador1 = document.getElementById("lista-jogador1");
  const listaJogador2 = document.getElementById("lista-jogador2");

  qtdJogador1.textContent = jogador1.paises.length;
  qtdJogador2.textContent = jogador2.paises.length;

  porcentagemJogador1.textContent =
    `${Math.round((jogador1.paises.length / TOTAL_TERRITORIOS) * 100)}%`;

  porcentagemJogador2.textContent =
    `${Math.round((jogador2.paises.length / TOTAL_TERRITORIOS) * 100)}%`;

  criarItensLista(listaJogador1, jogador1.paises);
  criarItensLista(listaJogador2, jogador2.paises);
}

export function atualizarJogadorAtivo(jogadorAtual) {
  const boxJogador1 = document.getElementById("jogador-vermelho");
  const boxJogador2 = document.getElementById("jogador-azul");

  boxJogador1.classList.remove("ativo");
  boxJogador2.classList.remove("ativo");

  if (jogadorAtual.cor === "red") {
    boxJogador1.classList.add("ativo");
  } else {
    boxJogador2.classList.add("ativo");
  }
}