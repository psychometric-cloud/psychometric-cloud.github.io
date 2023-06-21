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


  ];


  //-----------------------------------------

  const writeStat = () => {
    let math = 0;
    let en = 0;
    let he = 0;

    for (let i = 0; i < qBank.length; i++) {
      let chapter = qBank[i].chapter;

      if (chapter === eChapters.math1 || chapter === eChapters.math2) {
        math += 1;
      }
      else if (chapter === eChapters.he1 || chapter === eChapters.he2) {
        he += 1;
      }
      else if (chapter === eChapters.en1 || chapter === eChapters.en2) {
        en += 1;
      }
    }
    console.log(`Total questions:${qBank.length}, Math:${math}, HE:${he}, EN:${en}`);
  }

  //-----------------------------------------

  const processFile = (file) => {
    if (fileValidator.validate(file.name, file.data)) {
      console.log(file.name)
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
    }, 250);
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
    loadTestFiles(() => {
      processFiles(0, () => {
        writeStat();
        callback();
      })
    })
  }

  return {
    build: build
  }
}