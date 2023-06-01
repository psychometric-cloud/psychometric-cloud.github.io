function CloudTesterDialog() {

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

  function onBtnRunClick() {

    let filterBy = {
      subject: $(".cloud-tester-dlg-wrap select[name=subject]").val(),
      year: parseInt($(".cloud-tester-dlg-wrap select[name=year]").val()),
      season: $(".cloud-tester-dlg-wrap select[name=season]").val()
    }

    filter(filterBy, (filteredData) => {
      $(".cloud-tester-dlg-wrap").removeClass("active");
      cloudTesterComponent.show(filteredData, $(".cloud-tester-dlg-wrap select[name=type]").val());
    })
  }

  //------------------------------------

  function onTestCloudClick() {
    $(".start-panel").hide();
    $(".cloud-tester-dlg-wrap").addClass("active");
  }

  //-------------------------------------

  function init() {

    if (window.location.href.includes('?dev')) {

      $(".btn-test-cloud").addClass("show");

      $(".btn-test-cloud").click(() => {
        onTestCloudClick();
      });
      $(".cloud-tester-dlg-wrap .btn-run").click(() => {
        onBtnRunClick();
      });
      $(".cloud-tester-dlg-wrap .popper").click(() => {
        $(".cloud-tester-dlg-wrap").removeClass("active");
      })
    }
  }

  return {
    init: init
  }
}
