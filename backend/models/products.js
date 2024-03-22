import {pool} from '../config/config.js'

const getProducts = async () =>{
    const [products] = await pool.query(`SELECT * FROM products`)
    return products
}

const getProduct = async (prodid) =>{
    const [product] = await pool.query(`SELECT * FROM products WHERE prodid =?`,[prodid])
    return product[0]
}

const createProduct = async (productname,amount,models,producturl,description) =>{
    const [product] = await pool.query(`INSERT INTO products (productname,amount,models,producturl,description) VALUES (?,?,?,?,?)`,[productname,amount,models,producturl,description])
    return product
}

const updatedProduct = async (productname, amount, models, producturl,description,prodid) => {
    await pool.query(`UPDATE products SET productname = ?, amount = ?, models = ?, producturl = ?, description =? WHERE prodid = ?`,
    [productname,amount,models, producturl,description,prodid] );
};

const deleteProduct = async (prodid) => {
    await pool.query(`DELETE FROM products WHERE prodid = ?`, [prodid]);
    return getProducts();
};

export {getProducts,getProduct,createProduct,updatedProduct,deleteProduct}