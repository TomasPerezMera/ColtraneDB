import { Router } from 'express';
import ProductService from '../services/product.service.js';
import CartService from '../services/cart.service.js';

const router = Router();

// GET /products - Catálogo paginado.
router.get('/products', async (req, res) => {
    try {
        const products = await ProductService.getAll(req.query);
        res.render('products', {
            title: 'Catálogo',
            products
        });
    } catch (error) {
        res.render('error', { message: error.message });
    }
});

// GET /products/:pid - Detalle del producto.
router.get('/products/:pid', async (req, res) => {
    try {
        const product = await ProductService.getById(req.params.pid);
        res.render('product-detail', {
            title: product.name,
            product
        });
    } catch (error) {
        res.render('error', { message: error.message });
    }
});

// GET /carts/:cid - Vista del carrito.
router.get('/carts/:cid', async (req, res) => {
    try {
        const cart = await CartService.getById(req.params.cid);
        res.render('cart', {
            title: 'Tu Carrito',
            cart
        });
    } catch (error) {
        res.render('error', { message: error.message });
    }
});

export default router;