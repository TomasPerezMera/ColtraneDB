import { Router } from 'express';
import { userModel } from '../models/user.model.js';

const router = Router();

// GET
router.get('/', async (req, res) => {
    try {
        const users = await userModel.find();
        res.send({ status: 200, payload: users });
    }
    catch (error) {
        console.log(`Error al obtener datos: error: ${error}`);
        res.status(500).json({ error: error.message });
    }
});


// POST
router.post('/', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const user = await userModel.create({ firstName, lastName, email, password });
        console.log(user);
        res.send({ status: 200, payload: user._id });
    }
    catch (error) {
        console.log(`Error al crear usuario: error: ${error}`);
        res.status(500).json({ error: error.message });
    }
});


// PUT
router.put('/:id', async (req, res) => {
});


// DELETE
router.delete('/:id', async (req, res) => {
});


export default router;