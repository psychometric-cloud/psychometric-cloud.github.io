function CloudTesterComponent() {

  itemsArr = [];
  currItem = 0;
  selectedOption = "questions";

  function getPublisher(qData) {
    return qData.publisher.substring(0, qData.publisher.length - 1).toUpperCase();
  }

  //-------------------------------------

  function getSubject(qData) {
    return qData.chapter.substring(0, qData.chapter.length - 1).toLowerCase();
  }

  //-------------------------------------

  function getName(qData) {
    return `${qData.chapter.slice(-1)}_${qData.qNum}`;
  }

  //-------------------------------------

  function getSeason(qData) {

    if (qData.season === "winter") {
      return sSeasons.w;
    }
    if (qData.season === "summer") {
      return sSeasons.su;
    }
    if (qData.season === "spring") {
      return sSeasons.sp;
    }
    if (qData.season === "autumn") {
      return sSeasons.a;
    }
  }

  //-------------------------------------

  function setTitle() {

    qData = itemsArr[currItem];

    if (qData) {
      let title = `${getPublisher(qData).toLowerCase()} ${qData.year} ${qData.season} ${getName(qData)}`;
      $(".cloud-tester-panel .main .col2 .title").text(title);
    }
  }

  //-------------------------------------

  function setItemImg() {

    qData = itemsArr[currItem];

    if (qData) {
      let src = `./assets/questions/${getPublisher(qData)}/${qData.year}/${getSeason(qData)}/${selectedOption}/${getSubject(qData)}/${getName(qData)}.png`;
      $(".cloud-tester-panel .main .col2 img").attr('src', src);
    }
  }

  //-------------------------------------

  function showItem() {
    setTitle();
    setItemImg();
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

  function show(_filteredData) {
    currItem = 0;
    itemsArr = _filteredData;

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
  }

  init();

  return {
    show: show
  }
}
