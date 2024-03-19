import express from 'express';
import controller from '../controller/socials.js'

const router = express.Router();

router
    .route('/')
        .get(controller.getPost)
        .post(controller.createPost)

router
    .route('/:id')
    .delete(controller.deletePost)
    .patch(controller.updatePost)


export default router