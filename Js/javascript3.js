document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("presupuestoForm");
    const presupuestoFinal = document.getElementById("presupuestoFinal");

    // Inputs
    const nombre = document.getElementById("nombre");
    const apellido = document.getElementById("apellido");
    const email = document.getElementById("email");
    const telefono = document.getElementById("telefono");
    const producto = document.getElementById("producto");
    const plazo = document.getElementById("plazo");
    const extras = document.querySelectorAll(".extra");
    const privacidad = document.getElementById("privacidad");

    // Validación en tiempo real
    function validarTexto(input, errorElement, maxLength) {
        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        if (!regex.test(input.value) || input.value.length > maxLength) {
            errorElement.textContent = `Debe contener solo letras (máx ${maxLength} caracteres).`;
            return false;
        } else {
            errorElement.textContent = "";
            return true;
        }
    }

    function validarEmail() {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email.value);
    }

    function validarTelefono() {
        const regex = /^\d{9}$/;
        return regex.test(telefono.value);
    }

    // Cálculo automático del presupuesto
    function calcularPresupuesto() {
        let precioBase = parseFloat(producto.value);
        let descuento = (parseFloat(plazo.value) * 5) / 100;
        let extraCost = 0;

        extras.forEach(extra => {
            if (extra.checked) {
                extraCost += parseFloat(extra.value);
            }
        });

        if (precioBase > 0) {
            let total = precioBase + extraCost;
            total -= total * descuento;
            presupuestoFinal.textContent = `€${total.toFixed(2)}`;
        } else {
            presupuestoFinal.textContent = "€0";
        }
    }

    // Eventos
    nombre.addEventListener("input", () => validarTexto(nombre, document.getElementById("nombreError"), 15));
    apellido.addEventListener("input", () => validarTexto(apellido, document.getElementById("apellidoError"), 40));
    email.addEventListener("input", () => document.getElementById("emailError").textContent = validarEmail() ? "" : "Formato incorrecto");
    telefono.addEventListener("input", () => document.getElementById("telefonoError").textContent = validarTelefono() ? "" : "Debe contener 9 números");
    producto.addEventListener("change", calcularPresupuesto);
    plazo.addEventListener("input", calcularPresupuesto);
    extras.forEach(extra => extra.addEventListener("change", calcularPresupuesto));

    form.addEventListener("submit", (e) => {
        if (!privacidad.checked) {
            document.getElementById("privacidadError").textContent = "Debes aceptar la política de privacidad.";
            e.preventDefault();
        }
    });
});
