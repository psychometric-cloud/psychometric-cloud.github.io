function SrcBuilder() {

  function getPublisher(qData) {
    return qData.publisher.substring(0, qData.publisher.length - 1).toUpperCase();
  }

  //-------------------------------------

  function getSubject(qData) {
    return qData.chapter.substring(0, qData.chapter.length - 1).toLowerCase();
  }

  //-------------------------------------

  function getName(qData) {
    return `${qData.chapter.slice(-1)}_${qData.qNum}`;
  }

  //-------------------------------------

  function getSeason(qData) {

    if (qData.season === "winter") {
      return sSeasons.w;
    }
    if (qData.season === "summer") {
      return sSeasons.su;
    }
    if (qData.season === "spring") {
      return sSeasons.sp;
    }
    if (qData.season === "autumn") {
      return sSeasons.a;
    }
  }

  //---------------------------------------

  function getTitle(qData) {
    return `${getPublisher(qData).toLowerCase()} ${qData.year} ${qData.season} ${getName(qData)}`
  }

  //---------------------------------------

  function build(qData, option, more) {
    src = `./assets/questions/${getPublisher(qData)}/${qData.year}/${getSeason(qData)}/${option}/${getSubject(qData)}/${getName(qData)}.png`;

    if (more === eSubject.math) {
      src = `./assets/questions/${getPublisher(qData)}/${qData.year}/${getSeason(qData)}/questions/math/${qData.chapter.slice(-1)}_G.png`
    }
    if (more === eSubject.he) {
      src = `./assets/questions/${getPublisher(qData)}/${qData.year}/${getSeason(qData)}/questions/math/${qData.chapter.slice(-1)}_T.png`
    }
    if (more === eSubject.en) {
      let subject = getSubject(qData);
      let t = subject === "text1" ? "T1" : "T2";
      src = `./assets/questions/${getPublisher(qData)}/${qData.year}/${getSeason(qData)}/questions/math/${qData.chapter.slice(-1)}_${t}.png`
    }
    return src;
  }

  return {
    getTitle: getTitle,
    build: build
  }
}
