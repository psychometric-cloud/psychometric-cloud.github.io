function SrcBuilder() {

  function getPublisher(qData) {
    return qData.publisher.toUpperCase();
  }

  //-------------------------------------

  function getSubject(qData) {
    return qData.chapter.replace(/[0-9]/g, '').toLowerCase();
  }

  //-------------------------------------

  function getName(qData) {
    return `${qData.chapter.replace(/\D/g, '')}_${qData.qNum}`;
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
    return `${getPublisher(qData).toLowerCase()} ${!isNaN(qData.year) ? qData.year : ''} ${qData.season} ${getName(qData)}`
  }

  //---------------------------------------

  function getDomain(qData) {
    if (qData.publisher.toUpperCase() === "MALLO") {
      if (qData.year >= 2014) {
        return "https://psychometric-cloud.github.io";
      }
    }
    return "https://psychometric-cloud-part2.github.io";
  }

  //---------------------------------------

  function buildUrl(qData) {
    let publisher = getPublisher(qData);

    if (publisher === "MALLO") {
      return `${getDomain(qData)}/assets/questions/MALLO/${qData.year}/${getSeason(qData)}`;
    }
    if (publisher === "ONEXONE") {
      return `${getDomain(qData)}/assets/questions/onexone/s${qData.year}`;
    }
    if (publisher === "NIVR") {
      return `${getDomain(qData)}/assets/questions/nivr/s${qData.year}`;
    }
    if (publisher === "800") {
      return `${getDomain(qData)}/assets/questions/800/s${qData.year}`;
    }
    if (publisher === "TALMOR") {
      return `${getDomain(qData)}/assets/questions/talmor/marathon`;
    }
    return "";
  }


  //---------------------------------------

  function imageUrl(qData, option) {
    let src = buildUrl(qData);
    return `${src}/${option}/${getSubject(qData)}/${getName(qData)}.png`;
  }

  //---------------------------------------

  function textUrl(qData) {
    let src = buildUrl(qData);
    let _src = `${src}/questions`;
    let subject = getSubject(qData);

    if (qData.qAreas.length === 2) {
      let t = qData.qAreas[1] === "text1" ? "T1" : "T2";
      src = `${_src}/${subject}/${qData.chapter.slice(-1)}_${t}.png`
    } else {
      src = `${_src}/${subject}/${qData.chapter.slice(-1)}_T.png`
    }
    return src;
  }


  return {
    getTitle: getTitle,
    imageUrl: imageUrl,
    textUrl: textUrl
  }
}
