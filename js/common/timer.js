function Timer() {

  const timerWrap = $(".timer-wrap");

  let timeInterval;
  let totalSeconds = 0;

  //---------------------------------------

  function setTime() {
    ++totalSeconds;
    timerWrap.html(`${pad(parseInt(totalSeconds / 60))}:${pad(totalSeconds % 60)}`);
  }

  //---------------------------------------

  function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
  }

  //---------------------------------------

  function start() {
    totalSeconds = 0;
    timerWrap.html("00:00");

    if (timeInterval) {
      clearInterval(timeInterval);
    }

    timeInterval = setInterval(setTime, 1000);
  }

  return {
    start: start
  }
}
