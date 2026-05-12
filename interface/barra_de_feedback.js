export function barraFeedbackPaisClicado(
  territorio,
  nomePais
){

  territorio.addEventListener("mouseenter", () => {

    nomePais.textContent =
      territorio.id || "desconhecido";

  });

  territorio.addEventListener("mouseleave", () => {

    nomePais.textContent =
      "Passe o mouse em um território";

  });

}