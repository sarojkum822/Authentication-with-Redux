import express from 'express';
import { body } from 'express-validator';
import { createProduct, getProduct, updateProduct, deleteProduct, addReview, getAllProducts } from '../controllers/product.controllers.js';
import authenticate from '../middlewares/auth.js';
import isAdmin from '../middlewares/productAuth.js';
import upload from '../middlewares/upload.js';  // Import the Multer configuration

const router = express.Router();

router.post(
    '/createProduct',
    authenticate,
    isAdmin,
    upload.single('image'),  // Multer middleware to handle single file upload
    [
        body('name').notEmpty().withMessage('Product name is required'),
        body('description').notEmpty().withMessage('Product description is required'),
        body('price').isFloat({ min: 0 }).withMessage('Product price must be a positive number'),
        body('category').notEmpty().withMessage('Product category is required'),
        body('brand').notEmpty().withMessage('Product brand is required'),
        body('stock').isInt({ min: 0 }).withMessage('Product stock cannot be negative')
    ],
    createProduct
);
router.get('/getallproducts', getAllProducts);
router.get('/:id', getProduct);
router.put('/:id', authenticate, isAdmin, updateProduct);
router.delete('/:id', authenticate, isAdmin, deleteProduct);
router.post('/:id/review', authenticate, addReview);

export default router;
