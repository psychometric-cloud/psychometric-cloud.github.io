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
  }

  //--------------------------------------------

  function onLabelClicked(e) {
    let lbl = $(e.target).closest(".lbl");
    if (lbl) {
      let key = lbl.data("key");
      $(`.labels-wrap .lbl.${key}`).toggleClass("clicked");

      if (selectedLabels.includes(key)) {
        selectedLabels = selectedLabels.filter((_lbl) => {
          return _lbl !== key;
        })
      } else {
        selectedLabels.push(key)
      }
      console.log(selectedLabels);
      checkButtons();
    }
  }

  //--------------------------------------------

  function checkButtons() {
    $(".btn-next").toggleClass("disable", currStep > 0 && selectedAreas.length == 0);
    $(".btn-go").removeClass("disable");

    setTimeout(() => {
      if (!$('.start-dlg-wrap .labels-wrap').hasClass("disabled")) {
        $(".btn-go").toggleClass("disable", selectedLabels.length == 0);
      }
    }, 0);
  }

  //---------------------------------------------

  function onBtnPreActionClicked(_actionType) {
    actionType = _actionType;

    if (actionType === eActionType.test) {
      $(".btn-prev").addClass("hide");
      currStep = 1;
      showButtons();
    }

    $(".dlg-start .init-panel").hide();
  }

  //---------------------------------------------

  function onBtnToggleLblClicked() {
    $('.start-dlg-wrap .labels-wrap').toggleClass("disabled");

    if ($('.start-dlg-wrap .labels-wrap').hasClass("disabled")) {
      selectedLabels = [];
      $('.start-dlg-wrap .labels-wrap .lbl').removeClass('clicked');
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
    $('.start-dlg-wrap .labels-wrap .lbl').removeClass('clicked');

    $(".select-group").find(".body").removeClass("open");

    setStats();
    onSubjectChange();
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
      resetMainUI();
    });
    $('.labels-wrap .lbl').click((e) => {
      onLabelClicked(e);
    });
    $('.start-dlg-wrap .toggle-lbl input').click((e) => {
      onBtnToggleLblClicked();
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
