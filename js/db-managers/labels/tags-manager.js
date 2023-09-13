function TagsManager() {

  let tagedQuestions = [];

  function isQuestionEqual(q1, q2) {
    let res = q1.year === q2.year &&
      q1.provider === q2.provider &&
      q1.season === q2.season &&
      q1.chapter === q2.chapter &&
      q1.qNum === q2.qNum;

    return res;
  }

  //-----------------------------------------

  function _loadTags() {
    tagedQuestions = JSON.parse(localStorage.getItem("q-tags")) || [];
  }

  //-----------------------------------------

  function _updateTagedQuestionsArr(question) {

    tagedQuestions = tagedQuestions.filter((q) => {
      return !isQuestionEqual(q, question);
    });
    tagedQuestions.push({ question });
  }

  //-----------------------------------------

  function storeQuestion(question) {
    _updateTagedQuestionsArr(question);
    localStorage.setItem("q-tags", JSON.stringify(tagedQuestions));
  }

  //-----------------------------------------

  function getStoredQuestionTags(question) {

    for (let i = 0; i < tagedQuestions.length; i++) {
      if (isQuestionEqual(tagedQuestions[i], question)) {
        return tagedQuestions[i].qAreas;
      }
    }
    return question.qAreas;
  }


  _loadTags();

  return {
    storeQuestion,
    getStoredQuestionTags
  }
}