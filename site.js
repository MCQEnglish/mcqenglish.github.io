(() => {
  "use strict";
  document.querySelectorAll("[data-current-year]").forEach(el => { el.textContent = new Date().getFullYear(); });
  const button = document.querySelector(".menu-button");
  const nav = document.getElementById("mainNav");
  if (button && nav) {
    button.addEventListener("click", () => {
      const open = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("open", !open);
    });
    nav.addEventListener("click", event => {
      if (event.target.closest("a")) { button.setAttribute("aria-expanded", "false"); nav.classList.remove("open"); }
    });
  }
})();
