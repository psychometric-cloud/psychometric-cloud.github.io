function MoreDialog() {

  function show(item, type) {
    let src = srcBuilder.build(item, "questions", type);
    $(".more-panel img").attr('src', src);
    $(".more-panel").addClass("show");
  }

  function init() {
    $(".more-panel").click(() => {
      $(".more-panel").removeClass("show")
    });
  }

  init();

  return {
    show: show
  }
}
