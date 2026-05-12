export function iniciarTimer(display, tempoInicial = 300) {

  let tempoRestante = tempoInicial;

  function atualizarTimer() {

    let minutos = Math.floor(tempoRestante / 60);
    let segundos = tempoRestante % 60;

    minutos = minutos.toString().padStart(2, "0");
    segundos = segundos.toString().padStart(2, "0");

    display.textContent = `${minutos}:${segundos}`;

    if (tempoRestante > 0) {
      tempoRestante--;
    } else {
      clearInterval(timer);
      alert("Tempo esgotado!");
    }

  }

  atualizarTimer();

  const timer = setInterval(atualizarTimer, 1000);

}