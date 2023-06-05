function TestComponent() {


  function show(subject, filteredData) {

    let test = testDataBuilder.build(subject, filteredData);
    console.log(test);

    $(".test-panel").addClass("show");
  }

  return {
    show: show
  }
}
