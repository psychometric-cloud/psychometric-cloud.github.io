function TestHistory() {

  function add(test, subject, stat) {
    let tests = get(subject);

    if (tests.length > 10) {
      tests.pop();
    };

    tests.push({
      date: Date.now(),
      test: test,
      stat: stat
    });

    localStorage.setItem(`${subject}-tests`, JSON.stringify(tests));
  }

  //---------------------------------------

  function get(subject) {
    let tests = JSON.parse(localStorage.getItem(`${subject}-tests`) || '{}');
    return tests[subject] || [];
  }

  return {
    add: add,
    get: get
  }
}
