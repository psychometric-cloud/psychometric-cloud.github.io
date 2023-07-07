function DataBuilder() {

  let files = [];
  let chapterArr = Object.values(eChapters);

  let filesUrls = [
    "https://psychometric-cloud.github.io/assets/questions/MALLO/2023/sp/data.json",
    "https://psychometric-cloud.github.io/assets/questions/MALLO/2022/a/data.json",
    "https://psychometric-cloud.github.io/assets/questions/MALLO/2022/sp/data.json",
    "https://psychometric-cloud.github.io/assets/questions/MALLO/2022/su/data.json",
    "https://psychometric-cloud.github.io/assets/questions/MALLO/2022/w/data.json",
    "https://psychometric-cloud.github.io/assets/questions/MALLO/2021/a/data.json",
    "https://psychometric-cloud.github.io/assets/questions/MALLO/2021/w/data.json",
    "https://psychometric-cloud.github.io/assets/questions/MALLO/2021/su/data.json",
    "https://psychometric-cloud.github.io/assets/questions/MALLO/2021/sp/data.json",
    "https://psychometric-cloud.github.io/assets/questions/MALLO/2020/a/data.json",
    "https://psychometric-cloud.github.io/assets/questions/MALLO/2020/w/data.json",
    "https://psychometric-cloud.github.io/assets/questions/MALLO/2020/su/data.json",
    "https://psychometric-cloud.github.io/assets/questions/MALLO/2020/sp/data.json",
    "https://psychometric-cloud.github.io/assets/questions/MALLO/2019/a/data.json",
    "https://psychometric-cloud.github.io/assets/questions/MALLO/2019/sp/data.json",
    "https://psychometric-cloud.github.io/assets/questions/MALLO/2019/su/data.json",
    "https://psychometric-cloud.github.io/assets/questions/MALLO/2019/w/data.json",
    "https://psychometric-cloud.github.io/assets/questions/MALLO/2018/a/data.json",
    "https://psychometric-cloud.github.io/assets/questions/MALLO/2018/sp/data.json",
    "https://psychometric-cloud.github.io/assets/questions/MALLO/2018/su/data.json",
    "https://psychometric-cloud.github.io/assets/questions/MALLO/2018/w/data.json",
    "https://psychometric-cloud.github.io/assets/questions/MALLO/2017/dec/data.json",
    "https://psychometric-cloud.github.io/assets/questions/MALLO/2017/sep/data.json",
    "https://psychometric-cloud.github.io/assets/questions/MALLO/2017/feb/data.json",
    "https://psychometric-cloud.github.io/assets/questions/MALLO/2017/apr/data.json",
    "https://psychometric-cloud.github.io/assets/questions/MALLO/2017/jul/data.json",
    "https://psychometric-cloud.github.io/assets/questions/MALLO/2016/dec/data.json",
    "https://psychometric-cloud.github.io/assets/questions/MALLO/2016/apr/data.json",
    "https://psychometric-cloud.github.io/assets/questions/MALLO/2016/sep/data.json",
    "https://psychometric-cloud.github.io/assets/questions/MALLO/2016/jul/data.json",
    "https://psychometric-cloud.github.io/assets/questions/MALLO/2016/feb/data.json",
    "https://psychometric-cloud.github.io/assets/questions/MALLO/2015/dec/data.json"
  ];

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

  const build = (callback) => {
    filesUrls = _.shuffle(filesUrls);

    loadTestFiles(() => {
      processFiles(0, () => {
        if (dataValidator.validate()) {
          dataStats.writeStat(files);
          callback();
        }
      })
    })
  }

  return {
    build: build
  }
}