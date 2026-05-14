// Mostrando países que fazem fronteira com o país clicado

export function mostrarVizinhos(
  territorio,
  fronteiras
){

  const paisClicado = territorio.id;

  const nomesVizinhos = fronteiras[paisClicado];

  const listaVizinhos = [];

  if(nomesVizinhos){

    nomesVizinhos.forEach(nomeVizinho => {

      const vizinho = document.getElementById(nomeVizinho);

      if(vizinho){

        listaVizinhos.push(vizinho);

      }

    });

  }

  return listaVizinhos;

}