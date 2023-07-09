function SrcBuilder() {

  function getPublisher(qData) {
    return qData.publisher.toUpperCase();
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
    let _season = qData.season.toLowerCase();

    if (_season === "winter") {
      return sSeasons.w;
    }
    if (_season === "summer") {
      return sSeasons.su;
    }
    if (_season === "spring") {
      return sSeasons.sp;
    }
    if (_season === "autumn") {
      return sSeasons.a;
    }
    return _season;
  }

  //---------------------------------------

  function getTitle(qData) {
    return `${getPublisher(qData).toLowerCase()} ${qData.year} ${qData.season} ${getName(qData)}`
  }

  //---------------------------------------

  function getDomain(qData) {
    if (qData.publisher.toUpperCase() === "MALLO") {
      if (qData.year >= 2014) {
        return "https://psychometric-cloud.github.io";
      }
      return "https://psychometric-cloud-part2.github.io";
    }
    return "error";
  }

  //---------------------------------------

  function build(qData, option, more) {
    src = `${getDomain(qData)}/assets/questions/${getPublisher(qData)}/${qData.year}/${getSeason(qData)}/${option}/${getSubject(qData)}/${getName(qData)}.png`;

    if (more) {
      let _src = `${getDomain(qData)}/assets/questions/${getPublisher(qData)}/${qData.year}/${getSeason(qData)}/questions`;
      let subject = getSubject(qData);

      if (qData.qAreas.length === 2) {
        let t = qData.qAreas[1] === "text1" ? "T1" : "T2";
        src = `${_src}/${subject}/${qData.chapter.slice(-1)}_${t}.png`
      } else {
        src = `${_src}/${subject}/${qData.chapter.slice(-1)}_T.png`
      }
    }
    return src;
  }

  return {
    getTitle: getTitle,
    build: build
  }
}
