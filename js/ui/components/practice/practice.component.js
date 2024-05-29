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
    $(".practice-panel .main, .practice-panel .reading-box").removeClass("answer");
  }

  //------------------------------------

  function setMainPanel(qData) {
    $(".practice-panel .main").addClass("show");

    let title = srcBuilder.getTitle(qData);
    $(".practice-panel .main .col2 .title").text(title);

    let q_src = srcBuilder.imageUrl(qData, "questions");
    $(".practice-panel .main .question").attr('src', q_src);

    let a_src = srcBuilder.imageUrl(qData, "answers");
    $(".practice-panel .main .answer").attr('src', a_src);

    let showTags = qData.chapter.startsWith('math') && !qData.qAreas.includes('chart');
    $(".tags-btn").toggleClass("show", showTags);
  }

  //------------------------------------

  function setReadingBoxPanel(qData) {
    $(".practice-panel .reading-box").addClass("show");

    let title = srcBuilder.getTitle(qData);
    $(".practice-panel .reading-box .left .title").text(title);

    let q_src = srcBuilder.imageUrl(qData, "questions");
    $(".practice-panel .reading-box .left .question").attr('src', q_src);

    let a_src = srcBuilder.imageUrl(qData, "answers");
    $(".practice-panel .reading-box .left .answer").attr('src', a_src);

    let t_src = srcBuilder.textUrl(qData);
    $(".practice-panel .reading-box .right .text").attr('src', t_src);

    let isEnglish = (qData.chapter === "en1" || qData.chapter === "en2");
    $(".practice-panel .reading-box").toggleClass("en", isEnglish);

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
    $(".practice-panel .main").toggleClass("answer");
  }

  //------------------------------------

  function onReadingBoxClick() {
    $(".practice-panel .reading-box").toggleClass("answer");
  }

  //------------------------------------

  function updateButtonsStatus() {

    $(".practice-panel .btn-prev").toggleClass("disabled", currItem === 0)
    $(".practice-panel .btn-next").toggleClass("disabled", currItem === itemsArr.length - 1);
  }

  //---------------------------------------------

  function openTagsDialog() {
    tagsDialog.open(itemsArr[currItem]);
  }

  //-------------------------------------

  function show(filterBy) {

    currItem = 0;
    filterBy.selectedPublishers = ["MALLO", "nivr", "800", "psycho", "talmor", "kidim"];

    dataFilter.filter(filterBy, (filteredData) => {
      setItemsArr(filteredData);
      updateButtonsStatus();
      showItem();

      $(".practice-panel").addClass("show");
      $(".toggle-star").addClass("show");
    })
  }

  //-------------------------------------

  function init() {
    $(".practice-panel .btn-prev").click(() => {
      onNextPrevClick(-1);
    });
    $(".practice-panel .btn-next").click(() => {
      onNextPrevClick(1);
    });
    $(".practice-panel .main .col2").click(() => {
      onQueAnsBtnClick();
    });
    $(".practice-panel .reading-box .left").click(() => {
      onReadingBoxClick();
    });
    $('.practice-panel .tags-btn').click((e) => {
      openTagsDialog();
    });

  }

  init();

  return {
    show: show
  }
}
