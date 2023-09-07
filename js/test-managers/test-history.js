function TestHistory() {

  function add(test, subject, stat) {
    let tests = get(subject);

    if (tests.length > 25) {
      tests.pop();
    };

    tests.push({
      date: Date.now(),
      test: test,
      stat: stat,
      subject: subject
    });

    localStorage.setItem(`${subject}-tests`, JSON.stringify(tests));
  }

  //---------------------------------------

  function getLatest() {
    let math = get('math');
    let he = get('he');
    let en = get('en');

    let union = math.concat(he).concat(en);

    union.sort((a, b) => {
      if (a.date > b.date) {
        return -1;
      }
      if (a.date < b.date) {
        return 1;
      }
      return 0;
    });

    return union;
  }

  //---------------------------------------

  function getTests(subject) {
    let union = [];
    let tests = get(subject);

    tests.forEach((test) => {
      union = union.concat(test.test);
    });

    return union;
  }

  //---------------------------------------

  function get(subject) {
    let tests = JSON.parse(localStorage.getItem(`${subject}-tests`));
    return tests || [];
  }

  return {
    add: add,
    get: get,
    getTests: getTests,
    getLatest, getLatest
  }
}
