export function atualizarListaJogadores(estado) {
  const listaJogador1 = document.getElementById("lista-jogador1");
  const listaJogador2 = document.getElementById("lista-jogador2");

  const qtdJogador1 = document.getElementById("qtd-jogador1");
  const qtdJogador2 = document.getElementById("qtd-jogador2");

  const jogador1 = estado.jogadores[0];
  const jogador2 = estado.jogadores[1];

  if (qtdJogador1) {
    qtdJogador1.textContent = jogador1.paises.length;
  }

  if (qtdJogador2) {
    qtdJogador2.textContent = jogador2.paises.length;
  }

  if (listaJogador1) {
    listaJogador1.innerHTML = "";

    jogador1.paises.forEach(pais => {
      const item = document.createElement("li");
      item.textContent = pais;
      listaJogador1.appendChild(item);
    });
  }

  if (listaJogador2) {
    listaJogador2.innerHTML = "";

    jogador2.paises.forEach(pais => {
      const item = document.createElement("li");
      item.textContent = pais;
      listaJogador2.appendChild(item);
    });
  }
}
