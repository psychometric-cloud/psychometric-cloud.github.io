function FileValidator() {

  chapterValidator = new ChapterValidator();

  checkMainStructure = (fileName, fileData) => {
    let isValid =
      _.has(fileData, "publisher") &&
      _.has(fileData, "year") &&
      _.has(fileData, "season") &&
      _.has(fileData, "questions");

    if (!isValid) {
      console.log(`Te main structure in: '${fileName}' is invalid`);
    }
    return isValid;
  }

  //------------------------------------------

  checkQuestionsStructure = (fileName, fileData) => {
    let isValid =
      Array.isArray(fileData.questions.math1) &&
      Array.isArray(fileData.questions.math2) &&
      Array.isArray(fileData.questions.HE1) &&
      Array.isArray(fileData.questions.HE2) &&
      Array.isArray(fileData.questions.EN1) &&
      Array.isArray(fileData.questions.EN2);

    if (!isValid) {
      console.log(`Question structure in: '${fileName}' is invalid`);
    }
    return isValid;
  }

  //--------------------------------------------

  checkPublisher = (fileName, fileData) => {
    if (![ePublisher.mallo].includes(fileData.publisher)) {
      console.log(`Publisher ${fileData.publisher} in: '${fileName}' is invalid`);
      return false;
    }
    return true;
  }

  //------------------------------------------

  checkYear = (fileName, fileData) => {

    if (fileData.publisher === ePublisher.MALLO) {
      if (units.isBetween(fileData.year, 2009, 2023)) {
        console.log(`Year: ${fileData.year} in: '${fileName}' is invalid`);
        return false;
      }
    }
    return true;
  }

  //------------------------------------------

  checkSeason = (fileName, fileData) => {
    if (fileData.season === ePublisher.mallo) {
      if (!Object.values(window.eSeasons).includes(fileData.season)) {
        console.log(`season ${fileData.season} in '${fileName}' is invalid`);
        return false;
      }
    }
    return true;
  }

  //------------------------------------------

  checkChapters = (fileName, fileData) => {

    let isValid =
      chapterValidator.checkChapter(fileName, fileData, eChapters.math1) &&
      chapterValidator.checkChapter(fileName, fileData, eChapters.math2) &&
      chapterValidator.checkChapter(fileName, fileData, eChapters.he1) &&
      chapterValidator.checkChapter(fileName, fileData, eChapters.he2) &&
      chapterValidator.checkChapter(fileName, fileData, eChapters.en1) &&
      chapterValidator.checkChapter(fileName, fileData, eChapters.en2);

    return isValid;
  }

  //------------------------------------------

  validate = (fileName, fileData) => {

    let isValid = true;

    if (window.location.href.includes('?test')) {
      isValid =
        checkMainStructure(fileName, fileData) &&
        checkQuestionsStructure(fileName, fileData) &&
        checkPublisher(fileName, fileData) &&
        checkYear(fileName, fileData) &&
        checkSeason(fileName, fileData) &&
        checkChapters(fileName, fileData);
    }
    return isValid;
  }

  //------------------------------------------

  return {
    validate: validate
  }
}
