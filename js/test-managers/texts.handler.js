function TextsHandler() {

  function getTextSiblings(text) {
    let siblings = [];

    for (var i = 0; i < qBank.length; i++) {

      if (qBank[i].qAreas[0] === text.qAreas[0] &&
        qBank[i].qAreas[1] === text.qAreas[1] &&
        qBank[i].publisher === text.publisher &&
        qBank[i].year === text.year &&
        qBank[i].season === text.season &&
        qBank[i].chapter === text.chapter) {

        siblings.push(JSON.parse(JSON.stringify(qBank[i])))
      }
    }
    return siblings;
  }

  //---------------------------------------

  function appendTextSiblings(qArr, texts) {

    let siblings = getTextSiblings(texts[0]);
    return siblings.concat(qArr);
  }

  //---------------------------------------

  function filterTexts(qArr) {
    let filtered = [];

    for (var i = 0; i < qArr.length; i++) {
      if (qArr[i].qAreas[0] !== "chart" || qArr[i].qAreas[0] !== "reading") {
        filtered.push(JSON.parse(JSON.stringify(qArr[i])));
      }
    }
    return filtered;
  }

  //---------------------------------------

  function getTexts(qArr) {
    let texts = [];

    for (var i = 0; i < qArr.length; i++) {
      if (qArr[i].qAreas[0] === "chart" || qArr[i].qAreas[0] === "reading") {
        texts.push(JSON.parse(JSON.stringify(qArr[i])));
      }
    }
    return texts;
  }

  //---------------------------------------

  function handleText(qArr) {
    let texts = getTexts(qArr);
    let filtered = filterTexts(qArr);
    let append = appendTextSiblings(filtered, texts);

    return append;
  }

  return {
    handleText: handleText
  }
}
