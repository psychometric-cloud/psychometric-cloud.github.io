function TestComponent() {

  let test = [];
  let currItem = 0;
  let currSubject;

  //-------------------------------------

  function onMoreClick(type) {
    let qData = test[currItem];
    moreDlg.showText(qData);
  }

  //-------------------------------------------------

  function onAnswerClick(e) {

    if (currItem < test.length) {
      let qData = test[currItem];
      let num = parseInt($(e.target).data("num"));
      qData.proposedAnswer = num;

      currItem += 1;
      if (currItem === test.length) {
        endTest();
      } else {
        showItem();
      }
    }
  }

  //-------------------------------------------------

  function endTest() {
    testTimer.end();
    let stat = testStat.getStat(test);
    testHistory.add(test, currSubject, stat);

    let h = testHistory.get(currSubject);
    console.log("len" + h.length);

    reportComponent.show(test, stat);
  }

  //-------------------------------------------------

  function showItem() {
    let qData = test[currItem];

    if (qData) {
      let title = srcBuilder.getTitle(qData);
      $(".test-panel .main .col2 .title").text(title);

      let src = srcBuilder.build(qData, "questions");
      $(".test-panel .main .col2 .img").attr('src', src);

      $(".test-panel .q-info").html(`${currItem + 1}/${test.length}`)
      $(".test-panel .main .title-wrap").toggleClass('chart', qData.qAreas[0] === "chart");
      $(".test-panel .main .title-wrap").toggleClass('reading', qData.qAreas[0] === "reading");
    }
  }

  //------------------------------------------

  function show(subject, filteredData) {

    currItem = 0;
    currSubject = subject;

    test = testDataBuilder.build(subject, filteredData);
    console.log(test);

    testTimer.start(test, () => {
      endTest();
    })

    showItem();
    $(".test-panel").addClass("show");
  }

  //-------------------------------------

  function init() {
    $(".test-panel .answers .answer").click((e) => {
      onAnswerClick(e);
    });
    $(".test-panel .main").click(() => {
      onMoreClick();
    });
  }

  init();

  return {
    show: show
  }
}
