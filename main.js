// MOBILE MENU

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("primaryNav");
  const menuIcon = menuToggle.querySelector("img");

  function getFocusableElements(container) {
    return Array.from(
      container.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    );
  }

  function trapFocus(e, container) {
    const focusableItems = getFocusableElements(container);
    if (!focusableItems.length) return;

    const first = focusableItems[0];
    const last = focusableItems[focusableItems.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";

    if (isExpanded) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open Navigation Menu");
      mobileMenu.classList.remove("active");
      menuIcon.src = "./images/icons/hamburger.svg";
      document.body.classList.remove("no-scroll");
    } else {
      menuToggle.setAttribute("aria-expanded", "true");
      menuToggle.setAttribute("aria-label", "Close Navigation Menu");
      mobileMenu.classList.add("active");
      menuIcon.src = "./images/icons/close.svg";
      document.body.classList.add("no-scroll");

      const focusable = getFocusableElements(mobileMenu);
      if (focusable.length) focusable[0].focus();
    }
  });

  document.addEventListener("click", (e) => {
    const isClickInsideMenu = mobileMenu.contains(e.target);
    const isClickOnToggle = menuToggle.contains(e.target);
    const isMenuActive = mobileMenu.classList.contains("active");

    if (!isClickInsideMenu && !isClickOnToggle && isMenuActive) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open Navigation Menu");
      mobileMenu.classList.remove("active");
      menuIcon.src = "./images/icons/hamburger.svg";
      document.body.classList.remove("no-scroll");
    }
  });

  document.addEventListener("keydown", (e) => {
    const isMenuActive = mobileMenu.classList.contains("active");

    if (e.key === "Escape" && isMenuActive) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open Navigation Menu");
      mobileMenu.classList.remove("active");
      menuToggle.focus();
      menuIcon.src = "./images/icons/hamburger.svg";
      document.body.classList.remove("no-scroll");
    }

    if (isMenuActive && e.key === "Tab") {
      trapFocus(e, mobileMenu);
    }
  });
});
