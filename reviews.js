(function () {
  const carousel = document.querySelector("[data-review-carousel]");
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll("[data-review-slide]"));
  const dots = Array.from(carousel.querySelectorAll("[data-review-dot]"));
  if (!slides.length || slides.length !== dots.length) return;

  let activeIndex = 0;
  let timerId;

  function showSlide(index, direction = 1) {
    if (index === activeIndex) return;
    const previousIndex = activeIndex;
    activeIndex = index;

    slides.forEach((slide, slideIndex) => {
      slide.classList.remove("active", "exit-left", "exit-right", "enter-left", "enter-right");

      if (slideIndex === previousIndex) {
        slide.classList.add(direction > 0 ? "exit-left" : "exit-right");
      } else if (slideIndex === activeIndex) {
        slide.classList.add(direction > 0 ? "enter-right" : "enter-left");
        window.requestAnimationFrame(() => {
          slide.classList.add("active");
          slide.classList.remove("enter-right", "enter-left");
        });
      }
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
      showSlide((activeIndex + 1) % slides.length, 1);
    }, 5200);
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index, index > activeIndex ? 1 : -1);
      startRotation();
    });
  });

  carousel.addEventListener("mouseenter", () => window.clearInterval(timerId));
  carousel.addEventListener("mouseleave", startRotation);

  slides[0].classList.add("active");
  dots[0].classList.add("active");
  dots[0].setAttribute("aria-current", "true");
  startRotation();
})();
