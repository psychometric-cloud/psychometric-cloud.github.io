function PracticeComponent() {

  let itemsArr = [];
  let currItem = 0;

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

    resetPanels();

    if (qData.isStandalone) {
      setMainPanel(qData);
    } else {
      setReadingBoxPanel(qData);
    }
  }

  //------------------------------------

  function resetPanels() {
    $(".practice-panel .main, .practice-panel .reading-box").removeClass("show");
    $(".practice-panel .main .question, .practice-panel .reading-box .question").addClass("show");
    $(".practice-panel .main .answer, .practice-panel .reading-box .answer").removeClass("show");
  }

  //------------------------------------

  function setMainPanel(qData) {
    $(".practice-panel .main").addClass("show");

    let title = srcBuilder.getTitle(qData);
    $(".practice-panel .main .col2 .title").text(title);

    let q_src = srcBuilder.build(qData, "questions");
    $(".practice-panel .main .question").attr('src', q_src);

    let a_src = srcBuilder.build(qData, "answers");
    $(".practice-panel .main .answer").attr('src', a_src);

    $('.practice-panel .q-labels .star').toggleClass("clicked", qData.labels.includes("star"));
    $('.practice-panel .q-labels .learn').toggleClass("clicked", qData.labels.includes("learn"));
  }

  //------------------------------------

  function setReadingBoxPanel(qData) {
    $(".practice-panel .reading-box").addClass("show");

    let title = srcBuilder.getTitle(qData);
    $(".practice-panel .reading-box .left .title").text(title);

    let q_src = srcBuilder.build(qData, "questions");
    $(".practice-panel .reading-box .left .question").attr('src', q_src);

    let a_src = srcBuilder.build(qData, "answers");
    $(".practice-panel .reading-box .left .answer").attr('src', a_src);

    let t_src = srcBuilder.build(qData, "questions", true);
    $(".practice-panel .reading-box .right .text").attr('src', t_src);

    setTimeout(() => {
      $(".practice-panel .text-wrap").css("max-height", $(".practice-panel .right").height());
    })
  }

  //------------------------------------

  function onNextPrevClick(step) {
    currItem += step;

    updateButtonsStatus();
    showItem();
  }

  //------------------------------------

  function onQueAnsBtnClick() {
    $(".practice-panel .main .qa-wrap .question").toggleClass("show");
    $(".practice-panel .main .qa-wrap .answer").toggleClass("show");
  }

  //------------------------------------

  function onReadingBoxClick() {
    $(".practice-panel .reading-box .qa-wrap .question").toggleClass("show");
    $(".practice-panel .reading-box .qa-wrap .answer").toggleClass("show");
  }

  //------------------------------------

  function updateButtonsStatus() {

    $(".practice-panel .btn-prev").toggleClass("disabled", currItem === 0)
    $(".practice-panel .btn-next").toggleClass("disabled", currItem === itemsArr.length - 1);
  }

  //---------------------------------------------

  function onLabelStarClicked() {
    labelsManager.toggleLabel(itemsArr[currItem], eQLabel.star);
    $('.practice-panel .q-labels .star').toggleClass("clicked");
  }

  //-------------------------------------

  function onLabelLearnMoreClicked() {
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
    $(".practice-panel .main .qa-wrap").click(() => {
      onQueAnsBtnClick();
    });
    $(".practice-panel .reading-box .left").click(() => {
      onReadingBoxClick();
    });
    $('.practice-panel .q-labels .star').click((e) => {
      onLabelStarClicked();
    });
    $('.practice-panel .q-labels .learn').click((e) => {
      onLabelLearnMoreClicked();
    });
  }

  init();

  return {
    show: show
  }
}
