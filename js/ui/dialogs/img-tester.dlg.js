function ImagesTesterDialog() {

  function filter(filterBy, callback) {
    res = [];

    for (let i = 0; i < qBank.length; i++) {
      if (filterBy.year === qBank[i].year && filterBy.season === qBank[i].season && qBank[i].chapter.startsWith(filterBy.subject)) {
        res.push(qBank[i]);
      }
    }
    callback(res);
  }

  //--------------------------------------------

  function onCheckImagesClick() {

    let filterBy = {
      subject: $(".images-tester-dlg-wrap select[name=subject]").val(),
      year: parseInt($(".images-tester-dlg-wrap select[name=year]").val()),
      season: $(".images-tester-dlg-wrap select[name=season]").val()
    }

    filter(filterBy, (filteredData) => {
      $(".images-tester-dlg-wrap").removeClass("active");
      practiceComponent.show(filteredData, $(".images-tester-dlg-wrap select[name=type]").val());
    })
  }

  //------------------------------------

  function onTestImagesClick() {
    $(".start-panel").hide();
    $(".images-tester-dlg-wrap").addClass("active");
  }

  //-------------------------------------

  function init() {
    if (window.location.href.includes('?test1')) {
      $(".btn-test-images").addClass("show");
      $(".btn-test-images").click(() => {
        onTestImagesClick();
      });
      $(".images-tester-dlg-wrap .btn-check").click(() => {
        onCheckImagesClick();
      });
    }
  }

  init();

  return {
  }
}
