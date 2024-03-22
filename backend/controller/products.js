import {getProducts,getProduct,createProduct,updatedProduct,deleteProduct} from '../models/products.js'


export default{
    getAllProducts: async (req, res) => {
        try{
        res.send(await getProducts())
        }catch (error){
            console.error('Error fetching products', error);
            res.status(404).send("Error fetching products");
        }
    },
    
    getSingleProduct: async (req, res) => {
        const prodid = +req.params.id;
        try {
            const product = await getProduct(prodid);
            res.send(product);
        } catch (error) {
            res.status(404).send("Error fetching product");
        }
    },
    
    createProduct: async (req, res) => {
        try{
            const {productname,amount,models,producturl,description}=req.body;
            await createProduct(productname, amount, models, producturl,description);
            res.send(await getProducts())
            res.send({ 
                msg: 'Product added successfully', products 
            });
        }catch (error){
            console.error('Error adding product', error);
            res.status(404).send("Error adding product");
        }
    },
    
    updateProduct: async (req, res) => {
        try {
            const [product] = await getProducts(+req.params.id);
            const { productname,amount,models,producturl,description} = req.body;
    
            const updatedProductName = productname || product.productname;
            const updatedAmount = amount || product.amount;
            const updatedModels = models || product.models;
            const updatedProductUrl = producturl || product.producturl;
            const updatedDescription = description || product.description;
    
            await updatedProduct(updatedProductName,updatedAmount, updatedModels, updatedProductUrl,updatedDescription, +req.params.id);
            res.send(await getProducts());
        } catch (error) {
            console.error('Error updating product:', error);
            res.status(404).json({ error: 'Error updating product'});
        }
        },
    
    deleteProduct: async (req, res) => {
        try {
            const productId = req.params.id;
            await deleteProduct(productId);
            const products = await getProducts();
            res.send({ msg: 'Product deleted successfully', products });
        } catch (err) {
            console.error('Error deleting product:', err);
            res.status(404).json({ error: 'Error deleting product' });
        }
    }
}