import { listaPaises } from "./entidades/paises.js";
import { jogador1, jogador2 } from "./entidades/jogadores.js";
import { fronteiras } from "./entidades/fronteiras.js";

import { iniciarTimer, zerarTimer } from "./interface/timer.js";
import { barraFeedbackPaisClicado } from "./interface/barra_de_feedback.js";
import { aparecerPaises } from "./interface/evento_aparecer_pais.js";

import { EmbaralharPaisesIniciais } from "./mecanicas/embaralhar_paises.js";
import { controlarTurno, trocarTurnoPorTempo } from "./mecanicas/controlar_turno.js";

const mapa = document.getElementById("mapa");
const nomePais = document.getElementById("nomePais");
const display = document.getElementById("tempo");
const btnIniciar = document.getElementById("btnIniciar");
const statusJogo = document.getElementById("statusJogo");

let territorios = [];

const estadoJogo = {
  jogoIniciado: false,
  rodada: 0,
  jogadores: [jogador1, jogador2],
  jogadorAtual: jogador1,
  territorioSelecionado: null,
  vizinhosValidos: [],
  statusJogo,
  reiniciarTimer: null
};
zerarTimer(display);

fetch("mapa.svg")
  .then(response => {
    if (!response.ok) {
      throw new Error("Arquivo mapa.svg não encontrado");
    }

    return response.text();
  })
  .then(svg => {
    mapa.innerHTML = svg;

    territorios = mapa.querySelectorAll("path");

    aparecerPaises(territorios);

    territorios.forEach(territorio => {
      barraFeedbackPaisClicado(territorio, nomePais);

      territorio.addEventListener("click", () => {
        if (!estadoJogo.jogoIniciado) {
          statusJogo.textContent = "Clique em Iniciar Jogo";
          return;
        }

        controlarTurno(territorio, fronteiras, estadoJogo);
      });
    });

    console.log("Mapa carregado com sucesso");
  })
  .catch(error => {
    console.error("Erro ao carregar o mapa:", error);

    if (nomePais) {
      nomePais.textContent = "Erro ao carregar mapa";
    }
  });

  function destacarJogadorAtual() {
  const boxJogador1 = document.getElementById("jogador-vermelho");
  const boxJogador2 = document.getElementById("jogador-azul");

  if (!boxJogador1 || !boxJogador2) {
    console.log("Boxes dos jogadores não encontrados no HTML");
    return;
  }

  boxJogador1.classList.remove("ativo");
  boxJogador2.classList.remove("ativo");

  if (estadoJogo.jogadorAtual === jogador1) {
    boxJogador1.classList.add("ativo");
  } else {
    boxJogador2.classList.add("ativo");
  }
}

btnIniciar.addEventListener("click", () => {
  if (estadoJogo.jogoIniciado) {
    return;
  }

  console.log("Jogo iniciado");

  estadoJogo.jogoIniciado = true;
  estadoJogo.rodada = 1;
  estadoJogo.jogadorAtual = jogador1;
  estadoJogo.territorioSelecionado = null;
  estadoJogo.vizinhosValidos = [];

  jogador1.paises = [];
  jogador2.paises = [];

  const copiaListaPaises = [...listaPaises];

  EmbaralharPaisesIniciais(
    copiaListaPaises,
    jogador1,
    jogador2,
    mapa
  );

  estadoJogo.reiniciarTimer = () => {
    iniciarTimer(display, 30, () => {
      trocarTurnoPorTempo(estadoJogo);
    });
  };

  statusJogo.textContent = `Rodada ${estadoJogo.rodada} - Vez de ${jogador1.nome}`;

  destacarJogadorAtual();

  zerarTimer(display);
  estadoJogo.reiniciarTimer();

  btnIniciar.disabled = true;
  btnIniciar.style.display = "none";
});