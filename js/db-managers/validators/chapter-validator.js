function ChapterValidator() {

  checkAreas = (areas, optionalMainAreas, optionalSubAreas) => {
    let areasArr = areas.split(",");

    if (areasArr.length < 1) {
      return false;
    }
    if (!optionalMainAreas.includes(areasArr[0])) {
      return false;
    }

    if (areasArr.length >= 2) {
      for (let i = 1; i < areasArr.length; i++) {
        if (!optionalSubAreas.includes(areasArr[i])) {
          return false;
        }
      }
    }

    return true;
  }

  //---------------------------------------------

  isChapterValid = (fileName, fileData, chapterName, optionalMainAreas, optionalSubAreas) => {

    fileData.questions[chapterName].forEach((item, index) => {
      let info = item !== "skip" ? item.split(":") : [index, "geo", 1];

      if (info.length !== 3) {
        console.log(`chapter ${chapterName} in ${fileName} is invalid.(${item} 1)`);
        return false;
      }

      if (!checkAreas(info[1], optionalMainAreas, optionalSubAreas)) {
        console.log(`chapter ${chapterName} in ${fileName} is invalid.(${item} 2)`);
        return false;
      }

      if (!utils.isEq(info[0], index + 1)) {
        console.log(`chapter ${chapterName} in ${fileName} is invalid.(${item} 3)`);
        return false;
      }

      if (!utils.isBetween(info[2], 1, 4)) {
        console.log(`chapter ${chapterName} in ${fileName} is invalid.(${item} 4)`);
        return false;
      }
    });
    return true;
  };

  //----------------------------------------------

  checkChapter = (fileName, fileData, chapterName) => {
    if (chapterName.startsWith("math")) {
      return isChapterValid(fileName, fileData, chapterName, MATH_MAIN_AREAS, MATH_SUB_AREAS);
    }
    if (chapterName.startsWith("HE")) {
      return isChapterValid(fileName, fileData, chapterName, HE_AREAS, []);
    }
    if (chapterName.startsWith("EN")) {
      return isChapterValid(fileName, fileData, chapterName, EN_MAIN_AREAS, EN_SUB_AREAS);
    }
  };

  //------------------------------------------

  return {
    checkChapter: checkChapter
  }
}
