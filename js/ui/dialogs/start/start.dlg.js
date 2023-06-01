const eSubject = {
  math: "math",
  he: "he",
  en: "en"
};

function StartDialog() {

  let selectedSubject = eSubject.math;
  let selectedPublishers = [ePublisher.mallo1];
  let selectedAreas = [];

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

    if (actionType === eActionType.test) {
      if (currStep === 1) {
        currStep += step;
      }
    }

    showButtons();
    showPanels();
    checkButtons();
  }

  /*-------------------------------------------*/

  function onGoClick(onFinish) {
    $(".start-dlg-wrap").removeClass("active");

    console.log(selectedSubject);
    console.log(selectedPublishers);
    console.log(selectedAreas);

    onFinish({
      actionType,
      selectedSubject,
      selectedPublishers,
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
        selectedAreas.push(this.value);
      }
    });
  }

  //--------------------------------------------

  function onPublisherSelectAllClicked(e, type) {

    selectedPublishers = [];

    if ($(`.publisher .select-all`).prop('checked')) {
      $(`.publisher .select-item`).each(function () {
        this.checked = true;
      });
    } else {
      $(`.publisher .select-item`).each(function () {
        this.checked = false;
      });
    }
    setSelectedPublisher();
    checkButtons();
  }

  //--------------------------------------------

  function onPublisherSelectItemClicked(e) {

    if ($(`.publisher .select-item:checked`).length == $(`.publisher .select-item`).length) {
      $(`.publisher .select-all`).prop('checked', true);
    } else {
      $(`.publisher .select-all`).prop('checked', false);
    }

    setSelectedPublisher();
    checkButtons();
  }

  //--------------------------------------------

  function setSelectedPublisher() {

    selectedPublishers = [];

    $(`.publisher .select-item`).each(function () {
      if (this.checked) {
        selectedPublishers.push(this.value)
      }
    });
  }

  //--------------------------------------------

  function checkButtons() {
    $(".btn-next").toggleClass("disable", currStep > 0 && selectedAreas.length == 0);
    $(".btn-go").toggleClass("disable", selectedPublishers.length == 0);
  }

  //---------------------------------------------

  function onBtnPreActionClicked(_actionType) {
    actionType = _actionType;
    $(".dlg-start .init-panel").hide();
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

    $('.publisher .select-all').click((e) => {
      onPublisherSelectAllClicked(e);
    });
    $('.publisher .select-item').click((e) => {
      onPublisherSelectItemClicked(e);
    });

    $('.btn-test').click((e) => {
      onBtnPreActionClicked(eActionType.test);
    });
    $('.btn-practice').click((e) => {
      onBtnPreActionClicked(eActionType.practice);
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
