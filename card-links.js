(function () {
  const linkedCards = document.querySelectorAll("[data-link]");

  linkedCards.forEach((card) => {
    const url = card.dataset.link;
    if (!url) return;

    card.addEventListener("click", () => {
      window.location.href = url;
    });

    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      window.location.href = url;
    });
  });
})();
