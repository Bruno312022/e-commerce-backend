// cart functionality
let cart = [];

const fetchProducts = async () => {
    const accessToken = localStorage.getItem("accessToken");

    // auth 
    if (!accessToken) {
        alert("You must have an access token to access this page");
        window.location.href = "index.html";
        return;
    }

    try {
        // 2. Fetch protected with TOKEN
        const response = await fetch("http://localhost:3001/products", {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });

        // 3. if invalid or expired
        if (!response.ok) {
            alert("Token expired or unauthorized. Login again.");
            window.location.href = "index.html";
            return;
        }

        const products = await response.json();

        const container = document.getElementById("products");
        container.innerHTML = "";

        // 4. Monta os cards normalmente
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

            addButton.addEventListener("click", () => addToCart(prod));

            container.appendChild(card);
        });

    } catch (error) {
        alert("Failed to connect to server");
        console.error(error);
    }
};

function addToCart(product) {
    cart.push(product);
    console.log("Cart updated:", cart);
    alert(`${product.productName} added to cart`);
}

function logout() {
    setTimeout(() => {
        localStorage.clear()
        window.location.href = "index.html";
        window.alert("accessToken and refreshToken removed!");
    }, 800)
}
