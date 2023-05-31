qBank = [];
selectedQuestions = [];

/*-------------------------------------------*/

function renderUI(actionType, filteredData) {
  console.log(filteredData);

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

  cloudTesterDlg.init();

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
  testComponent = new TestComponent();
  practiceComponent = new PracticeComponent();
  startDlg = new StartDialog();
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
