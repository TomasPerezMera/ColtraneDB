import { Router } from 'express';
import ProductService from '../services/product.service.js';

const router = Router();

// Middleware para agregar 'io' a req.
router.use((req, res, next) => {
    req.io = req.app.get('io');
    next();
});

// GET
    router.get('/', async (req, res) => {
        try {
            const products = await ProductService.getAll(req.query);
            res.status(200).json({ status: 'success', payload: products });
        }
        catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    });

    router.get('/:id', async (req, res) => {
        try {
            const product = await ProductService.getById(req.params.id);
            res.status(200).json({ status: 'success', payload: product });
        }
        catch (error) {
            res.status(404).json({ status: 'error', message: error.message });
        }
    });

// POST
    router.post('/', async (req, res) => {
        try {
            const newProduct = await ProductService.create(req.body);
            req.io.emit('newProductAdded', newProduct);
            res.status(201).json({ status: 'success', payload: newProduct });
        } catch (error) {
            res.status(400).json({ status: 'error', message: error.message });
        }
    });

// PUT
    router.put('/:id', async (req, res) => {
        try {
            const updated = await ProductService.update(req.params.id, req.body);
            req.io.emit('productUpdated', updated);
            if (updated.stock === 0) {
                req.io.emit('productOutOfStock', updated._id);
            }
            res.status(200).json({ status: 'success', payload: updated });
        } catch (error) {
            res.status(400).json({ status: 'error', message: error.message });
        }
    });

// DELETE
    router.delete('/:id', async (req, res) => {
        try {
            const deleted = await ProductService.delete(req.params.id);
            req.io.emit('productDeleted', deleted);
            res.status(200).json({ status: 'success', payload: deleted });
        } catch (error) {
            res.status(404).json({ status: 'error', message: error.message });
        }
    });

export default router;