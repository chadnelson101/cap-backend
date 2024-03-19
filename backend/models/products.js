import {pool} from '../config/config.js'

const getProducts = async () =>{
    const [products] = await pool.query(`SELECT * FROM products`)
    return products
}

const getProduct = async (prodid) =>{
    const [product] = await pool.query(`SELECT * FROM products WHERE prodid =?`,[prodid])
    return product[0]
}

const createProduct = async (productname,amount,models,producturl) =>{
    const [product] = await pool.query(`INSERT INTO products (productname,amount,models,producturl) VALUES (?,?,?,?)`,[productname,amount,models,producturl])
    return product
}

const updatedProduct = async (productname, amount, models, producturl,prodid) => {
    await pool.query(`UPDATE products SET productname = ?, amount = ?, models = ?, producturl = ? WHERE prodid = ?`,
    [productname,amount,models, producturl,prodid] );
};

const deleteProduct = async (prodid) => {
    await pool.query(`DELETE FROM products WHERE prodid = ?`, [prodid]);
    return getProducts();
};

export {getProducts,getProduct,createProduct,updatedProduct,deleteProduct}