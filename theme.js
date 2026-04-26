(function () {
  const root = document.documentElement;
  const toggles = document.querySelectorAll("[data-theme-toggle]");
  const savedTheme = localStorage.getItem("yd-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const startingTheme = savedTheme || (prefersDark ? "dark" : "light");

  function applyTheme(theme) {
    root.dataset.theme = theme;
    toggles.forEach((toggle) => {
      toggle.checked = theme === "dark";
    });
  }

  applyTheme(startingTheme);

  toggles.forEach((toggle) => {
    toggle.addEventListener("change", () => {
      const nextTheme = toggle.checked ? "dark" : "light";
      localStorage.setItem("yd-theme", nextTheme);
      applyTheme(nextTheme);
    });
  });

  window.addEventListener("storage", (event) => {
    if (event.key === "yd-theme" && event.newValue) {
      applyTheme(event.newValue);
    }
  });
})();
