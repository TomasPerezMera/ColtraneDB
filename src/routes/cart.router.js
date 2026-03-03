import { Router } from 'express';
import CartService from '../services/cart.service.js';

const router = Router();

// Middleware para agregar 'io' a req.
router.use((req, res, next) => {
    req.io = req.app.get('io');
    next();
});

// GET
    router.get('/', async (req, res) => {
        try {}
        catch (error) {}
    });