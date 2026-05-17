import { mostrarVizinhos } from "./mostrar_vizinhos.js";

function limparVizinhosMarcados(estado, territorioConquistado = null) {
  estado.vizinhosValidos.forEach(vizinho => {
    if (vizinho !== territorioConquistado && vizinho.dataset.corOriginal) {
      vizinho.setAttribute("fill", vizinho.dataset.corOriginal);
    }

    delete vizinho.dataset.corOriginal;
  });

  estado.vizinhosValidos = [];
  estado.territorioSelecionado = null;
}

function atualizarJogadorAtivo(estado) {
  const boxJogador1 = document.getElementById("jogador-vermelho");
  const boxJogador2 = document.getElementById("jogador-azul");

  if (!boxJogador1 || !boxJogador2) {
    return;
  }

  boxJogador1.classList.remove("ativo");
  boxJogador2.classList.remove("ativo");

  if (estado.jogadorAtual === estado.jogadores[0]) {
    boxJogador1.classList.add("ativo");
  } else {
    boxJogador2.classList.add("ativo");
  }
}

function atualizarListaJogadores(estado) {
  const listaJogador1 = document.getElementById("lista-jogador1");
  const listaJogador2 = document.getElementById("lista-jogador2");

  const qtdJogador1 = document.getElementById("qtd-jogador1");
  const qtdJogador2 = document.getElementById("qtd-jogador2");

  const jogador1 = estado.jogadores[0];
  const jogador2 = estado.jogadores[1];

  if (qtdJogador1) {
    qtdJogador1.textContent = jogador1.paises.length;
  }

  if (qtdJogador2) {
    qtdJogador2.textContent = jogador2.paises.length;
  }

  if (listaJogador1) {
    listaJogador1.innerHTML = "";

    jogador1.paises.forEach(pais => {
      const item = document.createElement("li");
      item.textContent = pais;
      listaJogador1.appendChild(item);
    });
  }

  if (listaJogador2) {
    listaJogador2.innerHTML = "";

    jogador2.paises.forEach(pais => {
      const item = document.createElement("li");
      item.textContent = pais;
      listaJogador2.appendChild(item);
    });
  }
}

function removerTerritorioDeTodos(nomeTerritorio, jogadores) {
  jogadores.forEach(jogador => {
    jogador.paises = jogador.paises.filter(pais => pais !== nomeTerritorio);
  });
}

function adicionarTerritorioAoJogador(nomeTerritorio, jogador) {
  if (!jogador.paises.includes(nomeTerritorio)) {
    jogador.paises.push(nomeTerritorio);
  }
}

function trocarJogador(estado) {
  const jogador1 = estado.jogadores[0];
  const jogador2 = estado.jogadores[1];

  if (estado.jogadorAtual === jogador1) {
    estado.jogadorAtual = jogador2;
  } else {
    estado.jogadorAtual = jogador1;
  }

  atualizarJogadorAtivo(estado);

  if (estado.statusJogo) {
    estado.statusJogo.textContent = `Vez de ${estado.jogadorAtual.nome}`;
  }

  if (estado.reiniciarTimer) {
    estado.reiniciarTimer();
  }
}

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

  // Segundo clique: se clicou em um vizinho válido, conquista direto
  if (estado.vizinhosValidos.includes(territorio)) {
    conquistarTerritorio(territorio, estado);
    return;
  }

  if (estado.statusJogo) {
    estado.statusJogo.textContent =
      "Selecione primeiro um território seu e depois um vizinho válido";
  }
}