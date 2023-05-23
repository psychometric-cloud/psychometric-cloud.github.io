const eSubject = {
  math: "math",
  he: "he",
  en: "en"
};

const eSource = {
  malo1: "malo1",
  malo2: "malo2",
  niv: "niv",
  pshco: "pshco"
};

function StartDialog() {

  selectedSubject = eSubject.math;
  selectedSources = [eSource.malo1];
  selectedAreas = [];

  function show() {
    $(".start-dlg-wrap").addClass("active");
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
      selectedSubject,
      selectedSources,
      selectedAreas
    });
  }

  //--------------------------------------------

  function onSubjectChange() {
    selectedSubject = $('input[name="subjects-radio"]:checked').val();

    if (selectedSubject === eSubject.math) {
      $(`.area.math .select-all`).prop('checked', true);
      setTimeout(() => {
        onAreaSelectAllClicked(eSubject.math);
      }, 0);
    }
    else if (selectedSubject === eSubject.he) {
      $(`.area.he .select-all`).prop('checked', true);
      setTimeout(() => {
        onAreaSelectAllClicked(eSubject.he);
      }, 0);
    }
    else if (selectedSubject === eSubject.en) {
      $(`.area.en .select-all`).prop('checked', true)
      setTimeout(() => {
        onAreaSelectAllClicked(eSubject.en);
      }, 0);
    }
  }

  //--------------------------------------------

  function onAreaSelectAllClicked(type) {

    selectedAreas = [];

    if ($(`.area.${type} .select-all`).prop('checked')) {
      $(`.area.${type} .select-item`).each(function () {
        selectedAreas.push(this.value)
        this.checked = true;
      });
    } else {
      $(`.area.${type} .select-item`).each(function () {
        this.checked = false;
      });
    }
    checkButtons();
  }

  //--------------------------------------------

  function onAreaSelectItemClicked(e, type) {

    if ($(e.target).prop('checked')) {
      selectedAreas.push($(e.target).prop('value'))
    } else {
      var index = selectedAreas.indexOf($(e.target).prop('value'));
      if (index !== -1) {
        selectedAreas.splice(index, 1);
      }
    }

    if ($(`.area.${type} .select-item:checked`).length == $(`.area.${type} .select-item`).length) {
      $(`.area.${type} .select-all`).prop('checked', true);
    } else {
      $(`.area.${type} .select-all`).prop('checked', false);
    }

    checkButtons();
  }

  //--------------------------------------------

  function onSourceSelectAllClicked(e, type) {

    selectedSources = [];

    if ($(`.source .select-all`).prop('checked')) {
      $(`.source .select-item`).each(function () {
        selectedSources.push(this.value)
        this.checked = true;
      });
    } else {
      $(`.source .select-item`).each(function () {
        this.checked = false;
      });
    }
    console.log(selectedSources)
    checkButtons();
  }

  //--------------------------------------------

  function onSourceSelectItemClicked(e) {

    if ($(e.target).prop('checked')) {
      selectedSources.push($(e.target).prop('value'))
    } else {
      var index = selectedSources.indexOf($(e.target).prop('value'));
      if (index !== -1) {
        selectedSources.splice(index, 1);
      }
    }

    if ($(`.source .select-item:checked`).length == $(`.source .select-item`).length) {
      $(`.source .select-all`).prop('checked', true);
    } else {
      $(`.source .select-all`).prop('checked', false);
    }

    console.log(selectedSources)
    checkButtons();
  }

  //--------------------------------------------

  function checkButtons() {
    $(".btn-next").toggleClass("disable", currStep > 0 && selectedAreas.length == 0);
    $(".btn-go").toggleClass("disable", selectedSources.length == 0);
  }

  /*-------------------------------------------*/

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
    $('.source .select-all').click((e) => {
      onSourceSelectAllClicked(e);
    });
    $('.source .select-item').click((e) => {
      onSourceSelectItemClicked(e);
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

    onSubjectChange();
  }

  return {
    set: set,
    show: show
  }
}
