const eSubject = {
  math: "math",
  he: "he",
  en: "en"
};

function StartDialog() {

  let selectedAreas = [];
  let btnExample = false;

  function show(show) {
    reset();
    $(".start-dlg-wrap").toggleClass("active", show);
  }

  /*-------------------------------------------*/

  function onTestClick(onFinish) {
    $(".start-dlg-wrap").removeClass("active");

    onFinish({
      actionType: eActionType.test,
      selectedSubject: "",
      selectedAreas: [],
      selectedLabels: []
    });
  }

  /*-------------------------------------------*/

  function onMathQuizClick() {
    $(".dlg-start .actions").removeClass("show");
    $(".dlg-start .lite-quiz-panel").addClass("show");
  }

  /*-------------------------------------------*/

  function onLevelQuizClick(level, onFinish) {
    $(".start-dlg-wrap").removeClass("active");

    onFinish({
      actionType: eActionType.quiz,
      quizType: 1,
      level: level,
      selectedSubject: "",
      selectedAreas: []
    });
  }


  /*-------------------------------------------*/

  function onQuizClick(quizType, onFinish) {
    $(".start-dlg-wrap").removeClass("active");

    onFinish({
      actionType: eActionType.quiz,
      quizType: quizType,
      selectedSubject: "",
      selectedAreas: []
    });
  }

  /*-------------------------------------------*/

  function onDemandClick(onFinish) {
    $(".start-dlg-wrap").removeClass("active");

    onFinish({
      example:btnExample,
      actionType: eActionType.onDemand,
      selectedSubject: btnExample ? null: [eSubject.math],
      selectedAreas: btnExample ? []: selectedAreas
    });
  }

  //--------------------------------------------

  function onBtnOnDemandClicked() {
    $(".dlg-start .init-panel").hide();
    $(".area.math").addClass("active");
  }

  //--------------------------------------------

  function onSelectGroupClicked(e) {
    $(e.target).closest(".select-group").find(".body").toggleClass("open");
  }

  //--------------------------------------------

  function onAreaSelectAllClicked(type) {

    if ($(`.area.${type} .select-all`).prop('checked')) {
      $(`.area.${type} .select-item`).each(function () {
        this.checked = true;
      });
    } else {
      $(`.area.${type} .select-item`).each(function () {
        this.checked = false;
      });
    }

    markSelectedArea(type);
    checkButtons();
  }

  //--------------------------------------------

  function onAreaSelectItemClicked(e, type) {

    if ($(e.target).hasClass("main")) {
      let isChecked = $(e.target).prop('checked');

      $(e.target).closest(".select-group").find(".select-item.sub").each(function () {
        this.checked = isChecked;
      });
    }

    let group = $(e.target).closest(".select-group");
    let allAreaChecked = group.find(".select-item.sub:checked").length === group.find(".select-item.sub").length;
    group.find(".select-item.main").prop('checked', allAreaChecked);

    markSelectedArea(type);
    checkButtons();
  }

  //--------------------------------------------

  function markSelectedArea(type) {
    selectedAreas = [];

    $(`.area.${type} .select-item`).each(function () {
      if (this.checked) {
        if (this.value === "texts") {
          selectedAreas = ["reading", "text1", "text2"];
        }
        selectedAreas.push(this.value);
      }
    });
    checkButtons();
  }

  //--------------------------------------------

  function checkButtons() {
    $(".btn-go").toggleClass("active", selectedAreas.length > 0 || btnExample);
  }

  //---------------------------------------------

  function reset() {
    currStep = 0;
    selectedLabels = [];

    $(".start-dlg-wrap").removeClass("active");
    $(".start-dlg-wrap .active").removeClass("active");
    $(".dlg-start .init-panel").show();

    $(".step2").addClass("active");
    $(".btn-next").addClass("active");
    $(".btn-prev").removeClass("hide");
    $(".btn-go").removeClass("disable");
    $('.start-dlg-wrap .labels-wrap').addClass("disabled");
    $('.start-dlg-wrap .toggle-lbl input').prop('checked', false);
    $('.start-dlg-wrap .labels-wrap .lbl').removeClass('clicked');

    $(".dlg-start .actions").removeClass("show").addClass("show");
    $(".dlg-start .lite-quiz-panel").removeClass("show");

    $(".select-group").find(".body").removeClass("open");
    checkButtons();

    setStats();
  }
  
  //---------------------------------------------

  function onBtnExampleClicked(){
    btnExample = !btnExample;
      $('.dlg-start .btn-example').toggleClass("checked", btnExample);
      checkButtons();
  }

  //---------------------------------------------

  function getStat(key) {
    let stats = dataStats.get();

    if (isNaN(stats.math[key]))
      return "0";

    return stats.math[key];
  }

  //---------------------------------------------

  function setStats() {
    $(".stat.math-all").text(getStat("math_all"));
    $(".stat.chart").text(getStat("chart"));
    $(".stat.geo").text(getStat("geo"));
    $(".stat.tri").text(getStat("tri"));
    $(".stat.poly").text(getStat("poly"));
    $(".stat.circle").text(getStat("circle"));
    $(".stat.third").text(getStat("third"));
    $(".stat.perimeter").text(getStat("perimeter"));
    $(".stat.cube").text(getStat("cube"));
    $(".stat.area").text(getStat("area"));
    $(".stat.alg").text(getStat("alg"));
    $(".stat.eq").text(getStat("eq"));
    $(".stat.expression").text(getStat("expression"));
    $(".stat.percent").text(getStat("percent"));
    $(".stat.fractions").text(getStat("fractions"));
    $(".stat.exponent").text(getStat("exponent"));
    $(".stat.oddEven").text(getStat("oddEven"));
    $(".stat.prime").text(getStat("prime"));
    $(".stat.newOp").text(getStat("newOp"));
    $(".stat.letters").text(getStat("letters"));
    $(".stat.avg").text(getStat("avg"));
    $(".stat.inequality").text(getStat("inequality"));
    $(".stat.dividers").text(getStat("dividers"));
    $(".stat.factorial").text(getStat("factorial"));
    $(".stat.abs").text(getStat("abs"));
    $(".stat.series").text(getStat("series"));
    $(".stat.axis").text(getStat("axis"));
    $(".stat.prb").text(getStat("prb"));
    $(".stat.relations").text(getStat("relations"));
    $(".stat.comb").text(getStat("comb"));
    $(".stat.probability").text(getStat("probability"));
    $(".stat.supply").text(getStat("supply"));
    $(".stat.movement").text(getStat("movement"));
    $(".stat.num").text(getStat("num"));
    $(".stat.seqNum").text(getStat("seqNum"));
  }

  //---------------------------------------------

  function registerEvents(onFinish) {
    $(".dlg-start .btn-prev").on("click", () => {
      onPrevNextClick(-1);
    });
    $(".dlg-start .btn-next").on("click", () => {
      onPrevNextClick(1);
    });
    $(".dlg-start .btn-go").on("click", () => {
      onDemandClick(onFinish);
    });

    $('.area.math .select-group .header .toggle-btn').click((e) => {
      onSelectGroupClicked(e, eSubject.math);
    });
    $('.area.math .select-all').click((e) => {
      onAreaSelectAllClicked(eSubject.math);
    });
    $('.area.math .select-item').click((e) => {
      onAreaSelectItemClicked(e, eSubject.math);
    });

    $('.area.he .select-all').click((e) => {
      onAreaSelectAllClicked(eSubject.he);
    });
    $('.area.he .select-item').click((e) => {
      onAreaSelectItemClicked(e, eSubject.he);
    });
    $('.area.en .select-all').click((e) => {
      onAreaSelectAllClicked(eSubject.en);
    });
    $('.area.en .select-item').click((e) => {
      onAreaSelectItemClicked(e, eSubject.en);
    });
    $('.btn-test').click((e) => {
      onTestClick(onFinish);
    });
    $('.btn-quiz.quiz-he').click((e) => {
      onQuizClick(0, onFinish);
    });
    $('.btn-quiz.quiz-math').click((e) => {  //shaul  
      onMathQuizClick();
    });
    $('.btn-quiz.quiz-en').click((e) => {
      onQuizClick(2, onFinish);
    });
    $('.btn-on-demand').click((e) => {
      onBtnOnDemandClicked();
    });
    $('.btn-quiz.lite-math').click((e) => {  //shaul
      onLevelQuizClick(1, onFinish);
    });
    $('.btn-quiz.meduim-math').click((e) => {
      onLevelQuizClick(2, onFinish);
    });
    $('.btn-quiz.advance-math').click((e) => {
      onLevelQuizClick(3, onFinish);
    });
    $('.btn-quiz.mixed-math').click((e) => {
      onQuizClick(1, onFinish);
    });
    $('.btn-quiz.psycho-math').click((e) => {  //shaul
      onLevelQuizClick(4, onFinish);
    });
    $('.start-dlg-wrap .popper').click((e) => {
      resetMainUI();
    });
    $('.labels-wrap .lbl').click((e) => {
      onLabelClicked(e);
    });
    $('.start-dlg-wrap .toggle-lbl input').click((e) => {
      onBtnToggleLblClicked();
    });
    $('.dlg-start .btn-example').click((e) => {
      onBtnExampleClicked();
    });
  }

  //---------------------------------------

  function set(onFinish) {
    registerEvents(onFinish);

    currStep = 0;

    $(".step").removeClass("active");
    $(".step2").addClass("active");

    $(".btn").removeClass("active");
    $(".btn-next").addClass("active");


  }

  return {
    set: set,
    show: show,
    reset: reset
  }
}
