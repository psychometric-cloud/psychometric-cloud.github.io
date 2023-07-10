function TestComponent() {

  let test = [];
  let currItem = 0;
  let currSubject;

  //---------------------------------------------

  function onLabelStarClicked() {
    labelsManager.toggleLabel(test[currItem], eQLabel.star);
    $('.test-panel .q-labels .star').toggleClass("clicked");
  }

  //-------------------------------------

  function onLabelLearnMoreClicked() {
    labelsManager.toggleLabel(test[currItem], eQLabel.latter);
    $('.test-panel .q-labels .learn').toggleClass("clicked");
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

  //-------------------------------------

  function showItem() {
    let qData = test[currItem];

    resetPanels();

    if (qData.isStandalone) {
      setMainPanel(qData);
    } else {
      setReadingBoxPanel(qData);
    }
  }

  //------------------------------------

  function resetPanels() {
    $(".test-panel .main, .test-panel .reading-box").removeClass("show");
    $(".test-panel .main .question, .test-panel .reading-box .question").addClass("show");
    $(".test-panel .main .answer, .test-panel .reading-box .answer").removeClass("show");
  }

  //------------------------------------

  function setMainPanel(qData) {
    $(".test-panel .main").addClass("show");

    let title = srcBuilder.getTitle(qData);
    $(".test-panel .main .col2 .title").text(title);

    let q_src = srcBuilder.build(qData, "questions");
    $(".test-panel .main .question").attr('src', q_src);

    let a_src = srcBuilder.build(qData, "answers");
    $(".test-panel .main .answer").attr('src', a_src);

    $('.test-panel .q-labels .star').toggleClass("clicked", qData.labels.includes("star"));
    $('.test-panel .q-labels .learn').toggleClass("clicked", qData.labels.includes("learn"));
  }

  //------------------------------------

  function setReadingBoxPanel(qData) {
    $(".test-panel .reading-box").addClass("show");

    let title = srcBuilder.getTitle(qData);
    $(".test-panel .reading-box .left .title").text(title);

    let q_src = srcBuilder.build(qData, "questions");
    $(".test-panel .reading-box .left .question").attr('src', q_src);

    let a_src = srcBuilder.build(qData, "answers");
    $(".test-panel .reading-box .left .answer").attr('src', a_src);

    let t_src = srcBuilder.build(qData, "questions", true);
    $(".test-panel .reading-box .right .text").attr('src', t_src);

    let isEnglish = (qData.chapter === "en1" || qData.chapter === "en2");
    $(".test-panel .reading-box").toggleClass("en", isEnglish);

    setTimeout(() => {
      $(".test-panel .text-wrap").css("max-height", $(".test-panel .right").height());
    })
  }

  //------------------------------------------

  function show(filteredData, subject) {

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
    $(".test-panel .footer .answers .answer").click((e) => {
      onAnswerClick(e);
    });
    $('.test-panel .q-labels .star').click((e) => {
      onLabelStarClicked();
    });
    $('.test-panel .q-labels .learn').click((e) => {
      onLabelLearnMoreClicked();
    });
  }

  init();

  return {
    show: show
  }
}
