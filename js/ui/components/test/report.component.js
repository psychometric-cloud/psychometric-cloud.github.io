function ReportComponent() {

  let test;

  function showCircle(num) {
    const block = document.querySelectorAll('.block');

    block.forEach(item => {
      let numElement = item.querySelector('.num');
      let num = parseInt(numElement.innerText);
      let count = 0;
      let time = 2000 / num;
      let circle = item.querySelector('.circle');

      setInterval(() => {
        if (count == num) {
          clearInterval();
        } else {
          count += 1;
          numElement.innerText = count;
        }
      }, time)
      circle.style.strokeDashoffset = 503 - (503 * (num / 100));
      let dots = item.querySelector('.dots');
      dots.style.transform = `rotate(${360 * (num / 100)}deg)`;
      if (num == 100) {
        dots.style.opacity = 0;
      }
    })
  }

  //--------------------------------------

  function show(_test, _stat) {

    test = _test;

    $(".report").addClass("show");
    $(".report .num").text(_stat.percentage);

    $(".report img").removeClass("show");
    if (_stat.percentage < 80) {
      $(".report img.bummer").addClass("show");
    } else {
      $(".report img.great").addClass("show");
    }

    showCircle(89);
  }

  //--------------------------------------

  function init() {
    $(".report-box").click(() => {
      $(".test-panel").removeClass("show");
      auditComponent.show(test);
    })
  }

  init();

  return {
    show: show
  }
}
