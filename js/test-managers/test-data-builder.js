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
      for (let j = 0; j < historyTests.length; j++) {
        if (!isQuestionEqual(data[i], historyTests[j])) {
          res.push(data[i]);
        }
      }
    }
    return res;
  }

  //---------------------------------------

  function buildBasicTest(data) {
    let arr = [];
    let shuffledIndexes = utils.shuffleNums(data.length);

    for (var i = 0; i < 10; i++) {
      arr.push(data[shuffledIndexes[i]])
    }
    return arr;
  }

  //-------------------------------------

  function setReadingQuestions(arr) {
    extendedArr = [];

    for (let i = 0; i < arr.length; i++) {
      extendedArr.push(arr[i]);

      if (_.has(arr[i], "members")) {
        for (let j = 0; j < arr[i].members.length; j++) {
          extendedArr.push(arr[i].members[j]);
        }
      }
    }
    return extendedArr;
  }

  //---------------------------------------

  function build(subject, data) {

    data = removeHistory(subject, data);
    let basicTest = buildBasicTest(data);
    let extendedTest = setReadingQuestions(basicTest);

    return extendedTest;
  }

  return {
    build: build
  }
}
