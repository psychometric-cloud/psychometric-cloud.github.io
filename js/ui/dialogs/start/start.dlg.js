const eSubject = {
  math: "math",
  he: "he",
  en: "en"
};

function StartDialog() {

  let selectedSubject = eSubject.math;
  let selectedAreas = [];
  let selectedLabels = [];

  function show(show) {
    reset();
    $(".start-dlg-wrap").toggleClass("active", show);
  }

  /*-------------------------------------------*/

  function showPanels() {
    $(".panel").removeClass("active");

    if (currStep == 0) {
      $(".panel.step1").addClass("active");
    }
    else if (currStep == 1) {
      $(".panel.step2").addClass("active");

      $(".area").removeClass("active");
      if (selectedSubject === eSubject.math) {
        $(".area.math").addClass("active");
      }
      if (selectedSubject === eSubject.he) {
        $(".area.he").addClass("active");
      }
      if (selectedSubject === eSubject.en) {
        $(".area.en").addClass("active");
      }
    }
    else {
      $(".panel.step3").addClass("active");
    }
  }

  /*-------------------------------------------*/

  function showButtons() {
    $(".btn").removeClass("active");

    if (currStep == 0) {
      $(".btn-next").addClass("active");
    }
    else if (currStep == 1) {
      $(".btn-prev").addClass("active");
      $(".btn-next").addClass("active");
    }
    else {
      $(".btn-prev").addClass("active");
      $(".btn-go").addClass("active");
    }
  }

  /*-------------------------------------------*/

  function onPrevNextClick(step) {

    currStep += step;

    showButtons();
    showPanels();
    checkButtons();
  }

  /*-------------------------------------------*/

  function onGoClick(onFinish) {
    $(".start-dlg-wrap").removeClass("active");

    onFinish({
      actionType,
      selectedSubject,
      selectedAreas,
      selectedLabels
    });
  }

  //--------------------------------------------

  function onSubjectChange() {
    selectedSubject = $('input[name="subjects-radio"]:checked').val();

    if (selectedSubject === eSubject.math) {
      $(`.area.math .select-all`).prop('checked', false);
      setTimeout(() => {
        onAreaSelectAllClicked(eSubject.math);
      }, 0);
    }
    else if (selectedSubject === eSubject.he) {
      $(`.area.he .select-all`).prop('checked', false);
      setTimeout(() => {
        onAreaSelectAllClicked(eSubject.he);
      }, 0);
    }
    else if (selectedSubject === eSubject.en) {
      $(`.area.en .select-all`).prop('checked', false)
      setTimeout(() => {
        onAreaSelectAllClicked(eSubject.en);
      }, 0);
    }
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
    } else {
      let subChecked = $(e.target).closest(".select-group").find(".select-item.sub:checked");
      $(e.target).closest(".select-group").find(".select-item.main").prop('checked', subChecked.length > 0);
    }

    let allAreaChecked = ($(`.area.${type} .select-item:checked`).length == $(`.area.${type} .select-item`).length);
    $(`.area.${type} .select-all`).prop('checked', allAreaChecked);

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
        else {
          selectedAreas.push(this.value);
        }
      }
    });
  }

  //--------------------------------------------

  function onLabelSelectItemClicked() {
    selectedLabels = [];

    $(`.labels-wrap label .select-item`).each(function () {
      if (this.checked) {
        selectedLabels.push(this.value)
      }
    });
    checkButtons();
  }

  //--------------------------------------------

  function checkButtons() {
    $(".btn-next").toggleClass("disable", currStep > 0 && selectedAreas.length == 0);

    if (!$('.start-dlg-wrap .labels-wrap').hasClass("disabled")) {
      $(".btn-go").toggleClass("disable", selectedLabels.length == 0);
    }
  }

  //---------------------------------------------

  function onBtnPreActionClicked(_actionType) {
    actionType = _actionType;

    if (actionType === eActionType.test) {
      $(".btn-prev").addClass("hide");
      currStep = 2;
      showButtons();
    }

    $(".dlg-start .init-panel").hide();
  }

  //---------------------------------------------

  function onBtnStarClicked() {
    $('.start-dlg-wrap .btn-star').toggleClass("clicked");
  }

  //---------------------------------------------

  function onBtnToggleLblClicked() {
    $('.start-dlg-wrap .labels-wrap').toggleClass("disabled");

    if ($('.start-dlg-wrap .labels-wrap').hasClass("disabled")) {
      selectedLabels = [];
      $('.start-dlg-wrap .labels-wrap label .select-item').prop('checked', false);
    }
    checkButtons();
  }

  //---------------------------------------------

  function reset() {
    currStep = 0;
    selectedLabels = [];

    $(".start-dlg-wrap").removeClass("active");
    $(".start-dlg-wrap .active").removeClass("active");
    $(".dlg-start .init-panel").show();

    $(".step1").addClass("active");
    $(".btn-next").addClass("active");
    $(".btn-prev").removeClass("hide");
    $(".btn-go").removeClass("disable");
    $('.start-dlg-wrap .labels-wrap').addClass("disabled");
    $('.start-dlg-wrap .toggle-lbl input').prop('checked', false);
    $('.start-dlg-wrap .labels-wrap label .select-item').prop('checked', false);

    $(".select-group").find(".body").removeClass("open");

    setStats();
    onSubjectChange();
  }

  //---------------------------------------------

  function setStats() {
    let stats = dataStats.get();

    $(".stat.math-all").text(`(${stats.math.math_all})`);
    $(".stat.chart").text(`(${stats.math.chart})`);
    $(".stat.geo").text(`(${stats.math.geo})`);
    $(".stat.tri").text(`(${stats.math.tri})`);
    $(".stat.poly").text(`(${stats.math.poly})`);
    $(".stat.circle").text(`(${stats.math.circle})`);
    $(".stat.third").text(`(${stats.math.third})`);
    $(".stat.perimeter").text(`(${stats.math.perimeter})`);
    $(".stat.cube").text(`(${stats.math.cube})`);
    $(".stat.area").text(`(${stats.math.area})`);
    $(".stat.alg").text(`(${stats.math.alg})`);
    $(".stat.eq").text(`(${stats.math.eq})`);
    $(".stat.expression").text(`(${stats.math.expression})`);
    $(".stat.percent").text(`(${stats.math.percent})`);
    $(".stat.fractions").text(`(${stats.math.fractions})`);
    $(".stat.exponent").text(`(${stats.math.exponent})`);
    $(".stat.root").text(`(${stats.math.root})`);
    $(".stat.oddEven").text(`(${stats.math.oddEven})`);
    $(".stat.prime").text(`(${stats.math.prime})`);
    $(".stat.newOp").text(`(${stats.math.newOp})`);
    $(".stat.letters").text(`(${stats.math.letters})`);
    $(".stat.avg").text(`(${stats.math.avg})`);
    $(".stat.inequality").text(`(${stats.math.inequality})`);
    $(".stat.dividers").text(`(${stats.math.dividers})`);
    $(".stat.factorial").text(`(${stats.math.factorial})`);
    $(".stat.abs").text(`(${stats.math.abs})`);
    $(".stat.remainder").text(`(${stats.math.remainder})`);
    $(".stat.series").text(`(${stats.math.series})`);
    $(".stat.axis").text(`(${stats.math.axis})`);
    $(".stat.prb").text(`(${stats.math.prb})`);
    $(".stat.relations").text(`(${stats.math.relations})`);
    $(".stat.comb").text(`(${stats.math.comb})`);
    $(".stat.probability").text(`(${stats.math.probability})`);
    $(".stat.supply").text(`(${stats.math.supply})`);
    $(".stat.movement").text(`(${stats.math.movement})`);
    $(".stat.seqNum").text(`(${stats.math.seqNum})`);
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
      onGoClick(onFinish);
    });
    $('input[type=radio][name="subjects-radio"]').change(() => {
      onSubjectChange();
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
      onBtnPreActionClicked(eActionType.test);
    });
    $('.btn-practice').click((e) => {
      onBtnPreActionClicked(eActionType.practice);
    });

    $('.start-dlg-wrap .popper').click((e) => {
      reset();
      resetMainUI();
    });

    $('.labels-wrap label .select-item').click((e) => {
      onLabelSelectItemClicked(e);
    });
    $('.start-dlg-wrap .toggle-lbl input').click((e) => {
      onBtnToggleLblClicked();
    });

    $('.start-dlg-wrap .btn-star').click((e) => {
      onBtnStarClicked();
    });
  }

  //---------------------------------------

  function set(onFinish) {
    registerEvents(onFinish);

    currStep = 0;

    $(".step").removeClass("active");
    $(".step1").addClass("active");

    $(".btn").removeClass("active");
    $(".btn-next").addClass("active");


  }

  return {
    set: set,
    show: show,
    reset: reset
  }
}
