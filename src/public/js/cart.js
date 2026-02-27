async function addToCart(productId, quantity = 1) {
    // Si hay usuario logueado → POST a /api/carts/:cid/products/:pid
    // Si NO hay usuario → guardar en localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ productId, quantity });
    localStorage.setItem('cart', JSON.stringify(cart));
}


// Sincronizamos el carrito local con el servidor cuando el Usuario inicia sesión.
async function syncCartOnLogin() {
    const localCart = JSON.parse(localStorage.getItem('cart'));
    if (localCart && localCart.length > 0) {
        await fetch('/api/carts/sync', {
            method: 'POST',
            body: JSON.stringify({ products: localCart })
        });
        localStorage.removeItem('cart');
    }
}

function displayCart() {
    // Renderizar productos en el DOM
}