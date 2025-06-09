$(document).ready(function () {

  const sections = document.querySelectorAll(".platform .features .feature");
  let lastFeature = null;

  function setActive() {
    $(`.platform .feature`).removeClass("active");
    $(`.platform .${lastFeature}`).addClass("active");
  }

  function handleIntersect(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const currFeature = entry.target.dataset.swap;
        if (lastFeature !== currFeature) {
          lastFeature = currFeature;
          setActive();
        }
      }
    });
  }

  const observer = new IntersectionObserver(handleIntersect, {
    threshold: 1,
  });

  sections.forEach((section) => {
    observer.observe(section);
  });
});
