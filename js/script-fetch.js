let cart = [];

const displayProducts = async () => {
    const container = document.getElementById("products");

    try {
        const response = await fetch("http://localhost:3001/Products");

        if (!response.ok) {
            alert("Error fetching products");
            throw new Error(`Response status: ${response.status}`);
        }

        const products = await response.json();
        container.innerHTML = "";

        products.forEach(prod => {
            const card = document.createElement("div");
            card.classList.add("product-card");

            card.innerHTML = `
                <img src="${prod.imageUrl}" alt="${prod.productName}">
                <h3>${prod.productName}</h3>
                <p>${prod.description}</p>
                <span class="price">R$ ${Number(prod.price).toFixed(2)}</span>
                <button class="add-btn" data-id="${prod.id}">Add to Cart</button>
            `;

            const addButton = card.querySelector(".add-btn");

            addButton.addEventListener("click", () => {
                addToCart(prod);
            });

            container.appendChild(card);
        });

    } catch (error) {
        alert("Failed to connect to server");
        console.error(error.message);
    }
};

function addToCart(product) {
    cart.push(product);
    console.log("Cart updated:", cart);
    alert(`${product.productName} added to cart`);
}
