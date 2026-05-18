import { atualizarJogadorAtivo } from "./atualizar_jogador_ativos.js";

export function trocarJogador(estado) {
  const jogador1 = estado.jogadores[0];
  const jogador2 = estado.jogadores[1];

  const timer = document.querySelector(".timer");

  if (estado.jogadorAtual === jogador1) {
    estado.jogadorAtual = jogador2;
    timer.style.backgroundColor ="blue";
  } else {
    estado.jogadorAtual = jogador1;
    timer.style.backgroundColor ="red";
  }

  atualizarJogadorAtivo(estado);

  if (estado.statusJogo) {
    estado.statusJogo.textContent = `Vez de ${estado.jogadorAtual.nome}`;
  }

  if (estado.reiniciarTimer) {
    estado.reiniciarTimer();
  }
}