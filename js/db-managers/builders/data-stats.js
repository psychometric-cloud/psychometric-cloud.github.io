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

  setStatsByChapters = (stats, subChapters) => {
    for (let i = 0; i < qBank.length; i++) {

      subChapters.forEach(sub => {
        if (qBank[i].qAreas.includes(sub)) {
          inc(stats, sub, qBank[i])
        }
      });
    }
  }


  //---------------------------------------------------

  setTotal = (stats, subject, mainAreas) => {
    let total = 0;

    mainAreas.forEach(area => {
      total += stats[area] || 0;
    });

    stats[`${subject}_all`] = total;
    console.log(`${subject}_all`, total)
  }

  //-----------------------------------------------------

  const set = () => {
    setStatsByChapters(stats.math, [...MATH_MAIN_AREAS, ...MATH_SUB_AREAS]);
    setTotal(stats.math, eSubject.math, MATH_MAIN_AREAS);

    setStatsByChapters(stats.he, HE_AREAS);
    setTotal(stats.he, eSubject.he, HE_AREAS);

    setStatsByChapters(stats.en, EN_MAIN_AREAS);
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
