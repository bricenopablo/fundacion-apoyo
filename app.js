
const navControl = document.querySelector("nav .control");
const nav = document.querySelector("nav");
const addBtn = document.querySelector(".new-btn");
const patientForm = document.querySelector(".patient__card form")
const closeBtn = document.querySelector(".patient__card form svg")

navControl.addEventListener('click', ()=> {
    nav.classList.toggle("active");
});

addBtn.addEventListener('click', ()=> {
    patientForm.classList.add("opened");
})

closeBtn.addEventListener('click', ()=> {
    patientForm.classList.remove("opened");
})