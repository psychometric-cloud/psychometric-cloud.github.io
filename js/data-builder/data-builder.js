function DataBuilder() {

  utils = new utils();
  fileValidator = new FileValidator();

  tests = [];
  chapterArr = Object.values(eChapters);

  filesUrls = [
    "https://psychometric-cloud.github.io/assets/questions/MALLO/2022/a/data.json",
    "https://psychometric-cloud.github.io/assets/questions/MALLO/2022/sp/data.json",
    "https://psychometric-cloud.github.io/assets/questions/MALLO/2022/su/data.json",
    "https://psychometric-cloud.github.io/assets/questions/MALLO/2022/a/data.json"
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

  processFiles = (fileIndex, cb) => {
    let file = files[fileIndex];

    setTimeout(() => {
      processFile(file);

      if (fileIndex < files.length - 1) {
        processFiles(fileIndex + 1, cb)
      } else {
        cb();
      }
    }, 250);
  }

  //-----------------------------------------

  loadTestFiles = () => {

    // for(let i=0;i<30;i++){ //test only!!!!!!!!!
    //   filesUrls.push(filesUrls[0]);
    // }

    filesUrls.forEach((fileUrl) => {
      utils.loadJson(fileUrl, (json) => {
        files.push({
          name: fileUrl,
          data: json
        });
        if (files.length === filesUrls.length) {
          cb();
        }
      })
    });
  }

  //-----------------------------------------

  build = (cb) => {
    debugger;
    loadTestFiles(() => {
      processFiles(0, () => {
        cb();
      })
    })
  }

  return {
    build: build
  }
}