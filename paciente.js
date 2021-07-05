const PATIENTS = document.querySelector(".patients");

const pacientes = JSON.parse(localStorage.getItem("pacientes"));

if (!localStorage.getItem("pacientes") || typeof pacientes !== "object") {
  localStorage.setItem("pacientes", "[]");
}

const calcularEdad = (fechaNacimiento) => {
  const edad =
    new Date().getFullYear() - new Date(fechaNacimiento).getFullYear();
  return edad;
};

function deletePatient(rut) {
  const patients = [...pacientes];

  const newPatients = patients.filter((patient) => patient.rut !== rut);
  localStorage.setItem("pacientes", JSON.stringify(newPatients));
  window.location.reload();
}

function showPatients() {
  pacientes.forEach((paciente) => {
    const fechaNacimiento = `${paciente.fecha_nacimiento.substring(
      5,
      7
    )}-${paciente.fecha_nacimiento.substring(
      8,
      10
    )}-${paciente.fecha_nacimiento.substring(0, 4)}`;

    const edad = calcularEdad(fechaNacimiento);
    PATIENTS.innerHTML += `
      <div class="patient">
        <p>${paciente.nombre}</p>
        <p>${paciente.rut}</p>
        <p>${edad}</p>
        <div class="buttons">
            <button onclick="editPatient('${paciente.rut}')">Editar</button>
            <button onclick="deletePatient('${paciente.rut}')">Borrar</button>
        </div>
      </div>
    `;
  });
}

const editPatient = (rut) => {
  const paciente = pacientes.find((pac) => pac.rut === rut);

  const FIELDS_GROUP = PATIENT_FORM.children[1];
  FIELDS_GROUP.innerHTML += `
    <div class="form__field">
      <label>Observaciones:</label>
      <textarea placeholder="Ingrese sus observaciones..." maxlength="100" required="" value="${paciente.observaciones}"></textarea>
    </div>
  `;

  const nombre = PATIENT_FORM[0];
  const rutf = PATIENT_FORM[1];
  const fecha_nacimiento = PATIENT_FORM[2];
  const estado_civil = PATIENT_FORM[3];
  const nro_emergencia = PATIENT_FORM[4];
  const plan_salud = PATIENT_FORM[5];
  const afp = PATIENT_FORM[6];
  const enfermedades = PATIENT_FORM[7];

  nombre.value = paciente.nombre;
  rutf.value = paciente.rut;
  fecha_nacimiento.value = paciente.fecha_nacimiento;
  estado_civil.value = paciente.estado_civil;
  nro_emergencia.value = paciente.nro_emergencia.replace("+56", "");
  plan_salud.value = paciente.plan_salud;
  afp.value = paciente.afp;
  enfermedades.value = paciente.enfermedades;

  PATIENT_FORM.classList.add("opened");

  console.log(nombre.value);

  const observaciones = PATIENT_FORM[8];
};

PATIENT_FORM.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = PATIENT_FORM[0];
  const rut = PATIENT_FORM[1];
  const fecha_nacimiento = PATIENT_FORM[2];
  const estado_civil = PATIENT_FORM[3];
  const nro_emergencia = PATIENT_FORM[4];
  const plan_salud = PATIENT_FORM[5];
  const afp = PATIENT_FORM[6];
  const enfermedades = PATIENT_FORM[7];

  const patients = [...pacientes];

  if (patients.find((patient) => patient.rut === rut)) {
    MESSAGE.innerHTML = `El paciente ${nombre} ya ha sido registrado con anterioridad.`;
    setTimeout(() => MESSAGE.classList.toggle("alert--danger"), 2000);
    rut.value = "";
    rut.focus();
  } else {
    patients.push({
      nombre: nombre.value,
      rut: rut.value,
      fecha_nacimiento: fecha_nacimiento.value,
      estado_civil: estado_civil.value,
      nro_emergencia: "+56" + nro_emergencia.value,
      plan_salud: plan_salud.value,
      afp: afp.value,
      enfermedades: enfermedades.value,
      observaciones: "",
    });

    localStorage.setItem("pacientes", JSON.stringify(patients));
    MESSAGE.innerHTML = `${nombre.value} se ha agregado exitosamente.`;

    MESSAGE.classList.toggle("alert--success");
    setTimeout(() => {
      MESSAGE.classList.toggle("alert--success");
      setTimeout(() => {
        window.location.reload();
      }, 300);
    }, 5000);
    nombre.value = "";
    rut.value = "";
    fecha_nacimiento.value = "";
    estado_civil.value = "";
    nro_emergencia.value = "";
    plan_salud.value = "";
    afp.value = "";
    enfermedades.value = "";
    PATIENT_FORM.classList.remove("opened");
  }
});

showPatients();
