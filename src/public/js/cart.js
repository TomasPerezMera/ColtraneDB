// Código para manejar el carrito de compras utilizando localStorage
// si no hay un Usuario autenticado.
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ productId: '123abc', quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));