function ChapterValidator() {

  checkAreas = (areas, optionalMainAreas, optionalSubAreas) => {
    let areasArr = areas.split(",");

    if (areasArr.length < 1 || areasArr.length > 2) {
      return false;
    }
    if (!optionalMainAreas.includes(areasArr[0])) {
      return false;
    }
    if (areas.length === 2 && !optionalSubAreas.includes(areasArr[1]))
      return false;

    return true;
  }

  //---------------------------------------------

  isChapterValid = (fileName, fileData, chapterName, optionalMainAreas, optionalSubAreas) => {

    fileData.questions[chapterName].forEach((item, index) => {
      let info = item.split(":");

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
      return isChapterValid(fileName, fileData, chapterName, EN_AREAS, []);
    }
  };

  //------------------------------------------

  return {
    checkChapter: checkChapter
  }
}
