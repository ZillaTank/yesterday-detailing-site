(function () {
  const carousel = document.querySelector("[data-review-carousel]");
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll("[data-review-slide]"));
  if (slides.length < 2) return;

  let activeIndex = 0;
  let timerId;

  function showSlide(index) {
    if (index === activeIndex) return;
    activeIndex = index;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("active", slideIndex === activeIndex);
      slide.classList.toggle("next", slideIndex === (activeIndex + 1) % slides.length);
    });
  }

  function startRotation() {
    window.clearInterval(timerId);
    timerId = window.setInterval(() => {
      showSlide((activeIndex + 1) % slides.length);
    }, 5200);
  }

  carousel.addEventListener("mouseenter", () => window.clearInterval(timerId));
  carousel.addEventListener("mouseleave", startRotation);

  slides[0].classList.add("active");
  slides[1].classList.add("next");
  startRotation();
})();
