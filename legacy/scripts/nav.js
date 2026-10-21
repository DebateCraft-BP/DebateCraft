document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("mainNav");
  const burger = document.getElementById("mobileMenuButton");
  if (!nav) return;
  const dropdowns = Array.from(nav.querySelectorAll(".dropdown"));

  // Helper for delayed close
  function closeDropdownDelayed(dd, delay = 1200) {
    // Clear any previous close timer for this dropdown
    if (dd._closeTimeout) clearTimeout(dd._closeTimeout);
    dd._closeTimeout = setTimeout(() => {
      closeDropdown(dd);
      dd._closeTimeout = null;
    }, delay);
  }

  /* ---------- MOBILE MENU TOGGLE ---------- */
  if (burger) {
    burger.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      const ul = nav.querySelector("ul");
      if (ul) ul.style.display = isOpen ? "block" : "";
      if (!isOpen) closeAllDropdowns();
    });
  }

  /* ---------- DROPDOWN LOGIC ---------- */
  dropdowns.forEach((dd) => {
    const btn = dd.querySelector(".dropbtn");
    const menu = dd.querySelector(".dropdown-content");
    if (!btn || !menu) return;

    // Accessibility
    btn.setAttribute("role", "button");
    btn.setAttribute("aria-haspopup", "true");
    btn.setAttribute("aria-expanded", "false");
    menu.setAttribute("role", "menu");

    // Click to open/close (mobile + desktop)
    btn.addEventListener("click", (e) => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      if (!expanded) {
        e.preventDefault();
        openDropdown(dd);
      } else {
        closeDropdownDelayed(dd, 1200); // Always delayed
      }
    });

    // Hover to open (desktop only)
    dd.addEventListener("mouseenter", () => {
      if (window.innerWidth > 768) {
        if (dd._closeTimeout) {
          clearTimeout(dd._closeTimeout);
          dd._closeTimeout = null;
        }
        openDropdown(dd, { hover: true });
      }
    });

    // Close with delay when mouse leaves dropdown menu
    menu.addEventListener("mouseleave", () => {
      if (window.innerWidth > 768 && dd.dataset.openedBy === "hover") {
        closeDropdownDelayed(dd, 1200);
      }
    });
  });

  /* ---------- GLOBAL HANDLERS ---------- */
  document.addEventListener("click", (e) => {
    // Close all dropdowns if clicking outside nav
    if (!nav.contains(e.target)) closeAllDropdowns();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllDropdowns();
  });

  /* ---------- HELPER FUNCTIONS ---------- */
  function openDropdown(dd, opts = {}) {
    const btn = dd.querySelector(".dropbtn");
    const menu = dd.querySelector(".dropdown-content");
    if (!btn || !menu) return;
    closeAllDropdowns();
    btn.setAttribute("aria-expanded", "true");
    dd.dataset.openedBy = opts.hover ? "hover" : "click";
    menu.classList.add("active");
    // Clear any close timer
    if (dd._closeTimeout) {
      clearTimeout(dd._closeTimeout);
      dd._closeTimeout = null;
    }
  }

  function closeDropdown(dd) {
    const btn = dd.querySelector(".dropbtn");
    const menu = dd.querySelector(".dropdown-content");
    if (!btn || !menu) return;
    btn.setAttribute("aria-expanded", "false");
    dd.removeAttribute("data-opened-by");
    menu.classList.remove("active");
  }

  function closeAllDropdowns() {
    dropdowns.forEach((dd) => {
      if (dd._closeTimeout) {
        clearTimeout(dd._closeTimeout);
        dd._closeTimeout = null;
      }
      closeDropdown(dd);
    });
  }
});
