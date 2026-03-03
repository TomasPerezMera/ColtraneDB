import userModel from '../models/user.model.js';
import mongoose from 'mongoose';

class UserService {

    async getAll(options = {}) {
        try {
            const { page = 1, limit = 10 } = options;
            return await userModel.paginate({}, { page, limit });
        } catch (error) {
            throw new Error(`Error al obtener usuarios: ${error.message}`);
        }
    }

    async getById(userId) {
        try {
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                throw new Error('ID de usuario inválido');
            }
            const user = await userModel.findById(userId);
            if (!user) throw new Error('Usuario no encontrado');
            return user;
        } catch (error) {
            throw new Error(`Error obteniendo usuario: ${error.message}`);
        }
    }

    async create(userData) {
        try {
            const newUser = await userModel.create(userData);
            return newUser;
        } catch (error) {
            throw new Error(`Error creando usuario: ${error.message}`);
        }
    }

    async update(userId, updateData) {
        try {
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                throw new Error('ID de usuario inválido');
            }
            const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });
            if (!updatedUser) throw new Error('Usuario no encontrado');
            return updatedUser;
        } catch (error) {
            throw new Error(`Error actualizando usuario: ${error.message}`);
        }
    }

    async delete(userId) {
        try {
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                throw new Error('ID de usuario inválido');
            }
            const deletedUser = await userModel.findByIdAndDelete(userId);
            return deletedUser;
        } catch (error) {
            throw new Error(`Error eliminando usuario: ${error.message}`);
        }
    }
}

export default new UserService();