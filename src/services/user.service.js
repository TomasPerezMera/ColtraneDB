import userModel from '../models/user.model.js';

class UserService {

    async getAll() {
        try {
            const users = await userModel.find();
            return users;
        } catch (error) {
            throw new Error('Error obteniendo usuarios: ' + error.message);
        }
    }

    async getById(id) {
        try {
            const user = await userModel.findById(id);
            return user;
        } catch (error) {
            throw new Error('Error obteniendo usuario: ' + error.message);
        }
    }

    async create(userData) {
        try {
            const newUser = await userModel.create(userData);
            return newUser;
        } catch (error) {
            throw new Error('Error creando usuario: ' + error.message);
        }
    }

    async update(id, userData) {
        try {
            const updatedUser = await userModel.findByIdAndUpdate(id, userData, { new: true });
            return updatedUser;
        } catch (error) {
            throw new Error('Error actualizando usuario: ' + error.message);
        }
    }

    async delete(id) {
        try {
            const deletedUser = await userModel.findByIdAndDelete(id);
            return deletedUser;
        } catch (error) {
            throw new Error('Error eliminando usuario: ' + error.message);
        }
    }

    // Conviene sólo search(params) y luego un if(params = category) o algo así?
    async searchByCategory(category) {
        try {
            const users = await userModel.find({ category: category });
            return users;
        } catch (error) {
            throw new Error('Error buscando usuarios por categoría: ' + error.message);
        }
    }

}

export default UserService;