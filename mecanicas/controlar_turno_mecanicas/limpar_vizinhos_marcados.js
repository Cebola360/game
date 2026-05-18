export function limparVizinhosMarcados(estado, territorioConquistado = null) {
  estado.vizinhosValidos.forEach(vizinho => {
    if (vizinho !== territorioConquistado && vizinho.dataset.corOriginal) {
      vizinho.setAttribute("fill", vizinho.dataset.corOriginal);
    }

    delete vizinho.dataset.corOriginal;
  });

  estado.vizinhosValidos = [];
  estado.territorioSelecionado = null;
}