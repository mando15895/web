document.addEventListener("DOMContentLoaded", () => {
    const noticiasContainer = document.getElementById("noticiasContainer");

    // Agregar animación de carga mientras se cargan las noticias
    noticiasContainer.innerHTML = "<p class='loading'>Cargando noticias...</p>";

    // Cargar el archivo JSON
    fetch("../json/noticias.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(noticias => {
            noticiasContainer.innerHTML = ""; // Limpiar la animación de carga

            if (!noticias.length) {
                noticiasContainer.innerHTML = "<p>No hay noticias disponibles.</p>";
                return;
            }

            noticias.forEach(noticia => {
                const noticiaElement = document.createElement("div");
                noticiaElement.classList.add("noticia");

                noticiaElement.innerHTML = `
                    <h3>${noticia.titulo}</h3>
                    <p>${noticia.descripcion}</p>
                    <span class="fecha">${noticia.fecha}</span>
                `;

                noticiasContainer.appendChild(noticiaElement);
            });
        })
        .catch(error => {
            console.error("Error al cargar las noticias:", error);
            noticiasContainer.innerHTML = "<p>Error al cargar las noticias. Revisa la consola para más detalles.</p>";
        });
});
