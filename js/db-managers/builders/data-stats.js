function DataStats() {

  const incBy = (i) => {
    if (qBank[i].isFirst) {
      return qBank[i].members.length + 1;
    }
    return 1;
  }

  const writeStat = (files) => {
    let math = 0;
    let en = 0;
    let he = 0;

    for (let i = 0; i < qBank.length; i++) {
      let chapter = qBank[i].chapter;

      if (chapter === eChapters.math1 || chapter === eChapters.math2) {
        math += incBy(i);
      }
      else if (chapter === eChapters.he1 || chapter === eChapters.he2) {
        he += incBy(i);
      }
      else if (chapter === eChapters.en1 || chapter === eChapters.en2) {
        en += incBy(i);
      }
    }
    console.log(`${files.length} files loaded. Total questions:${qBank.length}, Math:${math}, HE:${he}, EN:${en}`);
  }

  return {
    writeStat
  }
}