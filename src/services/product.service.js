import productModel from '../models/product.model.js';

class ProductService {

    async getAll() {
        try {
            const products = await productModel.find();
            return products;
        } catch (error) {
            throw new Error('Error obteniendo productos: ' + error.message);
        }
    }

    async getById(id) {
        try {
            const product = await productModel.findById(id);
            return product;
        } catch (error) {
            throw new Error('Error obteniendo producto: ' + error.message);
        }
    }

    async create(productData) {
        try {
            const newProduct = await productModel.create(productData);
            return newProduct;
        } catch (error) {
            throw new Error('Error creando producto: ' + error.message);
        }
    }

    async update(id, productData) {
        try {
            const updatedProduct = await productModel.findByIdAndUpdate(id, productData, { new: true });
            return updatedProduct;
        } catch (error) {
            throw new Error('Error actualizando producto: ' + error.message);
        }
    }

    async delete(id) {
        try {
            const deletedProduct = await productModel.findByIdAndDelete(id);
            return deletedProduct;
        } catch (error) {
            throw new Error('Error eliminando producto: ' + error.message);
        }
    }

    // Conviene sólo search(params) y luego un if(params = category) o algo así?
    async searchByCategory(category) {
        try {
            const products = await productModel.find({ category: category });
            return products;
        } catch (error) {
            throw new Error('Error buscando productos por categoría: ' + error.message);
        }
    }
}


export default ProductService;