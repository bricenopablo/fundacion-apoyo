const insumos = JSON.parse(localStorage.getItem("insumos"));

if (!localStorage.getItem("insumos") || typeof insumos !== "object") {
  localStorage.setItem("insumos", "[]");
}

function borrarInsumo(codigo) {
  const ins = [...insumos];

  const newIns = ins.filter((insumo) => insumo.codigo !== codigo);
  localStorage.setItem("insumos", JSON.stringify(newIns));
  window.location.reload();
}

const showIns = () => {
  const ins = document.querySelector(".patients");
  ins.innerHTML = "";

  if (insumos) {
    insumos.forEach((insumo) => {
      ins.innerHTML = `
        <div class="patient">
          <p>${insumo.codigo}</p>
          <p>${insumo.nombre}</p>
          <p>${insumo.cantidad}</p>
          <p>${insumo.bioequivalente}</p>
          <div class="buttons">
            <button>Editar</button>
            <button onclick="borrarInsumo('${insumo.codigo}')">Borrar</button>
          </div>
        </div>
      `;
    });
  }
};

PATIENT_FORM.addEventListener("submit", (e) => {
  e.preventDefault();

  const codigo = PATIENT_FORM[0];
  const nombre = PATIENT_FORM[1];
  const vencimiento = PATIENT_FORM[2];
  const cantidad = PATIENT_FORM[3];
  const bioequivalente = PATIENT_FORM[4];
  const ingredientes = PATIENT_FORM[5];

  const ins = [...insumos];

  ins.push({
    codigo: codigo.value,
    nombre: nombre.value,
    vencimiento: vencimiento.value,
    cantidad: cantidad.value,
    bioequivalente: bioequivalente.value,
    ingredientes: ingredientes.value,
  });

  localStorage.setItem("insumos", JSON.stringify(ins));

  MESSAGE.innerHTML = "Se ha agregado con exito el insumo.";
  MESSAGE.classList.toggle("alert--success");
  setTimeout(() => {
    MESSAGE.classList.toggle("alert--success");
    setTimeout(() => {
      window.location.reload();
    }, 300);
  }, 2000);
});

showIns();
