// Obtención del carrito.
function getCartId() {
    return localStorage.getItem("cartId");
}

function setCartId(id) {
    localStorage.setItem("cartId", id);
}

// Inicialización del carrito.
async function initCart() {
    let cartId = localStorage.getItem("cartId");
    if (!cartId) {
        const res = await fetch("/api/carts", { method: "POST" });
        const data = await res.json();
        cartId = data.payload._id;
        localStorage.setItem("cartId", cartId);
    }
    return cartId;
}

// Añadir un producto al carrito.
async function addToCart(productId, quantity = 1) {
    let cartId = getCartId();
    if (!cartId) {
        cartId = await initCart();
    }
    const res = await fetch(`/api/carts/${cartId}/products/${productId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ quantity })
    });
    if (!res.ok) {
        const err = await res.json();
        console.error(err.message);
        return;
    }
    updateCartCounter();
    animateCartIcon();
}

// Eliminar un producto del carrito.
async function removeFromCart(productId) {
    const cartId = getCartId();
    await fetch(`/api/carts/${cartId}/products/${productId}`, {
        method: "DELETE"
    });
    location.reload();
}

// Vaciar el carrito.
async function clearCart() {
    const cartId = getCartId();
    await fetch(`/api/carts/${cartId}`, {
        method: "DELETE"
    });
    location.reload();
}

// Helper Functions.
function animateCartIcon() {
    const cartIcon = document.querySelector(".cart-icon");
    if (!cartIcon) return;
    cartIcon.classList.add("cart-bump");
    setTimeout(() => {
        cartIcon.classList.remove("cart-bump");
    }, 300);
}

// Event Listeners de botones.
function initAddToCartButtons() {
    document.body.addEventListener("click", async (e) => {
        const btn = e.target.closest(".add-to-cart");
        if (!btn) return;
        const productId = btn.dataset.productId;
        await addToCart(productId, 1);
    });
}

function initCartPageButtons() {
    document.body.addEventListener("click", async (e) => {
        const removeBtn = e.target.closest(".remove-from-cart");
        if (removeBtn) {
            const productId = removeBtn.dataset.productId;
            await removeFromCart(productId);
        }
        const clearBtn = e.target.closest(".clear-cart");
        if (clearBtn) {
            await clearCart();
        }
    });
}

async function updateCartCounter() {
    const cartId = localStorage.getItem("cartId");
    if (!cartId) return;
    const res = await fetch(`/api/carts/${cartId}`);
    const data = await res.json();
    const count = data.payload.products.length;
    const counter = document.getElementById("cart-count");
    if (counter) counter.textContent = count;
}

// Event Listeners en la carga de página.
document.addEventListener("DOMContentLoaded", async () => {
    await initCart();
    initAddToCartButtons();
    initCartPageButtons();
    updateCartCounter();
});