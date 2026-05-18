import { perguntas } from "../entidades/perguntas.js";

import { mostrarVizinhos } from "./mostrar_vizinhos.js";
import { limparVizinhosMarcados } from "./controlar_turno_mecanicas/limpar_vizinhos_marcados.js";
import { atualizarJogadorAtivo } from "./controlar_turno_mecanicas/atualizar_jogador_ativos.js";
import { removerTerritorioDeTodos, adicionarTerritorioAoJogador } from "./controlar_turno_mecanicas/remover_e_adicionar_territorio.js";
import { atualizarListaJogadores } from "./controlar_turno_mecanicas/atualizar_lista_jogadores.js";
import { trocarJogador } from "./controlar_turno_mecanicas/trocar_jogador.js";
import { mostrarPergunta } from "./controlar_turno_mecanicas/mostrar_pergunta.js";

function conquistarTerritorio(territorio, estado) {
  const jogadorAtual = estado.jogadorAtual;
  const nomeTerritorio = territorio.id;

   console.log("Tentando conquistar:", nomeTerritorio);
  console.log("Jogador atual:", jogadorAtual.nome);
  console.log("Cor do jogador:", jogadorAtual.cor);

  removerTerritorioDeTodos(nomeTerritorio, estado.jogadores);
  adicionarTerritorioAoJogador(nomeTerritorio, jogadorAtual);

  limparVizinhosMarcados(estado, territorio);

  territorio.setAttribute("fill", jogadorAtual.cor);

  atualizarListaJogadores(estado);
  console.log("Territórios Player 1:", estado.jogadores[0].paises);
  console.log("Territórios Player 2:", estado.jogadores[1].paises);

  if (estado.statusJogo) {
    estado.statusJogo.textContent =
      `${jogadorAtual.nome} conquistou ${nomeTerritorio}`;
  }

  trocarJogador(estado);
}

export function trocarTurnoPorTempo(estado) {
  if (!estado.jogoIniciado) {
    return;
  }

  limparVizinhosMarcados(estado);

  if (estado.statusJogo) {
    estado.statusJogo.textContent =
      `Tempo acabou. Agora é vez do próximo jogador.`;
  }

  trocarJogador(estado);
}

export function controlarTurno(territorio, fronteiras, estado) {
  if (!estado.jogoIniciado) {
    if (estado.statusJogo) {
      estado.statusJogo.textContent = "Clique em Iniciar Jogo antes de jogar";
    }

    return;
  }

  const jogadorAtual = estado.jogadorAtual;
  const corTerritorio = territorio.getAttribute("fill");

  const territorioEhDoJogadorAtual = corTerritorio === jogadorAtual.cor;

  // Primeiro clique: jogador escolhe um território que já é dele
  if (territorioEhDoJogadorAtual) {
    limparVizinhosMarcados(estado);

    estado.territorioSelecionado = territorio;

    estado.vizinhosValidos = mostrarVizinhos(
      territorio,
      fronteiras,
      jogadorAtual.cor
    );

    estado.vizinhosValidos.forEach(vizinho => {
      vizinho.dataset.corOriginal = vizinho.getAttribute("fill");
      vizinho.setAttribute("fill", "#ffc0cb");
    });

    if (estado.statusJogo) {
      estado.statusJogo.textContent =
        `${jogadorAtual.nome}, escolha um território vizinho para conquistar`;
    }

    return;
  }

function pegarPerguntaAleatoria() {

  // reinicia quando acabar
  if (
    perguntasDisponiveis.length === 0
  ) {

    perguntasDisponiveis =
      [...perguntas];

  }

  const indice =
    Math.floor(
      Math.random() *
      perguntasDisponiveis.length
    );

  const pergunta =
    perguntasDisponiveis[indice];

  // remove pergunta usada
  perguntasDisponiveis.splice(
    indice,
    1
  );

  return pergunta;

}

let perguntaAleatoria =

  perguntas[
    Math.floor(
      Math.random() *
      perguntas.length
    )
  ];

console.log(perguntaAleatoria);

  // Segundo clique: se clicou em um vizinho válido, conquista direto
  if (
  estado.vizinhosValidos.includes(
    territorio
  )
) {

  mostrarPergunta(
    perguntaAleatoria.pergunta,

  perguntaAleatoria.alternativas,

  perguntaAleatoria.correta,

    (acertou) => {

  if (acertou) {

    conquistarTerritorio(
      territorio,
      estado
    );

  } else {

  limparVizinhosMarcados(estado);

  trocarJogador(estado);

}

}

  );

  return;

}

  if (estado.statusJogo) {
    estado.statusJogo.textContent =
      "Selecione primeiro um território seu e depois um vizinho válido";
  }
}