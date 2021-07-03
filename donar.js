const donaciones = JSON.parse(localStorage.getItem("donaciones"));

if (!localStorage.getItem("donaciones") || typeof donaciones !== "object") {
  localStorage.setItem("donaciones", "[]");
}

const showDonations = () => {
  const donations = document.querySelector(".patients");
  donations.innerHTML = "";

  if (donaciones) {
    donaciones.forEach((donation) => {
      donations.innerHTML = `
        <div class="patient">
          <p>${donation.codigo}</p>
          <p>${donation.banco}</p>
          <p>${donation.tipo_cuenta}</p>
          <p>${new Intl.NumberFormat("es-CL", {
            maximumSignificantDigits: 3,
            style: "currency",
            currency: "CLP",
          }).format(donation.valor)}</p>
          <p>${new Date(donation.fecha).toLocaleString()}</p>
        </div>
      `;
    });
  }
};

PATIENT_FORM.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = PATIENT_FORM[0];
  const rut = PATIENT_FORM[1];
  const nro_cuenta = PATIENT_FORM[2];
  const banco = PATIENT_FORM[3];
  const tipo_cuenta = PATIENT_FORM[4];
  const email = PATIENT_FORM[5];
  const valor = PATIENT_FORM[6];

  const donations = [...donaciones];

  donations.push({
    codigo: Math.floor(Math.random() * 1240) + 1,
    nombre: nombre.value,
    rut: rut.value,
    nro_cuento: nro_cuenta.value,
    banco: banco.value,
    tipo_cuenta: tipo_cuenta.value,
    email: email.value,
    valor: valor.value,
    fecha: new Date(),
  });

  localStorage.setItem("donaciones", JSON.stringify(donations));

  MESSAGE.innerHTML = "Sera redirigido a la pagina de su banco";
  MESSAGE.classList.toggle("alert--success");
  setTimeout(() => {
    MESSAGE.classList.toggle("alert--success");
    setTimeout(() => {
      window.location.reload();
    }, 300);
  }, 2000);
});

showDonations();
