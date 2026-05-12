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

    territorios.forEach(territorio => {
      territorio.addEventListener("click", () => {
        mostrarVizinhos(
          territorio,
          fronteiras
        );
      });

      barraFeedbackPaisClicado(
        territorio,
        nomePais
      );

    });
  })
  .catch(error => {
    console.error("Erro ao carregar o mapa:", error);
    nomePais.textContent =
      "Erro ao carregar mapa";
  });

// T
iniciarTimer(display, 300);


