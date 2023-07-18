qBank = [];
selectedQuestions = [];

/*-------------------------------------------*/

function renderUI(filterBy, filteredData) {

  $(".history-btn").removeClass("show");

  if (filterBy.actionType === eActionType.test) {
    testComponent.show(filteredData, filterBy.selectedSubject);
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
  $(".start-panel").removeClass("show");
  startDlg.show(true);
}

//---------------------------------------------

function onHistoryClick() {
  historyDlg.show();
}

/*-------------------------------------------*/

function resetMainUI() {
  testTimer.end();

  $(".start-panel").addClass("show");
  $(".test-panel").removeClass("show");
  $(".test-panel .report").removeClass("show");
  $(".audit-panel").removeClass("show");
  $(".practice-panel").removeClass("show");
  $(".cloud-tester-panel").removeClass("show");
  $(".test-questions").removeClass("show");
  $(".btn-check-test").removeClass("show");
  $(".history-btn").addClass("show");

  startDlg.reset();
}

/*-------------------------------------------*/

function registerEvents() {
  $(".start-panel .start-btn").on("click", () => {
    showStartDlg();
  });
  $(".logo").on("click", () => {
    resetMainUI();
  });
  $(".history-btn").on("click", () => {
    onHistoryClick();
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
  dataValidator = new DataValidator();
  questionBuilder = new QuestionBuilder();
  srcBuilder = new SrcBuilder();
  dataStats = new DataStats();
  labelsManager = new LabelsManager();
  testDataBuilder = new TestDataBuilder();
  testHistory = new TestHistory();
  testStat = new TestStat();
  testTimer = new TestTimer();
  textsHandler = new TextsHandler();
  dataFilter = new DataFilter();
  dataBuilder = new DataBuilder();
  testComponent = new TestComponent();
  reportComponent = new ReportComponent();
  auditComponent = new AuditComponent();
  practiceComponent = new PracticeComponent();
  startDlg = new StartDialog();
  moreDlg = new MoreDialog();
  historyDlg = new HistoryDialog();
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
    $(".history-btn").toggleClass("show", true);
  })
});
