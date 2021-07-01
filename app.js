const navControl = document.querySelector("nav .control");
const nav = document.querySelector("nav");
const ADD_BTN = document.querySelector(".new-btn");
const CLOSE_BTN = document.querySelector(".patient__card form svg");
const PATIENT_FORM = document.querySelector("form");
const MESSAGE = document.querySelector("#message");

navControl.addEventListener("click", () => {
  nav.classList.toggle("active");
});
ADD_BTN.addEventListener("click", () => {
  PATIENT_FORM.classList.add("opened");
  PATIENT_FORM[0].focus();
});

CLOSE_BTN.addEventListener("click", () => {
  PATIENT_FORM.classList.remove("opened");
});
