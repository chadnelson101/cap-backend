import express from 'express';
import controller from '../controller/users.js'

const router = express.Router();

router
    .route('/')
        .get(controller.getAllUsers)
        .post(controller.addNewUser)


router
    .route('/:id')
    .get(controller.getSingleUser)
    .patch(controller.editUser)
    .delete(controller.deleteUser)

export default router;