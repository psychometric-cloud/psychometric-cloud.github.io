function HistoryDialog() {

  function show(item) {

  }

  function init() {
    $(".history-dlg-wrap .popper").click(() => {
      $(".history-dlg-wrap").removeClass("active")
    });
  }

  init();

  return {
    show: show
  }
}
