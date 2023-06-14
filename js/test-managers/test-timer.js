function TestTimer() {

  var timeInSecs;
  var ticker;

  var updateTimer = (onTimerEnd) => {
    let secs = timeInSecs;
    if (secs > 0) {
      timeInSecs--;
    } else {
      clearInterval(ticker);
      onTimerEnd();
    }

    let mins = Math.floor(secs / 60);
    secs %= 60;

    $(".countdown .min").text(((mins < 10) ? "0" : "") + mins);
    $(".countdown .sec").text(((secs < 10) ? "0" : "") + secs);
  }

  //---------------------------------------

  function start(test, onTimerEnd) {
    let maxTime = test.length;

    timeInSecs = parseInt(maxTime * 60);
    updateTimer(onTimerEnd);
    ticker = setInterval(updateTimer, 1000);

    $(".countdown").addClass("show");
  }

  //---------------------------------------

  function end() {
    clearInterval(ticker);
    $(".countdown").removeClass("show");
  }

  return {
    start: start,
    end: end
  }
}
