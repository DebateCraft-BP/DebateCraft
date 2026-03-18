document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.getElementById("mobileMenuButton");
  const mainNav = document.getElementById("mainNav");

  if (menuButton && mainNav) {
    menuButton.addEventListener("click", function () {
      mainNav.classList.toggle("open");
    });
  }

  const dropdown = document.querySelector(".dropdown");
  const dropdownContent = document.querySelector(".dropdown-content");

  if (dropdown && dropdownContent) {
    dropdown.addEventListener("click", function () {
      dropdownContent.classList.toggle("show");
    });
  }
});