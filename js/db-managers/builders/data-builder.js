function DataBuilder() {

  files = [];
  chapterArr = Object.values(eChapters);

  filesUrls = [
    "https://psychometric-cloud.github.io/assets/questions/MALLO/2022/a/data.json",
    "https://psychometric-cloud.github.io/assets/questions/MALLO/2022/sp/data.json",
    "https://psychometric-cloud.github.io/assets/questions/MALLO/2022/su/data.json",
    "https://psychometric-cloud.github.io/assets/questions/MALLO/2022/w/data.json"
    // "https://psychometric-cloud.github.io/assets/questions/MALLO/2021/w/data.json",
    // "https://psychometric-cloud.github.io/assets/questions/MALLO/2021/su/data.json"
  ];

  //-----------------------------------------

  processFile = (file) => {
    if (fileValidator.validate(file.name, file.data)) {
      chapterArr.forEach((chapter) => {
        file.data.questions[chapter].forEach((question) => {
          questionBuilder.add(file.data, question, chapter);
        })
      });
    }
  }

  //-----------------------------------------

  processFiles = (fileIndex, callback) => {
    let file = files[fileIndex];

    setTimeout(() => {
      processFile(file);

      if (fileIndex < files.length - 1) {
        processFiles(fileIndex + 1, callback)
      } else {
        callback();
      }
    }, 250);
  }

  //-----------------------------------------

  loadTestFiles = (callback) => {

    // for (let i = 0; i < 60; i++) { //test only!!!!!!!!!
    //   filesUrls.push(filesUrls[0]);
    // }

    filesUrls.forEach((fileUrl) => {
      utils.loadJson(fileUrl, (json) => {
        files.push({
          name: fileUrl,
          data: json
        });
        if (files.length === filesUrls.length) {
          callback();
        }
      })
    });
  }

  //-----------------------------------------

  build = (callback) => {
    loadTestFiles(() => {
      processFiles(0, () => {
        callback();
      })
    })
  }

  return {
    build: build
  }
}