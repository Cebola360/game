// Importando lista de paises, jogadores e fronteiras da pasta entidades
import { listaPaises } from "./entidades/paises.js";
import { jogador1, jogador2 } from "./entidades/jogadores.js";
import { fronteiras } from "./entidades/fronteiras.js";

// Importando timer e barra de feedback do país clicado da pasta interface
import { iniciarTimer } from "./interface/timer.js";
import { barraFeedbackPaisClicado } from "./interface/barra_de_feedback.js";

// Importando mecanicas de embaralhar paises logo no inicio do jogo e de mostrar países vizinhos
import { EmbaralharPaisesIniciais } from "./mecanicas/embaralhar_paises.js";
import { mostrarVizinhos } from "./mecanicas/mostrar_vizinhos.js";

const mapa = document.getElementById("mapa");
const nomePais = document.getElementById("nomePais");
const display = document.getElementById("tempo");

// CARREGANDO MAPA
fetch("mapa.svg")

  .then(response => {
    if (!response.ok) {
      throw new Error("Arquivo mapa.svg não encontrado");
    }
    return response.text();
  })

  .then(svg => {
    mapa.innerHTML = svg;
    // Territórios (países)
    const territorios = mapa.querySelectorAll("path");

    // Distribuição inicial de países por jogadores (3 países pra cada jogador)
    EmbaralharPaisesIniciais(
      listaPaises,
      jogador1,
      jogador2,
      mapa
    );

    // Mostrando países que fazem fronteira com o país que for clicado
    let jogadorAtual = "red";

let vizinhosValidos = [];

function corDoJogador(cor, jogador) {

  if (jogador === "red") {
    return cor === "red" || cor === "#ff0000";
  }

  if (jogador === "blue") {
    return cor === "blue" || cor === "#0000ff";
  }

  return false;

}

territorios.forEach(territorio => {

  territorio.addEventListener("click", () => {

    const cor = territorio.getAttribute("fill");

    // =========================
    // PRIMEIRO CLIQUE
    // =========================

    if (
      corDoJogador(cor, jogadorAtual)
    ) {

      // limpa fronteiras antigas
      vizinhosValidos.forEach(v => {

        if (
          v.getAttribute("fill") === "#ffc0cb"
        ) {

          const corOriginal =
            v.dataset.corOriginal;

          v.setAttribute(
            "fill",
            corOriginal
          );

        }

      });

      vizinhosValidos = mostrarVizinhos(
        territorio,
        fronteiras
      );

      // salva cor original
      vizinhosValidos.forEach(vizinho => {

        vizinho.dataset.corOriginal =
          vizinho.getAttribute("fill");

        vizinho.setAttribute(
          "fill",
          "#ffc0cb"
        );

      });

      return;
    }

    // =========================
    // SEGUNDO CLIQUE
    // =========================

    if (
      vizinhosValidos.includes(territorio)
    ) {

      // conquista território
      territorio.setAttribute(
        "fill",
        jogadorAtual
      );

      // restaura outros vizinhos
      vizinhosValidos.forEach(vizinho => {

        if (vizinho !== territorio) {

          vizinho.setAttribute(
            "fill",
            vizinho.dataset.corOriginal
          );

        }

      });

      // limpa lista
      vizinhosValidos = [];

      // troca turno INFINITAMENTE
      jogadorAtual =
        jogadorAtual === "red"
          ? "blue"
          : "red";

      console.log(
        "Turno:",
        jogadorAtual
      );

    }

  });

});
  })
  .catch(error => {
    console.error("Erro ao carregar o mapa:", error);
    nomePais.textContent =
      "Erro ao carregar mapa";
  });

// Timer
iniciarTimer(display, 300);


