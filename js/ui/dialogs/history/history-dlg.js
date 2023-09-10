function HistoryDialog() {

  let latest = [];


  //-------------------------------------

  onHistoryItemClick = (date) => {
    $(".history-dlg-wrap").removeClass("active");

    for (let i = 0; i < latest.length; i++) {
      if (latest[i].date === date) {
        setLabels(latest[i].test);
        auditComponent.show(latest[i].test);
        break;
      }
    }
  }

  //-------------------------------------

  const setLabels = (storedQuestions) => {

    for (let i = 0; i < storedQuestions.length; i++) {
      let q = storedQuestions[i];
      for (let j = 0; j < qBank.length; j++) {
        let q1 = qBank[j];
        if (q1.publisher === q.publisher && q1.year === q.year && q.season === q1.season && q1.chapter === q.chapter && q1.qNum === q.qNum) {
          q.labels = q1.labels || [];
          q.qAreas = q1.qAreas || [];
        }
      }
    }
  }

  //-------------------------------------

  function show() {
    let content = "";

    $(".history-dlg-wrap").addClass("active");
    latest = testHistory.getLatest();

    for (let i = 0; i < latest.length; i++) {
      let item = latest[i];
      content += `
         <div class="history-item" onClick="onHistoryItemClick(${item.date})">
          <div class="date">${dayjs(new Date(item.date)).format("MMMM D, YYYY h:mm A")}</div>
          <div class="percentage">${item.stat.percentage}%</div>
          <div class="subject">${item.subject}</div>
         </div>`
    };

    $(".history-dlg-wrap .inner-wrap").html(content);
  }

  function init() {
    $(".history-dlg-wrap .popper").click(() => {
      $(".history-dlg-wrap").removeClass("active");
    });
  }

  init();

  return {
    show: show
  }
}
