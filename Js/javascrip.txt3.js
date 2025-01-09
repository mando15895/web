document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("presupuestoForm");
  const nombre = document.getElementById("nombre");
  const email = document.getElementById("email");
  const telefono = document.getElementById("telefono");
  const producto = document.getElementById("producto");
  const plazo = document.getElementById("plazo");
  const extras = document.querySelectorAll(".extra");
  const privacidad = document.getElementById("privacidad");
  const presupuestoFinal = document.getElementById("presupuestoFinal");
  const formSuccess = document.getElementById("formSuccess");

  // Validación y cálculo del presupuesto
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let total = 0;

    // Validar campos obligatorios
    const errores = validarFormulario();
    if (errores.length > 0) {
      mostrarErrores(errores);
      return;
    }

    // Sumar el precio del producto seleccionado
    const productoSeleccionado = parseFloat(producto.value);
    if (!isNaN(productoSeleccionado)) {
      total += productoSeleccionado;
    }

    // Sumar los extras seleccionados
    extras.forEach((extra) => {
      if (extra.checked) {
        total += parseFloat(extra.value);
      }
    });

    // Aplicar descuento por plazo
    const meses = parseInt(plazo.value);
    if (!isNaN(meses) && meses > 0) {
      total -= total * (0.05 * meses);
    }

    // Mostrar el presupuesto final
    presupuestoFinal.textContent = `€${total.toFixed(2)}`;
    formSuccess.style.display = "block";
    formSuccess.textContent = "¡Presupuesto calculado con éxito!";
  });

  // Restablecer formulario
  form.addEventListener("reset", () => {
    presupuestoFinal.textContent = "€0";
    formSuccess.style.display = "none";
    limpiarErrores();
  });

  // Validación del formulario
  function validarFormulario() {
    const errores = [];

    if (!/^[a-zA-Z\s]+$/.test(nombre.value) || nombre.value.trim().length === 0) {
      errores.push({ campo: "nombre", mensaje: "El nombre debe contener solo letras." });
    }

    if (!email.validity.valid) {
      errores.push({ campo: "email", mensaje: "Introduce un correo electrónico válido." });
    }

    if (!/^\d{9}$/.test(telefono.value)) {
      errores.push({ campo: "telefono", mensaje: "El teléfono debe tener 9 dígitos." });
    }

    if (!privacidad.checked) {
      errores.push({ campo: "privacidad", mensaje: "Debes aceptar la política de privacidad." });
    }

    return errores;
  }

  // Mostrar errores en los campos correspondientes
  function mostrarErrores(errores) {
    limpiarErrores();
    errores.forEach((error) => {
      const campo = document.getElementById(error.campo);
      const mensajeError = document.getElementById(`${error.campo}Error`);
      if (mensajeError) {
        mensajeError.textContent = error.mensaje;
        mensajeError.style.display = "block";
      }
      campo.classList.add("input-error");
    });
  }

  // Limpiar mensajes de error
  function limpiarErrores() {
    document.querySelectorAll(".error").forEach((error) => {
      error.style.display = "none";
    });
    document.querySelectorAll(".input-error").forEach((input) => {
      input.classList.remove("input-error");
    });
  }
});
