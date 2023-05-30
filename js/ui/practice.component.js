function PracticeComponent() {

  function show(filteredData) {
    console.log(filteredData);
    $(".practice-panel").addClass("show");
  }
  return {
    show: show
  }
}
