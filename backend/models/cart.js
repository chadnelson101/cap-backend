import {pool} from '../config/config.js'

const getCartWithProductInfo = async () => {
    try {
        // Query the database to retrieve cart items with product information
        const query = `
            SELECT c.*, p.* 
            FROM cart c 
            INNER JOIN products p ON c.product_id = p.prodid
        `;
        const [cartItems] = await pool.query(query);
        return cartItems;
    } catch (error) {
        console.error('Error retrieving cart with product information:', error);
        throw error;
    }
};

    const addToCart = async (user_id, product_id) => {
        const insertQuery = `
            INSERT INTO cart (user_id, product_id)
            VALUES (?, ?)
        `;
        const selectQuery = `
            SELECT p.* FROM products p WHERE p.prodid = ?
        `;

        try {
            // Insert into cart
            await pool.query(insertQuery, [user_id, product_id]);

            // Retrieve product information
            const [productRows] = await pool.query(selectQuery, [product_id]);

            if (productRows.length > 0) {
                const productInfo = productRows[0];
                return productInfo; // Return the product information
            } else {
                throw new Error('Product not found');
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            throw error; // Propagate the error
        }
    };



// Get user's cart
const getUserCartWithProductInfo = async (userId) => {
    try {
        // Query the database to retrieve user's cart items with product information
        const query = `
            SELECT c.*, p.* 
            FROM cart c 
            INNER JOIN products p ON c.product_id = p.prodid
            WHERE c.user_id = ?
        `;
        const [cartItems] = await pool.query(query, [userId]);
        return cartItems;
    } catch (error) {
        console.error('Error retrieving user cart with product information:', error);
        throw error;
    }
};


// Update cart item quantity
const updateCartItemQuantity = async (cartId, quantity) => {
    await pool.query(`UPDATE cart SET quantity = ? WHERE cart_id = ?`, [quantity, cartId]);
};

// Remove item from cart
const removeFromCart = async (cartId) => {
    await pool.query(`DELETE FROM cart WHERE cart_id = ?`, [cartId]);
};

export {addToCart,getUserCartWithProductInfo,updateCartItemQuantity,removeFromCart,getCartWithProductInfo}