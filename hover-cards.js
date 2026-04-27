(function () {
  const cards = document.querySelectorAll(".stat-link, .card-link");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.classList.add("card-hover");
    });

    card.addEventListener("mouseleave", () => {
      card.classList.remove("card-hover");
    });

    card.addEventListener("focus", () => {
      card.classList.add("card-hover");
    });

    card.addEventListener("blur", () => {
      card.classList.remove("card-hover");
    });
  });
})();
