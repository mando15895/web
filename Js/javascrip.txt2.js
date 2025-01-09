document.addEventListener("DOMContentLoaded", () => {
  const searchField = document.getElementById("searchField");
  const searchButton = document.getElementById("searchButton");
  const productList = document.getElementById("productList");
  const noResults = document.getElementById("noResults");

  // Lista de productos (puedes añadir más aquí)
  const products = [
    { name: "Sealed Kit", price: 25, image: "imagenes/sealedkit.jpg" },
    { name: "Booster Pack Crown", price: 5, image: "imagenes/boosterpackcrown.jpg" },
  ];

  // Evento de búsqueda
  searchButton.addEventListener("click", () => {
    const searchTerm = searchField.value.toLowerCase();
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    );

    productList.innerHTML = "";

    if (filteredProducts.length > 0) {
      noResults.style.display = "none";
      filteredProducts.forEach((product) => {
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
  });
});


