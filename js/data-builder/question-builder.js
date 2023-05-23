function QuestionBuilder() {


  add = (test, question, chapter) => {
    let qInfo = question.split(":");
    let areas = qInfo[1].split(",");

    qBank.push({
      publisher: test.publisher,
      year: test.year,
      season: test.season,
      chapter: chapter,
      qNum: parseInt(qInfo[0]),
      qMainArea: areas[0],
      qSubArea: areas[1],
      aNum: parseInt(qInfo[2])
    });
  }

  return {
    add: add
  }
}

