function AuditComponent() {

  let test = [];
  let currItem = 0;


  //------------------------------------

  function onAnsBtnClick(type) {
    let qData = test[currItem];
    moreDlg.showAnswer(qData);
  }

  //-------------------------------------

  function onMoreClick(type) {
    let qData = test[currItem];
    moreDlg.show(qData);
  }

  //-------------------------------------

  onBtnClick = (i) => {
    currItem = i;
    $(".audit-panel .questions .btn").removeClass("active");
    $(`.audit-panel .questions .btn[data-id="${i}"]`).addClass("active");
    showItem();
  }

  //-------------------------------------

  function showItem() {
    let qData = test[currItem];

    if (qData) {
      let title = srcBuilder.getTitle(qData);
      $(".audit-panel .main .col2 .title").text(title);

      debugger;
      let src = srcBuilder.build(qData, "questions");
      $(".audit-panel .main .col2 .img").attr('src', src);

      if (qData.aNum !== qData.proposedAnswer) {
        $(".audit-panel .ans-info").addClass("error");
        $(".audit-panel .ans-info").html(`The correct answer is <b>${qData.aNum}</b>. You marked <b>${qData.proposedAnswer}</b>`);
      } else {
        $(".audit-panel .ans-info").removeClass("error");
        $(".audit-panel .ans-info").html(`The correct answer is <b>${qData.aNum}</b>. Great work!`);
      }

      $(".audit-panel .icon-txt").toggleClass('show', (qData.qAreas[0] === "chart" || qData.qAreas[0] === "reading"));
    }
  }

  //-------------------------------------

  function getQuestionStatus(i) {

    if (!test[i].proposedAnswer) {
      return eQuestionStatus.unAnswered;
    }
    else if (test[i].aNum === test[i].proposedAnswer) {
      return eQuestionStatus.correct;
    }
    return eQuestionStatus.error;
  }

  //-------------------------------------

  function buildButtons() {
    let buttons = ``;

    for (let i = 0; i < test.length; i++) {
      let status = getQuestionStatus(i);
      let active = i === 0 ? "active" : "";

      buttons += `
        <div class="btn ${status} ${active}" data-id="${i}" onclick="onBtnClick(${i})">
          ${i + 1}
        </div>`
    }
    $(".audit-panel .questions").html(buttons);
  }

  //-------------------------------------

  function show(_test) {
    currItem = 0;
    test = _test;

    showItem();
    buildButtons();

    $(".start-panel").removeClass("show");
    $(".audit-panel").addClass("show");
  }

  //-------------------------------------

  function init() {
    $(".audit-panel .img-wrap img").click(() => {
      onAnsBtnClick();
    });
    $(".audit-panel .icon-txt").click(() => {
      onMoreClick();
    });
  }

  init();

  return {
    show: show
  }
}
