qBank = [];
selectedQuestions = [];

/*-------------------------------------------*/

function startQuiz(data) {
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
  $(".start-btn").on("click", () => {
    showStartDlg();
  });
}

//-----------------------------------------------------

function onInit() {
  registerEvents();

  console.log(qBank.length);
  startDlg.set((data) => {
    startQuiz(data);
  })
}

//-----------------------------------------------------

showLoader = (show) => {
  $(".loader-wrap").toggleClass("show", show);
  $(".start-panel").toggleClass("show", !show);
}

//-----------------------------------------------------

initProviders = () => {
  utils = new utils();
  fileValidator = new FileValidator();
  questionBuilder = new QuestionBuilder();
  timer = new Timer();
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
