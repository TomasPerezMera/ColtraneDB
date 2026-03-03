import { paginate } from 'mongoose-paginate-v2';
import productModel from '../models/product.model.js';
import io from '../utils/socket.js';

class ProductService {

    async getAll(options = {}) {
        try {
            const {
                page = 1,
                limit = 4,
                sort,
                category,
                artist,
                available
            } = options;

            const filter = {};

            if (category) filter.category = category;
            if (artist) filter.artist = artist;
            if (available !== undefined) filter.isAvailable = available;

            // Opciones de paginación.
            const paginateOptions = {
                page: parseInt(page),
                limit: parseInt(limit),
                sort: sort === 'asc' ? { currentPrice: 1 } :
                sort === 'desc' ? { currentPrice: -1 } : {}
            };

            const result = await productModel.find(filter, paginateOptions);
            return result;
        } catch (error) {
            throw new Error('Error obteniendo productos: ' + error.message);
        }
    }

    async getById(productId) {
    try {
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            throw new Error('ID de producto inválido');
        }
        const product = await productModel.findById(productId);
        if (!product) {
            throw new Error('Producto no encontrado!');
        }
        return product;
    } catch (error) {
            throw new Error('Error obteniendo producto: ' + error.message);
        }
    }

    async create(productData) {
        try {
            const newProduct = await productModel.create(productData);
            io.emit('productCreated', newProduct);
            return newProduct;
        } catch (error) {
            throw new Error('Error creando producto: ' + error.message);
        }
    }

    async update(productId, updateData) {
        try {
            if (!mongoose.Types.ObjectId.isValid(productId)) {
                throw new Error('ID de producto inválido');
            }
            //Si stock llega a 0, marcar como no disponible.
            if (updateData.stock !== undefined && updateData.stock === 0) {
                updateData.isAvailable = false;
            }
            const updatedProduct = await productModel.findByIdAndUpdate(productId, updateData, { new: true, runValidators: true });
            if (!updatedProduct) {
                throw new Error('Producto no encontrado');
            }
            io.emit('productUpdated', updatedProduct);
            return updatedProduct;
        } catch (error) {
            throw new Error('Error actualizando producto: ' + error.message);
        }
    }

    async delete(productId) {
        try {
            if (!mongoose.Types.ObjectId.isValid(productId)) {
                throw new Error('ID de producto inválido');
            }
            const deletedProduct = await productModel.findByIdAndUpdate(productId, { isAvailable: false }, { new: true });
            io.emit('productDeleted', deletedProduct);
            if (!deletedProduct) {
                throw new Error('Producto no encontrado');
            }
            return deletedProduct;
        } catch (error) {
            throw new Error('Error eliminando producto: ' + error.message);
        }
    }

    // Conviene sólo search(params) y luego un if(params = category)?
    async searchByCategory(category) {
        try {
            const products = await productModel.find({ category: category });
            io.emit('productsList', products);
            return products;
        } catch (error) {
            throw new Error('Error buscando productos por categoría: ' + error.message);
        }
    }
}


export default ProductService;