document.addEventListener("DOMContentLoaded", () => {
  const searchField = document.getElementById("searchField");
  const searchButton = document.getElementById("searchButton");
  const productList = document.getElementById("productList");
  const noResults = document.getElementById("noResults");

  // Lista de productos
  const products = [
    { name: "Sealed Kit", price: 25, image: "imagenes/sealedkit.jpg" },
    { name: "Booster Pack Crown", price: 85, image: "imagenes/boosterpackcrown.jpg" },
    { name: "Booster box Mercurial Heart", price: 80, image: "imagenes/MercurialHeart.jpg" },
    { name: "Tonoris Starter", price: 15, image: "imagenes/TonorisStarter.webp" },
    { name: "Fundas Merlin", price: 12, image: "imagenes/fundasmerlin.jpg" },
    { name: "Booster Mortal Ambition", price: 90, image: "imagenes/mortalambition.png" },
    { name: "Starter Alchemical", price: 35, image: "imagenes/starteralchemical.png" },
  ];

  // Función para mostrar productos en la página
  function renderProducts(productArray) {
    productList.innerHTML = "";
    if (productArray.length > 0) {
      noResults.style.display = "none";
      productArray.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>€${product.price}</p>
        `;
        productList.appendChild(productElement);
      });

    } else {
      noResults.style.display = "block";
    }
  }

  // Mostrar productos al cargar la página
  renderProducts(products);

  // Búsqueda en tiempo real
  function searchProducts() {
    const searchTerm = searchField.value.toLowerCase().trim();
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    );
    renderProducts(filteredProducts);
  }

  searchButton.addEventListener("click", searchProducts);
  searchField.addEventListener("keyup", searchProducts);
});
