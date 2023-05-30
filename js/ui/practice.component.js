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
      return sSeasons.winter;
    }
    if (qData.season === "summer") {
      return sSeasons.summer;
    }
    if (qData.season === "spring") {
      return sSeasons.spring;
    }
    if (qData.season === "autumn") {
      return sSeasons.autumn;
    }
  }

  //-------------------------------------

  function setTitle() {

    qData = questionsArr[currQuestion];

    if (qData) {
      let title = `${getPublisher(qData)}-${qData.year}-${getSeason(qData)}-${qData.chapter}-${qData.qNum}`;
      $(".practice-panel .main .col2 .title").text(title);
    }
  }

  //-------------------------------------

  function setQuestionImg() {

    qData = questionsArr[currQuestion];

    if (qData) {
      let src = `./assets/questions/${getPublisher(qData)}/${qData.year}/${getSeason(qData)}/questions/${getSubject(qData)}/${getName(qData)}.png`;
      $(".practice-panel .main .col2 img").attr('src', src);
    }
  }

  //-------------------------------------

  function showQuestion() {
    setTitle();
    setQuestionImg();
  }

  //-------------------------------------

  function show(_filteredData) {
    currQuestion = 0;
    questionsArr = _filteredData;

    showQuestion();
    $(".practice-panel").addClass("show");
  }

  return {
    show: show
  }
}
