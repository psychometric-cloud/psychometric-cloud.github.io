qBank = [];
selectedQuestions = [];

/*-------------------------------------------*/

function filterData(filterBy, callback) {
  $(".filter-panel").addClass("show");

  dataFilter.filter(filterBy, (filteredData) => {
    callback(filteredData);
  })
}

/*-------------------------------------------*/

function startQuiz() {
  $(".questions-panel").addClass("show");
  timer.start();
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

  startDlg.set((data) => {
    filterData(data, (res) => {
      console.log(res);
      startQuiz();
    });
  })
}

//-----------------------------------------------------

showLoader = (show) => {
  $(".loader").toggleClass("show", show);
  $(".start-btn").toggleClass("show", !show);
}

//-----------------------------------------------------

initProviders = () => {
  utils = new utils();
  fileValidator = new FileValidator();
  questionBuilder = new QuestionBuilder();
  timer = new Timer();
  dataFilter = new DataFilter();
  dataBuilder = new DataBuilder();
  startDlg = new StartDialog();
}

//-----------------------------------------------------

$(document).ready(() => {
  showLoader(true);
  initProviders();

  dataBuilder.build(() => {
    onInit();
    showLoader(false);
  })
});
