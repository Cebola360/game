import { jogador1, jogador2 } from "../entidades/jogadores.js";

export const estadoJogo = {
  jogadorDaVez: jogador1,
  territorioSelecionado: null
};

export function obterJogadorDaVez() {
  return estadoJogo.jogadorDaVez;
}

export function trocarTurno() {
  estadoJogo.jogadorDaVez =
    estadoJogo.jogadorDaVez.id === jogador1.id ? jogador2 : jogador1;

  estadoJogo.territorioSelecionado = null;
  return estadoJogo.jogadorDaVez;
}

export function territorioPertenceAoJogador(territorio, jogador) {
  return territorio.dataset.dono === jogador.id;
}

export function territorioEhCapturavel(territorio, jogador, fronteiras) {
  const idTerritorio = territorio.id;

  if (territorio.dataset.dono === jogador.id) {
    return false;
  }

  return jogador.paises.some((paisDoJogador) => {
    const vizinhos = fronteiras[paisDoJogador] || [];
    return vizinhos.includes(idTerritorio);
  });
}

export function capturarTerritorio(territorio, jogador1, jogador2, jogadorDaVez) {
  const donoAnterior = territorio.dataset.dono;
  const idTerritorio = territorio.id;

  if (donoAnterior === jogador1.id) {
    jogador1.paises = jogador1.paises.filter((pais) => pais !== idTerritorio);
  }

  if (donoAnterior === jogador2.id) {
    jogador2.paises = jogador2.paises.filter((pais) => pais !== idTerritorio);
  }

  if (!jogadorDaVez.paises.includes(idTerritorio)) {
    jogadorDaVez.paises.push(idTerritorio);
  }

  territorio.dataset.dono = jogadorDaVez.id;
  territorio.setAttribute("fill", jogadorDaVez.cor);

  estadoJogo.territorioSelecionado = idTerritorio;
}

export function processarCliqueTerritorio(
  territorio,
  fronteiras,
  jogador1,
  jogador2
) {
  const jogadorDaVez = obterJogadorDaVez();

  if (territorioPertenceAoJogador(territorio, jogadorDaVez)) {
    return {
      ok: false,
      motivo: "Esse território já é seu."
    };
  }

  if (!territorioEhCapturavel(territorio, jogadorDaVez, fronteiras)) {
    return {
      ok: false,
      motivo: "Esse território não faz fronteira com um território seu."
    };
  }

  capturarTerritorio(territorio, jogador1, jogador2, jogadorDaVez);

  const proximoJogador = trocarTurno();

  return {
    ok: true,
    motivo: `${territorio.id} capturado por ${jogadorDaVez.nome}.`,
    proximoJogador
  };
}