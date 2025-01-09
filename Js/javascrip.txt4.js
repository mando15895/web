document.addEventListener("DOMContentLoaded", () => {
  const openGoogleMaps = document.getElementById("openGoogleMaps");
  const copiarEmail = document.getElementById("copiarEmail");
  const copiarTelefono = document.getElementById("copiarTelefono");
  const emailContacto = document.getElementById("emailContacto").textContent;
  const telefonoContacto = document.getElementById("telefonoContacto").textContent;

  // Abrir Google Maps
  openGoogleMaps.addEventListener("click", () => {
    window.open("https://www.google.com/maps/place/Plaza+La+Viña,+Alicante", "_blank");
  });

  // Copiar Email al portapapeles
  copiarEmail.addEventListener("click", () => {
    navigator.clipboard.writeText(emailContacto).then(() => {
      alert("Correo copiado al portapapeles.");
    });
  });

  // Copiar Teléfono al portapapeles
  copiarTelefono.addEventListener("click", () => {
    navigator.clipboard.writeText(telefonoContacto).then(() => {
      alert("Teléfono copiado al portapapeles.");
    });
  });
});
