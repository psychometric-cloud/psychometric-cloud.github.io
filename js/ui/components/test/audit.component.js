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
    showItem();
  }

  //-------------------------------------

  function showItem() {
    let qData = test[currItem];

    if (qData) {
      let title = srcBuilder.getTitle(qData);
      $(".audit-panel .main .col2 .title").text(title);

      let src = srcBuilder.build(qData, "questions");
      $(".audit-panel .main .col2 .img").attr('src', src);

      if (qData.aNum !== qData.proposedAnswer) {
        $(".audit-panel .ans-info").addClass("error");
        $(".audit-panel .ans-info").html(`The correct answer is <b>${qData.aNum}</b>. You marked <b>${qData.proposedAnswer}</b>`);
      } else {
        $(".audit-panel .ans-info").removeClass("error");
        $(".audit-panel .ans-info").html(`The correct answer is <b>${qData.aNum}</b>.`);
      }

      $(".audit-panel .main .col2 .icon-chart").toggleClass('show', qData.qAreas[0] === "chart");
      $(".audit-panel .main .col2 .icon-txt").toggleClass('show', qData.qAreas[0] === "reading" && (qData.qAreas[1] !== "text2"));
      $(".audit-panel .main .col2 .icon-txt2").toggleClass('show', qData.qAreas[0] === "reading" && qData.qAreas[1] === "text2");
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
      buttons += `
        <div class="btn ${status}" data-id="${i}" onclick="onBtnClick(${i})">
          ${i + 1}
        </div>`
    }
    $(".audit-panel .footer").html(buttons);
  }

  //-------------------------------------

  function show(_test) {
    currItem = 0;
    test = _test;

    showItem();
    buildButtons();

    $(".audit-panel").addClass("show");
  }

  //-------------------------------------

  function init() {
    $(".audit-panel .img-wrap img").click(() => {
      onAnsBtnClick();
    });
    $(".audit-panel .icon-chart, .practice-panel .icon-txt, .practice-panel .icon-txt2").click(() => {
      onMoreClick();
    });
  }

  init();

  return {
    show: show
  }
}
