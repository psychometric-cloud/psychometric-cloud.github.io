function AuditComponent() {

  let test = [];
  let currItem = 0;
  let currPage = 1;

  //---------------------------------------------

  function openTagsDialog() {
    tagsDialog.open(test[currItem]);
  }
  //-------------------------------------

  function onLabelLearnMoreClicked() {
    labelsManager.toggleLabel(test[currItem], eQLabel.latter);
    $('.audit-panel .q-labels .learn').toggleClass("clicked");
  }

  //------------------------------------

  function onAnsBtnClick(type) {
    let qData = test[currItem];
    moreDlg.showAnswer(qData);
  }

  //-------------------------------------

  function onMoreClick(type) {
    let qData = test[currItem];
    moreDlg.showText(qData);
  }

  //-------------------------------------

  onBtnClick = (i) => {
    currItem = i;
    $(".audit-panel .btn-questions .btn .wrap").removeClass("active");
    $(`.audit-panel .btn-questions .btn[data-id="${i}"] .wrap`).addClass("active");
    showItem();
  }

  //-------------------------------------

  function showItem() {
    let qData = test[currItem];

    if (qData) {
      let title = srcBuilder.getTitle(qData);
      $(".audit-panel .main .col2 .title").text(title);

      let src = srcBuilder.imageUrl(qData, "questions");
      $(".audit-panel .main .col2 .img").attr('src', src);

      if (qData.aNum !== qData.proposedAnswer) {
        $(".audit-panel .ans-info").addClass("error");
        $(".audit-panel .ans-info").html(`The correct answer is <b>${qData.aNum}</b>. You marked <b>${qData.proposedAnswer}</b>`);
      } else {
        $(".audit-panel .ans-info").removeClass("error");
        $(".audit-panel .ans-info").html(`The correct answer is <b>${qData.aNum}</b>. Great work!`);
      }

      let showTags = qData.chapter.startsWith('math') && !qData.qAreas.includes('chart');
      $(".tags-btn").toggleClass("show", showTags);

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
        <div class="btn ${status}" data-id="${i}" onclick="onBtnClick(${i})">
         <div class="wrap ${active}">         
          ${i + 1}
         </div>  
        </div>`
    }
    $(".audit-panel .btn-questions").html(buttons);
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


  //--------------------------------------

  function reset() {
    currPage = 1;
    test = [];
    currItem = 0;

    $(".audit-panel .inner-wrapper").removeClass("left");
    $(".audit-panel .btn-questions").html("");
    $(".audit-panel").removeClass("show");
  }

  //-------------------------------------

  function slideQuestions(dir) {
    if (dir === 1) {
      if (currPage < (2 * Math.ceil(test.length / 20)) - 1) {
        currPage += 1;
        $(".audit-panel .questions-panel .inner-wrapper").css({ left: `-${(currPage - 1) * 50}%` });
      }
    } else {
      if (currPage > 1) {
        currPage -= 1;
        $(".audit-panel .questions-panel .inner-wrapper").css({ left: `-${(currPage - 1) * 50}%` });
      }
    }
  }

  //-------------------------------------

  function init() {
    $(".audit-panel .img-wrap img").click(() => {
      onAnsBtnClick();
    });
    $(".audit-panel .icon-txt").click(() => {
      onMoreClick();
    });
    $('.audit-panel .tags-btn').click((e) => {
      openTagsDialog();
    });
    $('.audit-panel .q-labels .learn').click((e) => {
      onLabelLearnMoreClicked();
    });
    $(".audit-panel .questions-panel .prev").click((e) => {
      slideQuestions(0);
    });
    $(".audit-panel .questions-panel .next").click((e) => {
      slideQuestions(1);
    });
  }

  init();

  return {
    show: show,
    reset: reset
  }
}
