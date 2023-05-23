function utils() {

  loadJson = (file, cb) => {
    fetch(file)
      .then((response) => {
        cb(response.json());
      })
      .then((json) => {
        console.log(`loading ${file} has failed`);
      });
  }

  //----------------------------------------

  isNumeric = (str) => {
    if (typeof str != "string") {
      return false;
    }
    return !isNaN(str) && !isNaN(parseFloat(str));
  }

  //----------------------------------------

  isEq = (str, num) => {
    if (!isNumeric(str)) {
      return false;
    }
    return parseFloat(str) === num;
  }

  //----------------------------------------

  isBetween = (str, num1, num2) => {
    if (!isNumeric(str)) {
      return false;
    }
    return parseFloat(str) >= num1 && parseFloat(str) <= num2;
  }

  return {
    isEq: isEq,
    isBetween: isBetween,
    isNumeric: isNumeric,
    loadJson: loadJson
  }
}
