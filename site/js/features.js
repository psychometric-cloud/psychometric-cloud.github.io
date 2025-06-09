const registerStickbox = function () {

  if (typeof window.IntersectionObserver !== 'undefined') {
    let options = {
      threshold: [0.75, 1]
    }

    const stickybox = document.querySelector('.feature-details .sticky-box');
    function handleIntersection(entries) {
      entries.map((entry) => {
        $(".feature-details .more-details").toggleClass("show", entry.isIntersecting)
      });
    }

    const observer = new IntersectionObserver(handleIntersection, options);
    observer.observe(stickybox);
  }
}


const registerFeaturesItems = function () {

  const sections = document.querySelectorAll(".feature-details .item");
  let lastFeature = null;

  function setActive() {
    $(`.feature-details .item`).removeClass("active");
    $(`.feature-details .item.${lastFeature}`).addClass("active");

    $(`.feature-details .sticky-box img`).removeClass("active");
    $(`.feature-details .sticky-box img.${lastFeature}`).addClass("active");
  }

  function handleIntersect(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const currFeature = entry.target.dataset.swap;
        // if (lastFeature !== currFeature) {
        lastFeature = currFeature;
        console.log(lastFeature);
        setActive();
        // }
      }
    });
  }

  const observer = new IntersectionObserver(handleIntersect, {
    threshold: [1, 1]
  });

  sections.forEach((section) => {
    observer.observe(section);
  });

}

const setCarousel = function () {

  $('.owl-carousel').owlCarousel({
    loop: false,
    margin: 20,
    nav: true,
    startPosition: 0, // Explicitly set start position to first item
    responsive: {
      0: {
        items: 1,
        nev: true
      },
      900: {
        items: 2
      }
    },
    navText: [
      '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>',
      '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>'
    ]
  })
}

$(document).ready(function () {
  registerStickbox();
  registerFeaturesItems();
  setCarousel();
});

