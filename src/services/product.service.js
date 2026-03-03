import productModel from '../models/product.model.js';
import io from '../utils/socket.js';

class ProductService {

    async getAll() {
        try {
            const products = await productModel.find();
            io.emit('productsList', products);
            return products;
        } catch (error) {
            throw new Error('Error obteniendo productos: ' + error.message);
        }
    }

    async getById(id) {
        try {
            const product = await productModel.findById(id);
            io.emit('productDetails', product);
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

    async update(id, productData) {
        try {
            const updatedProduct = await productModel.findByIdAndUpdate(id, productData, { new: true });
            io.emit('productUpdated', updatedProduct);
            return updatedProduct;
        } catch (error) {
            throw new Error('Error actualizando producto: ' + error.message);
        }
    }

    async delete(id) {
        try {
            const deletedProduct = await productModel.findByIdAndDelete(id);
            io.emit('productDeleted', deletedProduct);
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