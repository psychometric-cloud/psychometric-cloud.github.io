function LabelsManager() {

  let labels = [];

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
    labels = JSON.parse(localStorage.getItem("q-labels")) || [];
  }

  //-----------------------------------------

  function _setQuestionLabel(question, label) {
    if (question.labels.includes(label)) {
      const index = question.labels.indexOf(label);
      question.labels = question.labels.splice(index, 1);
    } else {
      question.labels.push(label);
    }
  }

  //-----------------------------------------

  function _updateLabels(question) {
    labels = labels.filter((q) => {
      return !isQuestionEqual(q, question);
    });

    if (!_.isEmpty(question.labels)) {
      labels.push(question)
    }
  }

  //-----------------------------------------

  function toggleLabel(question, label) {
    _setQuestionLabel(question, label);
    _updateLabels();

    localStorage.setItem("q-labels", JSON.stringify(labels));
  }

  //-----------------------------------------

  function getQuestionLabels(question) {
    for (let i = 0; i < labels.length; i++) {
      if (isQuestionEqual(labels[i], question)) {
        return question.labels;
      }
    }
    return [];
  }

  _loadLabels();

  return {
    toggleLabel,
    getQuestionLabels
  }
}