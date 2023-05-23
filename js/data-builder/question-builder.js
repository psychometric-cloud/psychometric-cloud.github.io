function QuestionBuilder() {

  chapterType = (chapter) => {
    if (chapter === eChapter.math1 || chapter === eChapter.math1) {
      return "math";
    }
    if (chapter === eChapter.HE1 || chapter === eChapter.HE2) {
      return "HE";
    }
    if (chapter === eChapter.EN1 || chapter === eChapter.EN2) {
      return "EN";
    }
  }

  //-----------------------------------------

  add = (test, question, chapter) => {
    let qInfo = question.split(":");
    let areas = qInfo[1].split(",");

    qBank.push({
      publisher: test.publisher,
      year: test.year,
      season: test.season,
      chapter: chapterType(chapter),
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

