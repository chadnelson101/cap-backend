import express from 'express';
import controller from '../controller/products.js'

const router = express.Router();

router
    .route('/')
        .get(controller.getAllProducts)
        .post(controller.createProduct)

router
    .route('/:id')
        .get(controller.getSingleProduct)
        .delete(controller.deleteProduct)
        .patch(controller.updateProduct)

export default router;
