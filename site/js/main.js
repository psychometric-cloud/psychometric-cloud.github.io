const regiterFooterEvents = function () {
  const items = document.querySelectorAll('footer .category');

  function onFooterAccordion() {
    const itemToggle = this.classList.contains('active');

    for (i = 0; i < items.length; i++) {
      items[i].classList.remove("active");
    }

    if (!itemToggle) {
      this.classList.add('active');
    }
  }

  items.forEach((item) => item.addEventListener('click', onFooterAccordion));
}

$(document).ready(function () {
  $(this).scrollTop(0);

  $(".hamburger").click(() => {
    $("header .inner-header").toggleClass("open_sidebar");
    $("body").toggleClass("no_overflow");
  });

  $("header .content .option.first").click(() => {
    $(this).toggleClass("active");
    $(".features-options").slideToggle(200);
  });

  $("footer.mobile-footer .btn-wrapper .header").click(function () {
    $(this).parent().toggleClass("active");
  });

  regiterFooterEvents();
});