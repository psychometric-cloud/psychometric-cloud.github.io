function FileValidator() {

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
      chapterValidator.checkChapter(fileName, fileData, eSubject.math1) &&
      chapterValidator.checkChapter(fileName, fileData, eSubject.math2) &&
      chapterValidator.checkChapter(fileName, fileData, eSubject.HE1) &&
      chapterValidator.checkChapter(fileName, fileData, eSubject.HE2) &&
      chapterValidator.checkChapter(fileName, fileData, eSubject.EN1) &&
      chapterValidator.checkChapter(fileName, fileData, eSubject.EN2);

    return isValid;
  }

  //------------------------------------------

  validate = (fileName, fileData) => {

    let isValid = true;

    if (window.location.href.includes('?test')) {
      isValid =
        checkMainStruct(fileName, fileData) &&
        checkQuestionsStruct(fileName, fileData) &&
        checkPublisher(test) &&
        checkYear(test) &&
        checkSeason(test) &&
        checkSubjects(test) &&
        checkChapters();
    }
    return isValid;
  }

  //------------------------------------------

  return {
    validate: validate
  }
}
