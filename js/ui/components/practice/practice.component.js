function PracticeComponent() {

  let itemsArr = [];
  let currItem = 0;
  let selectedOption = "questions";


  //-------------------------------------

  function onMoreClick(type) {
    let qData = itemsArr[currItem];
    moreDlg.showText(qData);
  }

  //-------------------------------------

  function setItemsArr(filteredData) {
    itemsArr = [];

    for (let i = 0; i < filteredData.length; i++) {
      itemsArr.push(filteredData[i]);

      if (_.has(filteredData[i], "members")) {
        for (let j = 0; j < filteredData[i].members.length; j++) {
          itemsArr.push(filteredData[i].members[j]);
        }
      }
    }
  }

  //-------------------------------------

  function showItem() {
    let qData = itemsArr[currItem];

    if (qData) {
      let title = srcBuilder.getTitle(qData);
      $(".practice-panel .main .col2 .title").text(title);

      let src = srcBuilder.build(qData, selectedOption);
      $(".practice-panel .main .col2 .img").attr('src', src);

      $('.practice-panel .q-labels .star').toggleClass("clicked", qData.labels.includes("star"));
      $('.practice-panel .q-labels .learn').toggleClass("clicked", qData.labels.includes("learn"));

      $(".practice-panel .main .col2 .icon-chart").toggleClass('show', qData.qAreas[0] === "chart");
      $(".practice-panel .main .col2 .icon-txt").toggleClass('show', qData.qAreas[0] === "reading" && (qData.qAreas[1] !== "text2"));
      $(".practice-panel .main .col2 .icon-txt2").toggleClass('show', qData.qAreas[0] === "reading" && qData.qAreas[1] === "text2");
    }
  }

  //------------------------------------

  function onNextPrevClick(step) {
    currItem += step;

    updateButtonsStatus();
    showItem();
  }

  //------------------------------------

  function onAnsBtnClick(type) {
    let qData = itemsArr[currItem];
    moreDlg.showAnswer(qData);
  }

  //------------------------------------

  function updateButtonsStatus() {

    $(".practice-panel .btn-prev").toggleClass("disabled", currItem === 0)
    $(".practice-panel .btn-next").toggleClass("disabled", currItem === itemsArr.length - 1);
  }

  //---------------------------------------------

  function onBtnStarClicked() {
    labelsManager.toggleLabel(itemsArr[currItem], eQLabel.star);
    $('.practice-panel .q-labels .star').toggleClass("clicked");
  }

  //-------------------------------------

  function onBtnLearnMoreClicked() {
    labelsManager.toggleLabel(itemsArr[currItem], eQLabel.latter);
    $('.practice-panel .q-labels .learn').toggleClass("clicked");
  }

  //-------------------------------------

  function show(_filteredData, _selectedOption) {

    currItem = 0;
    selectedOption = _selectedOption;

    setItemsArr(_filteredData);
    updateButtonsStatus();
    showItem();

    $(".practice-panel").addClass("show");
    $(".toggle-star").addClass("show");
  }

  //-------------------------------------

  function init() {
    $(".practice-panel .btn-prev").click(() => {
      onNextPrevClick(-1);
    });
    $(".practice-panel .btn-next").click(() => {
      onNextPrevClick(1);
    });
    $(".practice-panel .img-wrap img").click(() => {
      onAnsBtnClick();
    });
    $(".practice-panel .icon-chart, .practice-panel .icon-txt, .practice-panel .icon-txt2").click(() => {
      onMoreClick();
    });
    $('.practice-panel .q-labels .star').click((e) => {
      onBtnStarClicked();
    });
    $('.practice-panel .q-labels .learn').click((e) => {
      onBtnLearnMoreClicked();
    });
  }

  init();

  return {
    show: show
  }
}
