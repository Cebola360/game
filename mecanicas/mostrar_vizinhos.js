export function mostrarVizinhos(
  territorio,
  fronteiras
){

  const paisClicado = territorio.id;

  const vizinhos = fronteiras[paisClicado];

  if(vizinhos){

    vizinhos.forEach(nomeVizinho => {

      const vizinho = document.getElementById(nomeVizinho);

      if(vizinho){

        vizinho.setAttribute("fill", "#ffc0cb");

      }

    });

  }

}