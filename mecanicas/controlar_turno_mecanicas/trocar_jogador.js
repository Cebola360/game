export function trocarJogador(estado) {
  const jogador1 = estado.jogadores[0];
  const jogador2 = estado.jogadores[1];

  if (estado.jogadorAtual === jogador1) {
    estado.jogadorAtual = jogador2;
  } else {
    estado.jogadorAtual = jogador1;
  }

  atualizarJogadorAtivo(estado);

  if (estado.statusJogo) {
    estado.statusJogo.textContent = `Vez de ${estado.jogadorAtual.nome}`;
  }

  if (estado.reiniciarTimer) {
    estado.reiniciarTimer();
  }
}