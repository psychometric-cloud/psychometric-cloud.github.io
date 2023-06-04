function PracticeDataBuilder() {


  function getChartSiblings(chart) {
    let siblings = [];

    for (var i = 0; i < qBank.length; i++) {

      if (qBank[i].qAreas[0] === chart.qAreas[0] &&
        qBank[i].publisher === chart.publisher &&
        qBank[i].year === chart.year &&
        qBank[i].season === chart.season &&
        qBank[i].chapter === chart.chapter) {

        siblings.push(JSON.parse(JSON.stringify(qBank[i])))
      }
    }
    return siblings;
  }

  //---------------------------------------

  function appendChartsSiblings(qArr, charts) {

    let siblings = getChartSiblings(charts[0]);
    return siblings.concat(qArr);
  }

  //---------------------------------------

  function filterCharts(qArr) {
    filtered = [];

    for (var i = 0; i < qArr.length; i++) {
      if (qArr[i].qAreas[0] !== "chart") {
        filtered.push(JSON.parse(JSON.stringify(qArr[i])));
      }
    }
    return filtered;
  }

  //---------------------------------------

  function getCharts(qArr) {
    charts = [];

    for (var i = 0; i < qArr.length; i++) {
      if (qArr[i].qAreas[0] === "chart") {
        charts.push(JSON.parse(JSON.stringify(qArr[i])));
      }
    }
    return charts;
  }

  //---------------------------------------

  function buildBasicTest(arr, data) {
    let shuffledIndexes = utils.shuffleNums(data.length);

    for (var i = 0; i < 10; i++) {
      arr.push(data[shuffledIndexes[i]])
    }
  }


  function tmp(qArr) {
    for (var i = 0; i < qBank.length; i++) {

      if (qBank[i].qAreas[0] === "chart") {
        qArr.push(JSON.parse(JSON.stringify(qBank[i])));
        return;
      }
    }
  }

  //---------------------------------------

  function build(data) {
    qArr = [];

    buildBasicTest(qArr, data);

    charts = getCharts(qArr);
    qArr = filterCharts(qArr);
    qArr = appendChartsSiblings(qArr, charts);

    return qArr;
  }

  return {
    build: build
  }
}
