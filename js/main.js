selectedQuestions = [];
timer = new Timer();
startDlg = new StartDialog();
dataBuilder = new DataBuilder();

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

  startDlg.set((data) => {
    startQuiz(data);
  })
}

//-----------------------------------------------------

showLoader = (show) => {
  $(".loader-wrap").toggleClass("show", show);
}

//-----------------------------------------------------

$(document).ready(() => {
  //  showLoader(true);
  debugger;
  dataBuilder.build(() => {
    onInit();
    //    showLoader(false);
  })
});
