export function removerTerritorioDeTodos(nomeTerritorio, jogadores) {
  jogadores.forEach(jogador => {
    jogador.paises = jogador.paises.filter(pais => pais !== nomeTerritorio);
  });
}

export function adicionarTerritorioAoJogador(nomeTerritorio, jogador) {
  if (!jogador.paises.includes(nomeTerritorio)) {
    jogador.paises.push(nomeTerritorio);
  }
}