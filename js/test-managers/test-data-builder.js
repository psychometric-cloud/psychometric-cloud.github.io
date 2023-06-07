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

  //---------------------------------------

  function build(subject, data) {
    let qArr = [];

    data = removeHistory(subject, data);
    qArr = buildBasicTest(data);
    qArr = textsHandler.handleText(qArr);

    return qArr;
  }

  return {
    build: build
  }
}
