function DataStats() {

  let stats = {
    "math": {},
    "en": {},
    "he": {}
  };

  //---------------------------------------------------

  const inc = (stats, sub, q) => {

    stats[sub] = stats[sub] || 0;

    if (q.isFirst) {
      stats[sub] = stats[sub] + q.members.length + 1;
    } else {
      stats[sub] = stats[sub] + 1;
    }
  }

  //---------------------------------------------------

  setStatsByChapters = (stats, chapters, subChapters) => {
    for (let i = 0; i < qBank.length; i++) {
      let chapter = qBank[i].chapter;

      if (chapters.includes(chapter)) {
        subChapters.forEach(sub => {
          if (qBank[i].qAreas.includes(sub)) {
            inc(stats, sub, qBank[i])
          }
        });
      }
    }
  }


  //---------------------------------------------------

  setTotal = (stats, subject, mainAreas) => {
    let total = 0;

    mainAreas.forEach(area => {
      total += stats[area];
    });

    stats[`${subject}_all`] = total;
  }

  //-----------------------------------------------------

  const set = () => {
    setStatsByChapters(stats.math, [eChapters.math2, eChapters.math1], [...MATH_MAIN_AREAS, ...MATH_SUB_AREAS]);
    setTotal(stats.math, eSubject.math, MATH_MAIN_AREAS);

    setStatsByChapters(stats.he, [eChapters.he1, eChapters.he2], HE_AREAS);
    setTotal(stats.he, eSubject.he, HE_AREAS);

    setStatsByChapters(stats.en, [eChapters.en1, eChapters.en2], EN_MAIN_AREAS);
    setTotal(stats.en, eSubject.en, EN_MAIN_AREAS);

    console.log(stats);
  }

  //-----------------------------------------------------

  const get = () => {
    return stats;
  }

  return {
    get,
    set
  }
}
