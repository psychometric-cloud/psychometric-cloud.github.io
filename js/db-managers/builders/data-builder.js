function DataBuilder() {

  let files = [];
  let shuffledUrls = [];
  let chapterArr = Object.values(eChapters);

  //-----------------------------------------

  const processFile = (file) => {
    if (dataValidator.validateFile(file.name, file.data)) {

      let chapters = Object.keys(file.data.questions);
      chapters.forEach((chapter) => {
        if (file.data.questions[chapter]) {
          file.data.questions[chapter].forEach((question) => {
            questionBuilder.add(file.data, question, chapter);
          })
        }
      });
    }
  }

  //-----------------------------------------

  const processFiles = (fileIndex, callback) => {
    let file = files[fileIndex];

    setTimeout(() => {
      processFile(file);

      console.log(file.name);
      $(".total-files").text(fileIndex + 1);

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
        console.log(`Total processed: ${urlsList.length}`);
        dataStats.set();
        callback();
      })
    })
  }

  return {
    build: build
  }
}