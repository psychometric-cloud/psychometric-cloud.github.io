function TestDataBuilder() {

  const test_subjects = [
    {
      selectedAreas: [],
      selectedSubject: "he",
      testQuestions: 18,
      quizQuestions: 8
    },
    {
      selectedAreas: [],
      selectedSubject: "math",
      testQuestions: 15,
      quizQuestions: 8
    },
    {
      selectedAreas: ['complete', 'restate'],
      selectedSubject: "en",
      testQuestions: 7,
      quizQuestions: 10
    }
  ];

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

  function addStandAloneQuestions(questions, maxQuestions, filteredData, shuffledIndexes) {
    let index = 0;

    while (questions.length < maxQuestions && index < filteredData.length) {
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

  function buildBySubject(filterBy, isTest, cb, isQuiz) {

    debugger;
    dataFilter.filter(filterBy, (filteredData) => {
      let questionsArr = [];
      let maxQuestions = isTest ? filterBy.testQuestions : filterBy.quizQuestions;

      filteredData = removeHistory(filterBy.selectedSubject, filteredData);
      let shuffledIndexes = utils.shuffleNums(filteredData.length);

      addStandAloneQuestions(questionsArr, maxQuestions, filteredData, shuffledIndexes);
      addTextQuestions(questionsArr, filteredData, shuffledIndexes);
      cb(questionsArr);
    })
  }

  //---------------------------------------

  function buildTest(cb) {

    let res = [];
    let si = utils.shuffleNums(3);

    buildBySubject(test_subjects[si[0]], true, (res1) => {
      res = res.concat(res1);
      buildBySubject(test_subjects[si[1]], true, (res2) => {
        res = res.concat(res2);
        buildBySubject(test_subjects[si[2]], true, (res3) => {
          res = res.concat(res3);
          cb(res);
        })
      })
    })
  }

  //---------------------------------------

  function buildQuiz(filterBy, cb) {

    let res = [];

    buildBySubject(filterBy, false, (res1) => {
      res = res.concat(res1);
        cb(res);
    }, true);
  }

  //---------------------------------------

  function build(filterBy, cb) {

    if (filterBy.actionType === eActionType.test) {
      buildTest(cb);
    } else{
      let _filterBy = structuredClone(test_subjects[filterBy.quizType]);
      
      _filterBy.publisher = filterBy.publisher;
      buildQuiz(_filterBy, cb);
    }            
  }


  return {
    build: build
  }
}
