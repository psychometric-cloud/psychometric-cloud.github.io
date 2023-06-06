function TestTimer() {

  var timeInSecs;
  var ticker;

  function startTimer(secs, onTimerEnd) {
    timeInSecs = parseInt(secs);
    ticker = setInterval(() => {
      let secs = timeInSecs;
      if (secs > 0) {
        timeInSecs--;
      } else {
        clearInterval(ticker);
        onTimerEnd();
      }

      let mins = Math.floor(secs / 60);
      secs %= 60;
      let pretty = ((mins < 10) ? "0" : "") + mins + ":" + ((secs < 10) ? "0" : "") + secs;

      $(".countdown").text(pretty);
    }, 1000);
  }

  //---------------------------------------

  function start(test, onTimerEnd) {
    let maxTime = test.length;
    startTimer(maxTime * 60, onTimerEnd);
  }

  //---------------------------------------

  function end() {
    clearInterval(ticker);
    $(".countdown").text("");
  }

  return {
    start: start,
    end: end
  }
}
