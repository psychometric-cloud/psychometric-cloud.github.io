function PracticeComponent() {

  questionsArr = [];
  currQuestion = 0;

  function extract(name, letter) {
    name = name.substring(0, str.length - 1);

    if (letter === 1) {
      name = name.toUpperCase();
    }
    else if (letter === 2) {
      name = name.toLowerCase();
    }
    return name;
  }


  //-------------------------------------

  function setQuestionImg() {

    qData = questionsArr[currQuestion];
    if (qData) {
      let publisher = qData.publisher.substring(0, qData.publisher.length - 1).toUpperCase();
      let subject = qData.chapter.substring(0, qData.chapter.length - 1).toLowerCase();
      let qName = `${qData.chapter.slice(-1)}_${qData.qNum}`;
      let src = `./assets/questions/${publisher}/${qData.year}/${qData.season}/questions/${subject}/${qName}.png`;

      debugger;
      $(".practice-panel .main .col2 img").attr('src', src);
    }
  }

  //-------------------------------------

  function showQuestion() {
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
