import { limparVizinhosMarcados} from "./limpar_vizinhos_marcados";
import { adicionarTerritorioAoJogador, removerTerritorioDeTodos } from "./remover_e_adicionar_territorio";
import { atualizarListaJogadores } from "./atualizar_lista_jogadores";
import { trocarJogador } from "./trocar_jogador";

export function conquistarTerritorio(territorio, estado) {
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