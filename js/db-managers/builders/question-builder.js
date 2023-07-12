function QuestionBuilder() {

  let isFirstMember = (q) => {
    if (_.isEmpty(qBank)) {
      return true;
    }

    let last = qBank[qBank.length - 1];

    if (last.isStandalone) {
      return true;
    }
    if (last.qAreas.join() !== q.qAreas.join()) {
      return true;
    }
    if (last.chapter !== q.chapter) {
      return true;
    }
    return false;
  }

  //---------------------------------------------

  let addMember = (q) => {
    qBank[qBank.length - 1].members.push(q)
  }

  //---------------------------------------------

  let add = (test, question, chapter) => {

    if (question !== "skip") {
      let qInfo = question.split(":");
      let areas = qInfo[1].split(",");

      if (areas.length === 1) {
        areas.push("general");
      }

      let q = {
        publisher: test.publisher,
        year: parseInt(test.year),
        season: test.season,
        chapter: chapter,
        qNum: parseInt(qInfo[0]),
        qAreas: areas,
        aNum: parseInt(qInfo[2]),
        isStandalone: areas[0] !== "chart" && areas[0] !== "reading"
      }
      q.labels = labelsManager.getQuestionLabels(q);

      if (!q.isStandalone) {
        if (isFirstMember(q)) {
          q.isFirst = true;
          q.members = [];
          qBank.push(q);
        } else {
          addMember(q)
        }
      } else {
        qBank.push(q);
      }
    }
  }

  return {
    add: add
  }
}

