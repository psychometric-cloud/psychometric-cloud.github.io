function TestDataBuilder() {


  //---------------------------------------

  function isQuestionEqual(q1, q2) {
    let res = q1.year === q2.year &&
      q1.provider === q2.provider &&
      q1.season === q2.season &&
      q1.chapter === q2.chapter &&
      q1.qNum === q2.qNum;

    return res;
  }

  //---------------------------------------

  function removeHistory(subject, data) {

    let historyTests = testHistory.getTests(subject);
    let res = [];

    if (_.isEmpty(historyTests)) {
      return data;
    }
    for (let i = 0; i < data.length; i++) {
      let addItem = true;
      for (let j = 0; j < historyTests.length; j++) {
        if (isQuestionEqual(data[i], historyTests[j])) {
          addItem = false
          break;
        }
      }
      if (addItem) {
        res.push(data[i]);
      }
    }
    return res;
  }

  //---------------------------------------

  function addStandAloneQuestions(questions, filteredData, shuffledIndexes) {
    let index = 0;

    while (questions.length < 8 && index < filteredData.length) {
      let q = filteredData[shuffledIndexes[index]];

      if (q.isStandalone) {
        questions.push(q)
      }
      index += 1;
    }
  }

  //-------------------------------------

  function addTextQuestions(questions, filteredData, shuffledIndexes) {
    let index = 0;
    let textAdded = false;

    while (!textAdded && index < filteredData.length) {
      let q = filteredData[shuffledIndexes[index]];

      if (_.has(q, "members")) {
        textAdded = true;
        questions.push(q);

        for (let j = 0; j < q.members.length; j++) {
          questions.push(q.members[j]);
        }
      }

      index += 1;
    }
  }

  //---------------------------------------

  function build(subject, data) {

    let questions = [];
    let filteredData = removeHistory(subject, data);
    let shuffledIndexes = utils.shuffleNums(filteredData.length);

    addStandAloneQuestions(questions, filteredData, shuffledIndexes);
    addTextQuestions(questions, filteredData, shuffledIndexes);

    return questions;
  }

  return {
    build: build
  }
}
