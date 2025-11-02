//Nav Toggle

const navToggle = document.querySelector(".nav-toggle");
const navList = document.querySelector("header .nav__list");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    if (navList) {
      navList.classList.toggle("visible");
    }
  });
}
