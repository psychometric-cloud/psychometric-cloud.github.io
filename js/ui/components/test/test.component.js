function TestComponent() {

  let test = [];
  let currItem = 0;
  let currSubject;

  //---------------------------------------------

  function openTagsDialog() {
    tagsDialog.open(test[currItem]);
  }

  //-------------------------------------------------

  function onAnswerClick(e) {

    if (currItem < test.length) {
      let qData = test[currItem];
      let num = parseInt($(e.target).data("num"));
      qData.proposedAnswer = num;
      $(`.header .btn-questions .btn[data-id="${currItem}"]`).addClass("clicked");

      if ($(".header .btn-questions .btn.clicked").length === test.length) {
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

    let stat = reviewTest(test);
    testHistory.add(test, currSubject, stat);

    $(".header .questions-panel").removeClass("show");
    $(".header .btn-check-test").removeClass("show");

    reportComponent.show(test, stat);
  }

  //-------------------------------------

  function slideQuestions(dir) {
    if (dir === 0) {
      $(".header .questions-panel .inner-wrapper").removeClass("right").addClass("left");
    } else {
      $(".header .questions-panel .inner-wrapper").removeClass("left").addClass("right");
    }
  }

  //-------------------------------------

  function reviewTest(test) {
    let correct = 0;

    for (let i = 0; i < test.length; i++) {
      if (test[i].aNum === test[i].proposedAnswer) {
        correct += 1;
      } else {
        setFailLabel(test[i]);
      }
    }
    return {
      correct: correct,
      total: test.length,
      percentage: parseInt((correct / test.length) * 100)
    };
  }

  //-------------------------------------

  function setFailLabel(question) {
    if (question.chapter.startsWith('math') && !question.qAreas.includes('chart')) {
      let q = getQuestion(question);

      if (q && !q.labels.includes("failed")) {
        q.labels.push("failed");
        labelsManager.storeQuestion(q);
      }
    }
  }

  //-------------------------------------

  function getQuestion(question) {
    for (var i = 0; i < qBank.length; i++) {

      if (qBank[i].publisher === question.publisher &&
        qBank[i].year === question.year &&
        qBank[i].season === question.season &&
        qBank[i].chapter === question.chapter &&
        qBank[i].qNum === question.qNum) {

        return qBank[i];
      }
    }

    console.log("getQuestion:failed:" + question);
    return null;
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

    $(`.header .btn-questions .btn[data-id="${currItem}"]`).addClass("active");
  }

  //------------------------------------

  function resetPanels() {
    $(".header .btn-questions  .btn").removeClass("active");
    $(".test-panel .main, .test-panel .reading-box").removeClass("show");
    $(".test-panel .main .question, .test-panel .reading-box .question").addClass("show");
    $(".test-panel .main .answer, .test-panel .reading-box .answer").removeClass("show");
  }

  //------------------------------------

  function setMainPanel(qData) {
    $(".test-panel .main").addClass("show");

    let title = srcBuilder.getTitle(qData);
    $(".test-panel .main .col2 .title").text(title);

    let q_src = srcBuilder.imageUrl(qData, "questions");
    $(".test-panel .main .question").attr('src', q_src);

    let a_src = srcBuilder.imageUrl(qData, "answers");
    $(".test-panel .main .answer").attr('src', a_src);

    let showTags = qData.chapter.startsWith('math') && !qData.qAreas.includes('chart');
    $(".tags-btn").toggleClass("show", showTags);
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

  function show(filterBy) {

    currItem = 0;
    currSubject = filterBy.selectedSubject;

    testDataBuilder.build(filterBy, (_test) => {

      test = _test;
      let maxTime = test.length - 7;//currSubject === eSubjects.math ? test.length - 3 : test.length;

      testTimer.start(test, () => {
        endTest();
      }, maxTime)

      showItem();
      buildQuestionsButtons();

      $(".header .center").addClass("show");
      $(".test-panel").addClass("show");
    });
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
    $(".header .btn-questions").html(buttons);
    $(`.header .btn-questions .btn[data-id="0"]`).addClass("active");
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
    $('.test-panel .tags-btn').click((e) => {
      openTagsDialog();
    });
    $(".header .btn-check-test").unbind("click").click((e) => {
      endTest();
    });
    $(".header .questions-panel .prev").click((e) => {
      slideQuestions(0);
    });
    $(".header .questions-panel .next").click((e) => {
      slideQuestions(1);
    });
  }

  init();

  return {
    show: show
  }
}
