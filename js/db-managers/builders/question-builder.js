function QuestionBuilder() {

  let add = (test, question, chapter) => {
    let qInfo = question.split(":");
    let areas = qInfo[1].split(",");

    qBank.push({
      publisher: test.publisher,
      year: parseInt(test.year),
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

