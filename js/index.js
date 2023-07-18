const menuButton = document.getElementById("menu-button");
const menu = document.getElementById("modal");

menuButton.addEventListener("click", openMenu);

window.addEventListener("click", function (event) {
  if (event.target == menu) {
    menu.style.display = "none";
  }
});

function openMenu() {
  if (menu.classList.contains("no-active")) {
    menu.classList.remove("no-active");
    menu.classList.add("active");
  } else {
    menu.classList.remove("active");
    menu.classList.add("no-active");
  }
}
