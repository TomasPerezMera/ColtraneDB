document.addEventListener('DOMContentLoaded', () => {
    // Creamos un carrito si no existe.
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
        fetch('/api/carts', { method: 'POST' })
            .then(r => r.json())
            .then(data => {
                localStorage.setItem('cartId', data.payload._id);
            });
    }

    // Agregar al carrito.
    document.querySelectorAll('[data-id]').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const productId = e.target.dataset.id;
            const cartId = localStorage.getItem('cartId');
            await fetch(`/api/carts/${cartId}/products/${productId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ quantity: 1 })
            });
            Swal.fire('Producto agregado!!!!');
        });
    });

    // Actualizar link del carrito
    const cartLink = document.getElementById('cart-link');
    if (cartLink) {
        const cartId = localStorage.getItem('cartId');
        if (cartId) {
            cartLink.href = `/carts/${cartId}`;
        }
    }
});