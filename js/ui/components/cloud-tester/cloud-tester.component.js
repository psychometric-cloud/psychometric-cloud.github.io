function CloudTesterComponent() {

  let itemsArr = [];
  let currItem = 0;
  let selectedOption = "questions";


  //-------------------------------------

  function onMoreClick() {
    let qData = itemsArr[currItem];
    moreDlg.showText(qData);
  }

  //-------------------------------------

  function showItem() {
    let qData = itemsArr[currItem];

    if (qData) {
      let title = srcBuilder.getTitle(qData);
      $(".cloud-tester-panel .main .col2 .title").text(title);

      let src = srcBuilder.build(qData, selectedOption);
      $(".cloud-tester-panel .main .col2 .img").attr('src', src);

      $(".cloud-tester-panel .main .col2 .icon-chart").toggleClass('show', qData.qAreas[0] === "chart");
      $(".cloud-tester-panel .main .col2 .icon-txt").toggleClass('show', qData.qAreas[0] === "reading" && (qData.qAreas[1] !== "text2"));
      $(".cloud-tester-panel .main .col2 .icon-txt2").toggleClass('show', qData.qAreas[0] === "reading" && qData.qAreas[1] === "text2");
    }
  }

  //------------------------------------

  function onNextPrevClick(step) {
    currItem += step;

    updateButtonsStatus();
    showItem();
  }

  //------------------------------------

  function onOptionClick(option) {

    $(".cloud-tester-panel .option").removeClass("active");
    $(`.cloud-tester-panel .option.${option}`).addClass("active");

    selectedOption = option;
    show(itemsArr);
  }

  //------------------------------------

  function updateButtonsStatus() {

    $(".cloud-tester-panel .btn-prev").toggleClass("disabled", currItem === 0)
    $(".cloud-tester-panel .btn-next").toggleClass("disabled", currItem === itemsArr.length - 1);
  }

  //-------------------------------------

  function show(_filteredData, _selectedOption) {

    currItem = 0;
    itemsArr = _filteredData;
    selectedOption = _selectedOption;

    updateButtonsStatus();
    showItem();

    $(".cloud-tester-panel").addClass("show");
  }

  //-------------------------------------

  function init() {
    $(".cloud-tester-panel .btn-prev").click(() => {
      onNextPrevClick(-1);
    });
    $(".cloud-tester-panel .btn-next").click(() => {
      onNextPrevClick(1);
    });
    $(".cloud-tester-panel .option.questions").click(() => {
      onOptionClick("questions");
    });
    $(".cloud-tester-panel .option.answers").click(() => {
      onOptionClick("answers");
    });
    $(".cloud-tester-panel .icon-chart, .cloud-tester-panel .icon-txt, .cloud-tester-panel .icon-txt2").click(() => {
      onMoreClick();
    });
  }

  init();

  return {
    show: show
  }
}
