
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
    const cartId = getCartId();
    if (!cartId) {
        console.error("Carrito no encontrado. Por favor, recarga la página.");
        return;
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

// Event Listeners.
function initCartButtons() {
    document.querySelectorAll(".remove-btn").forEach(btn => {
        btn.addEventListener("click", e => {
            const productId = e.target.dataset.productId;
            removeFromCart(productId);
        });
    });
    const clearBtn = document.getElementById("clear-cart-btn");
    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            clearCart();
        });
    }
}

function initAddToCartButtons() {
    document.body.addEventListener("click", async (e) => {
        const btn = e.target.closest(".add-to-cart");
        if (!btn) return;
        const productId = btn.dataset.productId;
        const cartId = localStorage.getItem("cartId");
        await fetch(`/api/carts/${cartId}/products/${productId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ quantity: 1 })
        });
        updateCartCounter();
        animateCartIcon();
    });
}

function initCartPageButtons() {
    document.body.addEventListener("click", async (e) => {
        const removeBtn = e.target.closest(".remove-from-cart");
        if (removeBtn) {
            const productId = removeBtn.dataset.productId;
            const cartId = localStorage.getItem("cartId");
            await fetch(`/api/carts/${cartId}/products/${productId}`, {
                method: "DELETE"
            });
            location.reload();
        }
        const clearBtn = e.target.closest(".clear-cart");
        if (clearBtn) {
            const cartId = localStorage.getItem("cartId");
            await fetch(`/api/carts/${cartId}`, {
                method: "DELETE"
            });
            location.reload();
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

// Event Listener para carga de página.
document.addEventListener("DOMContentLoaded", async () => {
    await initCart();
    initAddToCartButtons();
    initCartPageButtons();
    updateCartCounter();
});