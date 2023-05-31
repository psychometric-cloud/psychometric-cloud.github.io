function PracticeComponent() {

  questionsArr = [];
  currQuestion = 0;

  function getPublisher(qData) {
    return qData.publisher.substring(0, qData.publisher.length - 1).toUpperCase();
  }

  //-------------------------------------

  function getSubject(qData) {
    return qData.chapter.substring(0, qData.chapter.length - 1).toLowerCase();
  }

  //-------------------------------------

  function getName(qData) {
    return `${qData.chapter.slice(-1)}_${qData.qNum}`;
  }

  //-------------------------------------

  function getSeason(qData) {

    if (qData.season === "winter") {
      return sSeasons.w;
    }
    if (qData.season === "summer") {
      return sSeasons.su;
    }
    if (qData.season === "spring") {
      return sSeasons.sp;
    }
    if (qData.season === "autumn") {
      return sSeasons.a;
    }
  }

  //-------------------------------------

  function setTitle() {

    qData = questionsArr[currQuestion];

    if (qData) {
      let title = `${getPublisher(qData).toLowerCase()} ${qData.year} ${qData.season} ${getName(qData)}`;
      $(".practice-panel .main .col2 .title").text(title);
    }
  }

  //-------------------------------------

  function setQuestionImg() {

    qData = questionsArr[currQuestion];

    if (qData) {
      let src = `./assets/questions/${getPublisher(qData)}/${qData.year}/${getSeason(qData)}/${presentationMode}/${getSubject(qData)}/${getName(qData)}.png`;
      $(".practice-panel .main .col2 img").attr('src', src);
    }
  }

  //-------------------------------------

  function showQuestion() {
    setTitle();
    setQuestionImg();
  }

  //------------------------------------

  function onNextPrevClick(step) {
    currQuestion += step;

    updateButtonsStatus();
    showQuestion();
  }

  //------------------------------------

  function onAnswerClick() {

  }

  //------------------------------------

  function updateButtonsStatus() {

    $(".practice-panel .btn-prev").toggleClass("disabled", currQuestion === 0)
    $(".practice-panel .btn-next").toggleClass("disabled", currQuestion === questionsArr.length - 1);
  }

  //-------------------------------------

  function show(_filteredData) {
    currQuestion = 0;
    questionsArr = _filteredData;

    updateButtonsStatus();
    showQuestion();

    $(".practice-panel").addClass("show");
  }

  //-------------------------------------

  function init() {
    $(".practice-panel .btn-prev").click(() => {
      onNextPrevClick(-1);
    });
    $(".practice-panel .btn-next").click(() => {
      onNextPrevClick(1);
    })
    $(".practice-panel .btn-answer").click(() => {
      onAnswerClick();
    })
  }

  init();

  return {
    show: show
  }
}
