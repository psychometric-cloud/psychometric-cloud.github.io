function TestHistory() {

  function add(subject, test) {
    let tests = get(subject);

    if (tests.length > 10) {
      tests.pop();
    };

    tests.push({});
    localStorage.setItem("latest-tests", JSON.stringify(tests));
  }

  //---------------------------------------

  function get(subject) {
    let tests = JSON.parse(localStorage.getItem("latest-tests") || '{}');
    return tests[subject] || [];
  }

  return {
    add: add,
    get: get
  }
}
