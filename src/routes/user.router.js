import { Router } from 'express';
import userService from '../services/user.service.js';

const router = Router();


// GET
router.getAll('/', async (req, res) => {
    try {
        const users = await userService.getAll();
        res.json({ status: 200, payload: users });
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

router.getById('/:id', async (req, res) => {
    try {
        const user = await userService.getById(req.params.id);
        res.json({ status: 'success', payload: user });
    }
    catch (error) {
        res.status(404).json({ status: 'error', message: error.message });
    }
});


// POST
router.post('/', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const user = await userService.create({ firstName, lastName, email, password });
        res.json({ status: 200, payload: user._id });
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});


// PUT
router.put('/:id', async (req, res) => {
    try {
        const updateUser = req.body;

        const userResult = await userService.update(req.params.id, updateUser);
        res.json({ status: 200, payload: userResult });
    }

    catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});


// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const userResult = await userService.delete(req.params.id);
        res.json({ status: 200, payload: userResult });
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

export default router;