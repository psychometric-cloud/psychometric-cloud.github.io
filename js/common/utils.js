function utils() {

  let loadJson = (file, cb) => {

    fetch(file)
      .then((response) => response.json())
      .then((json) => {
        cb(json)
      })
      .catch(function () {
        console.log(`loading ${file} has failed`);
      });
  }

  let loadTxt = (file, cb) => {

    fetch(file)
      .then((response) => response.text())
      .then((txt) => {
        cb(txt)
      })
      .catch(function () {
        console.log(`loading txt ${file} has failed`);
      });
  }

  //----------------------------------------

  let isNumeric = (str) => {
    if (typeof str != "string") {
      return false;
    }
    return !isNaN(str) && !isNaN(parseFloat(str));
  }

  //----------------------------------------

  let isEq = (str, num) => {
    if (!isNumeric(str)) {
      return false;
    }
    return parseFloat(str) === num;
  }

  //----------------------------------------

  let isBetween = (str, num1, num2) => {
    if (!isNumeric(str)) {
      return false;
    }
    return parseFloat(str) >= num1 && parseFloat(str) <= num2;
  }

  //----------------------------------------

  let shuffleNums = (maxNum) => {
    let arr = [];

    for (var i = 0; i < maxNum; i++) {
      arr.push(i);
    }
    return _.shuffle(arr);
  }

  return {
    isEq: isEq,
    isBetween: isBetween,
    isNumeric: isNumeric,
    loadJson: loadJson,
    loadTxt: loadTxt,
    shuffleNums: shuffleNums
  }
}
