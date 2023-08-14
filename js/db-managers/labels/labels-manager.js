function LabelsManager() {

  let labeledQuestions = [];

  function isQuestionEqual(q1, q2) {
    let res = q1.year === q2.year &&
      q1.provider === q2.provider &&
      q1.season === q2.season &&
      q1.chapter === q2.chapter &&
      q1.qNum === q2.qNum;

    return res;
  }

  //-----------------------------------------

  function _loadLabels() {
    labeledQuestions = JSON.parse(localStorage.getItem("q-labels")) || [];
  }

  //-----------------------------------------

  function _updateLabeledQuestionsArr(question) {

    labeledQuestions = labeledQuestions.filter((q) => {
      return !isQuestionEqual(q, question);
    });

    if (!_.isEmpty(question.labels)) {
      labeledQuestions.push(question)
    }
  }

  //-----------------------------------------

  function storeQuestion(question) {
    _updateLabeledQuestionsArr(question);
    localStorage.setItem("q-labels", JSON.stringify(labeledQuestions));
  }

  //-----------------------------------------

  function getQuestionLabels(question) {
    for (let i = 0; i < labeledQuestions.length; i++) {
      if (isQuestionEqual(labeledQuestions[i], question)) {
        return labeledQuestions[i].labels || [];
      }
    }
    return [];
  }

  _loadLabels();

  return {
    storeQuestion,
    getQuestionLabels
  }
}