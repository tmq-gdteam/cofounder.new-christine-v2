const menuButton = document.querySelector("[data-menu-toggle]");
const navLinks = document.querySelector("[data-nav-links]");

if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    document.body.classList.toggle("nav-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navLinks.classList.remove("is-open");
      document.body.classList.remove("nav-open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}

const revealTargets = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach((target) => observer.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}

function setMessage(form, message, type) {
  const output = form.querySelector("[data-form-message]");
  if (!output) return;
  output.textContent = message;
  output.className = `form-message ${type}`;
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

document.querySelectorAll("form[data-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = form.querySelector("input[type='email']");
    const requiredFields = form.querySelectorAll("[required]");

    for (const field of requiredFields) {
      if (!field.value.trim()) {
        field.focus();
        setMessage(form, "Please complete the required fields.", "error");
        return;
      }
    }

    if (email && !isEmail(email.value.trim())) {
      email.focus();
      setMessage(form, "Please enter a valid email address.", "error");
      return;
    }

    const success = form.dataset.form === "contact"
      ? "Message ready. This prototype confirms the contact flow."
      : "You are on the list. We will be in touch as access opens.";

    form.reset();
    setMessage(form, success, "success");
  });
});
