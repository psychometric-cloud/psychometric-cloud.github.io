function MoreDialog() {

  let lastTextSrc = "";
  let lastAnswerSrc = "";

  //----------------------------------------

  let resizeImage = _.debounce((dir) => {
    percent = 0.2;
    add_width = (dir * (percent * $(".more-panel img.show").width())) + 'px';

    $(".more-panel img.show").animate({
      width: '+=' + add_width
    });
  }, 50);

  //----------------------------------------

  function showImage(src, cls, resetWidth) {
    $(".more-panel img").removeClass("show");

    if (resetWidth) {
      $(`.more-panel img.${cls}`).width("");
    }
    $(`.more-panel img.${cls}`).attr('src', src);
    $(`.more-panel img.${cls}`).addClass("show");
  }

  //----------------------------------------

  function showText(item) {
    let src = srcBuilder.build(item, "questions", true);

    showImage(src, "text", lastTextSrc !== src);
    lastTextSrc = src;

    $(".more-panel").addClass("show");
  }

  //----------------------------------------

  function showAnswer(item) {
    let src = srcBuilder.build(item, "answers");

    showImage(src, "answer", lastAnswerSrc !== src);
    lastAnswerSrc = src;

    $(".more-panel").addClass("show");
  }

  //----------------------------------------

  function init() {
    $(".more-panel").click(() => {
      $(".more-panel").removeClass("show")
    });

    $(".more-panel .btn.zoom-in").click((e) => {
      e.stopPropagation();
      resizeImage(1);
    });

    $(".more-panel .btn.zoom-out").click((e) => {
      e.stopPropagation();
      resizeImage(-1);
    });

    $(".more-panel img").click((e) => {
      e.stopPropagation();
    });
  }

  init();

  return {
    showText: showText,
    showAnswer: showAnswer
  }
}
