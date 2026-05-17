let intervaloTimer = null;

export function zerarTimer(display) {
  clearInterval(intervaloTimer);
  intervaloTimer = null;

  if (display) {
    display.textContent = "00:00";
  }
}

export function iniciarTimer(display, tempoInicial = 30, aoAcabar = null) {
  clearInterval(intervaloTimer);

  let tempoRestante = tempoInicial;

  function atualizarTimer() {
    const minutos = Math.floor(tempoRestante / 60);
    const segundos = tempoRestante % 60;

    display.textContent =
      `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;

    if (tempoRestante === 0) {
      clearInterval(intervaloTimer);
      intervaloTimer = null;

      if (aoAcabar) {
        aoAcabar();
      }

      return;
    }

    tempoRestante--;
  }

  atualizarTimer();
  intervaloTimer = setInterval(atualizarTimer, 1000);
}