qBank = [];
selectedQuestions = [];

/*-------------------------------------------*/

function renderUI(filterBy, filteredData) {

  if (filterBy.actionType === eActionType.test) {
    testComponent.show(filterBy.selectedSubject, filteredData);
  } else {
    practiceComponent.show(filteredData, "questions");
  }
}

/*-------------------------------------------*/

function filterData(filterBy, callback) {
  showLoader(true);

  dataFilter.filter(filterBy, (filteredData) => {
    showLoader(false);
    callback(filteredData);
  })
}

/*-------------------------------------------*/

function showStartDlg() {
  $(".start-panel").hide();
  startDlg.show();
}

/*-------------------------------------------*/

function registerEvents() {
  $(".start-panel .start-btn").on("click", () => {
    showStartDlg();
  });
  $(".logo").on("click", () => {
    location.reload();
  });
}

//-----------------------------------------------------

function onInit() {
  registerEvents();

  cloudTesterDlg.init();

  startDlg.set((filterBy) => {
    filterData(filterBy, (res) => {
      renderUI(filterBy, res);
    });
  })
}

//-----------------------------------------------------

showLoader = (show) => {
  $(".loader").toggleClass("show", show);
}

//-----------------------------------------------------

initProviders = () => {
  utils = new utils();
  fileValidator = new FileValidator();
  questionBuilder = new QuestionBuilder();
  timer = new Timer();
  srcBuilder = new SrcBuilder();
  testDataBuilder = new TestDataBuilder();
  testHistory = new TestHistory();
  textsHandler = new TextsHandler();
  dataFilter = new DataFilter();
  dataBuilder = new DataBuilder();
  testComponent = new TestComponent();
  practiceComponent = new PracticeComponent();
  startDlg = new StartDialog();
  moreDlg = new MoreDialog();
  cloudTesterDlg = new CloudTesterDialog();
  cloudTesterComponent = new CloudTesterComponent();
}

//-----------------------------------------------------

$(document).ready(() => {
  showLoader(true);
  initProviders();

  dataBuilder.build(() => {
    onInit();
    showLoader(false);
    $(".start-btn").toggleClass("show", true);
  })
});
