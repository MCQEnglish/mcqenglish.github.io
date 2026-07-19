(() => {
  "use strict";
  const config = window.EnglishArenaConfig || {};
  const email = String(config.contactEmail || "").trim();
  const ready = email && !email.includes("YOUR_EMAIL") && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  document.querySelectorAll("[data-contact-email]").forEach(link => {
    if (ready) { link.textContent = email; link.href = `mailto:${email}`; }
  });
  const form = document.getElementById("contactForm");
  const status = document.getElementById("contactStatus");
  if (!form) return;
  form.addEventListener("submit", event => {
    event.preventDefault();
    if (!ready) {
      status.textContent = "Site owner: add a verified email address in site-config.js before publishing.";
      status.classList.add("error-text");
      return;
    }
    const data = new FormData(form);
    const subject = `[EnglishArena] ${data.get("topic")}`;
    const body = `Name: ${data.get("name")}\nReply email: ${data.get("email")}\nTopic: ${data.get("topic")}\n\n${data.get("message")}`;
    window.location.href = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.textContent = "Your email application should open with the message prepared.";
  });
})();
