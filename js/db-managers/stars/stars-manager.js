function StarsManager() {

  let stars = [];

  function isQuestionEqual(q1, q2) {
    let res = q1.year === q2.year &&
      q1.provider === q2.provider &&
      q1.season === q2.season &&
      q1.chapter === q2.chapter &&
      q1.qNum === q2.qNum;

    return res;
  }

  //-----------------------------------------

  const loadStars = () => {
    stars = JSON.parse(localStorage.getItem("q-stars")) || [];
  }

  //-----------------------------------------

  const toggleStar = (question) => {

    if (!question.isStar) {
      addStar(question);
    } else {
      removeStar(question);
    }
  }

  //-----------------------------------------

  const addStar = (question) => {
    question.isStar = true;
    stars.push(question)
    localStorage.setItem("q-stars", JSON.stringify(stars));
  }

  //-----------------------------------------

  const removeStar = (question) => {

    question.isStar = false;
    stars = stars.filter((star) => {
      return !isQuestionEqual(star, question);
    });
    localStorage.setItem("q-stars", JSON.stringify(stars));
  }

  //-----------------------------------------

  const isStar = (question) => {

    for (let i = 0; i < stars.length; i++) {
      if (isQuestionEqual(stars[i], question)) {
        return true;
      }
    }
    return false;
  }

  loadStars();

  return {
    isStar,
    addStar,
    removeStar,
    toggleStar
  }
}