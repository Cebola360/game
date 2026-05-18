

export function mostrarPergunta(
  pergunta,
  alternativas,
  respostaCorreta,
  aoResponder
) {

  const overlay =
    document.createElement("div");

  overlay.style.position = "fixed";
  overlay.style.inset = "0";
  overlay.style.background =
    "rgba(0,0,0,0.7)";
  overlay.style.display = "flex";
  overlay.style.justifyContent =
    "center";
  overlay.style.alignItems =
    "center";
    overlay.style.zIndex = "99999";
  const janela =
    document.createElement("div");

  janela.style.background = "white";
  janela.style.padding = "30px";
  janela.style.borderRadius = "15px";
  janela.style.display = "flex";
  janela.style.flexDirection =
    "column";
  janela.style.gap = "10px";

  const titulo =
    document.createElement("h2");

  titulo.textContent = pergunta;

  janela.appendChild(titulo);

  alternativas.forEach(alternativa => {

    const botao =
      document.createElement("button");

    botao.textContent =
      alternativa;

    botao.addEventListener(
      "click",
      () => {

        const acertou =
          alternativa === respostaCorreta;

        document.body.removeChild(
          overlay
        );

        aoResponder(acertou);

      }
    );

    janela.appendChild(botao);

  });

  overlay.appendChild(janela);

  document.body.appendChild(
    overlay
  );

}