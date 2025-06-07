const menuBtn = document.getElementById("menu"),
  options = document.querySelector("nav ul"),
  openMenuIcon = document.getElementById("open-menu"),
  links = document.querySelectorAll("nav ul li a");
let initializeAnimation = false

menuBtn.addEventListener("click", () => {
  if (!initializeAnimation) {
    openMenuIcon.classList.add("open-menu-animation");
    initializeAnimation = true;
  }
  options.classList.toggle("active");
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    menuBtn.click();
  });
});
