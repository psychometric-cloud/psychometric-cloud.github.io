function MoreDialog() {

  function show(item) {
    let src = srcBuilder.build(item, "questions", true);
    $(".more-panel img").attr('src', src);
    $(".more-panel").addClass("show");
  }

  function showAnswer(item) {
    let src = srcBuilder.build(item, "answers");
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
    show: show,
    showAnswer: showAnswer
  }
}
