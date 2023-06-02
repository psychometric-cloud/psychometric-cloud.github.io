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

    if (more === "chart" || more === "reading") {
      let _src = `./assets/questions/${getPublisher(qData)}/${qData.year}/${getSeason(qData)}/questions`;

      if (more === "chart") {
        src = `${_src}/math/${qData.chapter.slice(-1)}_T.png`;
      } else {
        if (qData.qAreas.length === 2) {
          let t = qData.qAreas[1] === "text1" ? "T1" : "T2";
          src = `${_src}/en/${qData.chapter.slice(-1)}_${t}.png`
        } else {
          src = `${_src}/he/${qData.chapter.slice(-1)}_T.png`
        }
      }
    }
    return src;
  }

  return {
    getTitle: getTitle,
    build: build
  }
}
