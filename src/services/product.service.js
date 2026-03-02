import productModel from '../models/product.model.js';

class ProductService {

    async getAllProducts() {
        try {
            const products = await productModel.find();
            return products;
        } catch (error) {
            throw new Error('Error fetching products: ' + error.message);
        }
    }

    getProductById(id) {
        try {
            const product = productModel.findById(id);
            return product;
        } catch (error) {
            throw new Error('Error fetching product: ' + error.message);
        }
    }

    async createProduct(productData) {
        try {
            const newProduct = await productModel.create(productData);
            return newProduct;
        } catch (error) {
            throw new Error('Error creating product: ' + error.message);
        }
    }
}