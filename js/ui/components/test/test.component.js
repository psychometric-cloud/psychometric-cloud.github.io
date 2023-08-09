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
      $(`.header .test-questions .btn[data-id="${currItem}"]`).addClass("clicked");

      if ($(".header .test-questions .btn.clicked").length === test.length) {
        $(".header .btn-check-test").addClass("show");
      }
      if (currItem < test.length - 1) {
        currItem += 1;
      }
      showItem();
    }
  }

  //-------------------------------------------------

  function endTest() {
    testTimer.end();

    let stat = testStat.getStat(test);
    testHistory.add(test, currSubject, stat);

    $(".test-questions").removeClass("show");
    $(".btn-check-test").removeClass("show");

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

    $(`.header .test-questions .btn[data-id="${currItem}"]`).addClass("active");
  }

  //------------------------------------

  function resetPanels() {
    $(".header .test-questions  .btn").removeClass("active");
    $(".test-panel .main, .test-panel .reading-box").removeClass("show");
    $(".test-panel .main .question, .test-panel .reading-box .question").addClass("show");
    $(".test-panel .main .answer, .test-panel .reading-box .answer").removeClass("show");
  }

  //------------------------------------

  function setMainPanel(qData) {
    $(".test-panel .main").addClass("show");

    let title = srcBuilder.getTitle(qData);
    $(".test-panel .main .col2 .title").text(title);

    let q_src = src(qData, "questions");
    $(".test-panel .main .question").attr('src', q_src);

    let a_src = srcBuilder.imageUrl(qData, "answers");
    $(".test-panel .main .answer").attr('src', a_src);

    $('.test-panel .q-labels .star').toggleClass("clicked", qData.labels.includes("star"));
    $('.test-panel .q-labels .learn').toggleClass("clicked", qData.labels.includes("learn"));
  }

  //------------------------------------

  function setReadingBoxPanel(qData) {
    $(".test-panel .reading-box").addClass("show");

    let title = srcBuilder.getTitle(qData);
    $(".test-panel .reading-box .left .title").text(title);

    let q_src = srcBuilder.imageUrl(qData, "questions");
    $(".test-panel .reading-box .left .question").attr('src', q_src);

    let a_src = srcBuilder.imageUrl(qData, "answers");
    $(".test-panel .reading-box .left .answer").attr('src', a_src);

    let t_src = srcBuilder.textUrl(qData);
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
    buildQuestionsButtons();

    $(".test-questions").addClass("show");
    $(".test-panel").addClass("show");
  }

  //-------------------------------------

  function buildQuestionsButtons() {
    let buttons = ``;

    for (let i = 0; i < test.length; i++) {
      buttons += `
        <div class="btn" data-id="${i}" onclick="onTestQuestionClick(${i})">        
          ${i + 1}
        </div>`
    }
    $(".header .test-questions").html(buttons);
    $(`.header .test-questions .btn[data-id="0"]`).addClass("active");
  }

  //---------------------------------------

  onTestQuestionClick = (i) => {
    currItem = i;
    showItem();
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
    $(".header .btn-check-test").unbind("click").click((e) => {
      endTest();
    })
  }

  init();

  return {
    show: show
  }
}
