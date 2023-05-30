function TestComponent() {


  function show(filteredData) {

    let test = testBuilder.build(filteredData);
    console.log(test);

    $(".test-panel").addClass("show");
  }

  return {
    show: show
  }
}
