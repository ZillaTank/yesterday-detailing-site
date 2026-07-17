(function () {
  const carousel = document.querySelector("[data-review-carousel]");
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll("[data-review-slide]"));
  const dots = Array.from(carousel.querySelectorAll("[data-review-dot]"));
  if (!slides.length || slides.length !== dots.length) return;

  let activeIndex = 0;
  let timerId;

  function showSlide(index) {
    if (index === activeIndex) return;
    activeIndex = index;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("active", slideIndex === activeIndex);
      slide.classList.toggle("next", slideIndex === (activeIndex + 1) % slides.length);
    });

    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeIndex;
      dot.classList.toggle("active", isActive);
      dot.setAttribute("aria-current", isActive ? "true" : "false");
    });
  }

  function startRotation() {
    window.clearInterval(timerId);
    timerId = window.setInterval(() => {
      showSlide((activeIndex + 1) % slides.length);
    }, 5200);
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
      startRotation();
    });
  });

  carousel.addEventListener("mouseenter", () => window.clearInterval(timerId));
  carousel.addEventListener("mouseleave", startRotation);

  slides[0].classList.add("active");
  slides[1].classList.add("next");
  dots[0].classList.add("active");
  dots[0].setAttribute("aria-current", "true");
  startRotation();
})();
