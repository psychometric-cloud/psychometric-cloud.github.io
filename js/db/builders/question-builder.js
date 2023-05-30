function QuestionBuilder() {

  getPublisher = (test) => {
    if (test.publisher === "MALLO") {
      if (parseInt(test.year) < 2012) {
        return ePublisher.mallo2
      }
      return ePublisher.mallo1
    }
    return test.publisher;
  }

  //--------------------------------------------

  add = (test, question, chapter) => {
    let qInfo = question.split(":");
    let areas = qInfo[1].split(",");

    qBank.push({
      publisher: getPublisher(test),
      year: test.year,
      season: test.season,
      chapter: chapter,
      qNum: parseInt(qInfo[0]),
      qAreas: areas,
      aNum: parseInt(qInfo[2])
    });
  }

  return {
    add: add
  }
}

