function TestStat() {

  function getStat(test) {
    let correct = 0;

    for (let i = 0; i < test.length; i++) {
      if (test[i].aNum === test[i].proposedAnswer) {
        correct += 1;
      }
    }
    return {
      correct: correct,
      total: test.length,
      percentage: parseInt((correct / test.length) * 100)
    };
  }

  return {
    getStat
  }
}
