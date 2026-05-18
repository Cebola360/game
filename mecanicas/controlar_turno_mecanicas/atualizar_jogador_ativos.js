export function atualizarJogadorAtivo(estado) {
  const boxJogador1 = document.getElementById("jogador-vermelho");
  const boxJogador2 = document.getElementById("jogador-azul");

  if (!boxJogador1 || !boxJogador2) {
    return;
  }

  boxJogador1.classList.remove("ativo");
  boxJogador2.classList.remove("ativo");

  if (estado.jogadorAtual === estado.jogadores[0]) {
    boxJogador1.classList.add("ativo");
  } else {
    boxJogador2.classList.add("ativo");
  }
}