    import express from 'express';
    import controller from '../controller/cart.js'


    const router = express.Router();

    router
        .route('/')
        .get(controller.geCart)


    router
        .route('/:userid')
        .get(controller.getUserCart)

    router
        .route('/:user_id, product_id')
        .post(controller.addToCart)

    router
        .route('/:cartId')
        .delete(controller.deleteCart)

    export default router;