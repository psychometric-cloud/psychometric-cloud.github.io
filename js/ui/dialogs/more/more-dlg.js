function MoreDialog() {

  let resizeImage = _.debounce((dir) => {
    percent = 0.2;
    add_width = (dir * (percent * $(".more-panel img").width())) + 'px';

    $(".more-panel img").animate({
      width: '+=' + add_width
    });
  }, 50);

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
    $(".more-panel .btn.inc").click((e) => {
      e.stopPropagation();
      resizeImage(1);
    });
    $(".more-panel .btn.red").click((e) => {
      e.stopPropagation();
      resizeImage(-1);
    });
  }

  init();

  return {
    show: show,
    showAnswer: showAnswer
  }
}
