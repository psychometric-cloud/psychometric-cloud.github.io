qBank = [];
selectedQuestions = [];

/*-------------------------------------------*/

function renderUI(actionType, filteredData) {
  if (actionType === eActionType.test) {
    testComponent.show(filteredData);
  } else {
    practiceComponent.show(filteredData);
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
}

//-----------------------------------------------------

function onInit() {
  registerEvents();

  startDlg.set((filterBy) => {
    filterData(filterBy, (res) => {
      renderUI(filterBy.actionType, res);
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
  testBuilder = new TestBuilder();
  dataFilter = new DataFilter();
  dataBuilder = new DataBuilder();
  startDlg = new StartDialog();
  testComponent = new TestComponent();
  practiceComponent = new PracticeComponent();
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
