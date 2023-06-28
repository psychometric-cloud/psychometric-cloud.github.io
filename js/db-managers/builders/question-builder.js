function QuestionBuilder() {

  let add = (test, question, chapter) => {

    if (question !== "skip") {
      let qInfo = question.split(":");
      let areas = qInfo[1].split(",");

      let q = {
        publisher: test.publisher,
        year: parseInt(test.year),
        season: test.season,
        chapter: chapter,
        qNum: parseInt(qInfo[0]),
        qAreas: areas,
        aNum: parseInt(qInfo[2])
      }
      q.labels = labelsManager.getQuestionLabels(q);

      qBank.push(q);
    }
  }

  return {
    add: add
  }
}

