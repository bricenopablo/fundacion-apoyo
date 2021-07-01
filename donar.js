PATIENT_FORM.addEventListener('submit',e=>{
    e.preventDefault()
    MESSAGE.innerHTML = 'Sera redirigido a la pagina de su banco';
    MESSAGE.classList.toggle("alert--success");
    setTimeout(() => {
      MESSAGE.classList.toggle("alert--success");
      setTimeout(() => {
        window.location.reload();
      }, 300);
    }, 5000);
})