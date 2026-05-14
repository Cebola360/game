export function EmbaralharPaisesIniciais(
  listaPaises,
  jogador1,
  jogador2,
  mapa
){

  // embaralha
  listaPaises.sort(() => Math.random() - 0.5);

  for(let i = 0; i < 3; i++){

    // jogador 1
    const pais1 = listaPaises.pop();
    jogador1.paises.push(pais1);

    const territorio1 = document.getElementById(pais1);
    if(territorio1){
      territorio1.setAttribute("fill", jogador1.cor);
    }

    // jogador 2
    const pais2 = listaPaises.pop();
    jogador2.paises.push(pais2);

    const territorio2 = document.getElementById(pais2);
    if(territorio2){
      territorio2.setAttribute("fill", jogador2.cor);
    }

  }

}