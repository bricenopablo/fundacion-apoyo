const navControl = document.querySelector("nav .control");
const nav = document.querySelector("nav");

navControl.addEventListener("click", () => {
  nav.classList.toggle("active");
});
