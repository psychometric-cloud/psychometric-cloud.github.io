function DataBuilder() {

  let files = [];
  let shuffledUrls = [];
  let chapterArr = Object.values(eChapters);

  //-----------------------------------------

  const processFile = (file) => {
    if (dataValidator.validateFile(file.name, file.data)) {

      console.log(file.name);
      chapterArr.forEach((chapter) => {
        file.data.questions[chapter].forEach((question) => {
          questionBuilder.add(file.data, question, chapter);
        })
      });
    }
  }

  //-----------------------------------------

  const processFiles = (fileIndex, callback) => {
    let file = files[fileIndex];

    setTimeout(() => {
      processFile(file);

      if (fileIndex < files.length - 1) {
        processFiles(fileIndex + 1, callback)
      } else {
        callback();
      }
    }, 100);
  }

  //-----------------------------------------

  const loadTestFiles = (callback) => {

    shuffledUrls.forEach((fileUrl) => {
      utils.loadJson(fileUrl, (json) => {
        files.push({
          name: fileUrl,
          data: json
        });
        if (files.length === shuffledUrls.length) {
          callback();
        }
      })
    });
  }

  //-----------------------------------------

  const build = (callback) => {
    shuffledUrls = _.shuffle(urlsList);

    loadTestFiles(() => {
      processFiles(0, () => {
        dataStats.writeStat(files);
        callback();
      })
    })
  }

  return {
    build: build
  }
}