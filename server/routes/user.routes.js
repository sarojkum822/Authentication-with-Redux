import express from 'express';
import { register, login, getProfileDetails, getDetails, logout } from '../controllers/user.controllers.js';
import authenticate from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticate, getProfileDetails);
router.get('/details/:id', authenticate, getDetails);
router.post('/logout', logout);

export default router;

