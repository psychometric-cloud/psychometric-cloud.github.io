function TestDataBuilder() {


  //---------------------------------------

  function isQuestionEqual(q1, q2) {
    let res = q1.year == q2.year && // in localstorage years stored as int
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

  function notIncluded(questions, q) {
    for (let i = 0; i < questions.length; i++) {
      if (isQuestionEqual(questions[i], q)) {
        return false;
      }
    }
    return true;
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

  //---------------------------------------

  function addFailedQuestion(questions, filteredData) {

    for (let i = 0; i < filteredData.length; i++) {
      let q = filteredData[i];

      if (q.labels.includes("failed") &&
        q.qAreas[0] !== "chart" &&
        notIncluded(questions, q)) {
        questions.push(q);
        break;
      }
    }
  }

  //---------------------------------------

  function addLikedQuestion(questions, filteredData) {

    for (let i = 0; i < filteredData.length; i++) {
      let q = filteredData[i];

      if (q.labels.includes("example") &&
        q.qAreas[0] !== "chart" &&
        notIncluded(questions, q)) {
        questions.push(q);
        break;
      }
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

  function buildBySubject(filterBy, cb) {

    dataFilter.filter(filterBy, (filteredData) => {
      let questions = [];

      filteredData = removeHistory(filterBy.selectedSubject, filteredData);
      let shuffledIndexes = utils.shuffleNums(filteredData.length);

      addStandAloneQuestions(questions, filteredData, shuffledIndexes);
      addFailedQuestion(questions, filteredData);
      addLikedQuestion(questions, filteredData);
      addTextQuestions(questions, filteredData, shuffledIndexes);

      cb(questions);
    })
  }

  //---------------------------------------

  function buildMathPlus(cb) {

    let res = [];

    let enFilter = {
      selectedAreas: ['complete', 'restate'],
      selectedSubject: "en"
    }
    let mathFilter = {
      selectedSubject: "math",
      selectedAreas: [],
    }
    let heFilter = {
      selectedAreas: ['analogy', 'deduce'],
      selectedSubject: "he"
    }

    buildBySubject(mathFilter, (res1) => {
      res = res.concat(res1);
      buildBySubject(enFilter, (res2) => {
        res = res.concat(res2.slice(0, 3));
        buildBySubject(heFilter, (res3) => {
          res = res.concat(res3.slice(0, 4));
          cb(res);
        })
      })
    })
  }

  //---------------------------------------

  function build(filterBy, cb) {
    if (filterBy.selectedSubject === eSubjects.math) {
      buildMathPlus(cb);
    } else {
      buildBySubject(filterBy, cb);
    }
  }

  return {
    build: build
  }
}
