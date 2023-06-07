function HistoryDialog() {

  let latest = [];

  onHistoryItemClick = (date) => {
    $(".history-dlg-wrap").removeClass("active");

    for (let i = 0; i < math.min(latest.length, 8); i++) {
      if (latest[i].date === date) {
        auditComponent.show(latest[i].test);
        break;
      }
    }
  }

  //-------------------------------------

  function show() {
    let content = "";

    $(".history-dlg-wrap").addClass("active");
    latest = testHistory.getLatest();

    latest.forEach((item) => {
      content += `
         <div class="history-item" onClick="onHistoryItemClick(${item.date})">
          <div class="date">${dayjs(new Date(item.date)).format("MMMM D, YYYY h:mm A")}</div>
          <div class="percentage">${item.stat.percentage}%</div>
          <div class="subject">${item.subject}</div>
         </div>`
    });

    $(".history-dlg-wrap .inner-wrap").html(content);
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
