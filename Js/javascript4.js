document.addEventListener("DOMContentLoaded", function () {
    // Inicializar el mapa
    var map = L.map('map').setView([38.3452, -0.4949], 15); // Coordenadas de Alicante, España

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Marcador del negocio
    var marker = L.marker([38.3452, -0.4949]).addTo(map)
        .bindPopup("MS COLLECTOR - Plaza La Viña, Alicante")
        .openPopup();

    // Obtener la ubicación del usuario
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var userLat = position.coords.latitude;
            var userLon = position.coords.longitude;

            // Marcador de la ubicación del usuario
            var userMarker = L.marker([userLat, userLon], { color: 'blue' }).addTo(map)
                .bindPopup("Tu ubicación")
                .openPopup();

            // Dibujar la ruta desde el usuario hasta el negocio
            L.Routing.control({
                waypoints: [
                    L.latLng(userLat, userLon), // Ubicación del usuario
                    L.latLng(38.3452, -0.4949) // Ubicación del negocio
                ],
                routeWhileDragging: true
            }).addTo(map);

        }, function () {
            alert("No se pudo obtener tu ubicación. Activa el GPS para calcular la ruta.");
        });
    } else {
        alert("Tu navegador no soporta la geolocalización.");
    }

    // Botón para abrir Google Maps
    document.getElementById("openGoogleMaps").addEventListener("click", function () {
        window.open("https://www.google.com/maps?q=Plaza+La+Viña,+Alicante,+España", "_blank");
    });

    // Función para copiar datos al portapapeles
    function copiarAlPortapapeles(id) {
        var texto = document.getElementById(id).innerText;
        navigator.clipboard.writeText(texto).then(() => {
            alert("Copiado: " + texto);
        });
    }

    document.getElementById("copiarEmail").addEventListener("click", function () {
        copiarAlPortapapeles("emailContacto");
    });

    document.getElementById("copiarTelefono").addEventListener("click", function () {
        copiarAlPortapapeles("telefonoContacto");
    });

});
