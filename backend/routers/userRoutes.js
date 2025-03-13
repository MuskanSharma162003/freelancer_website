import express from 'express';
import { register, login, getUserProfile } from '../controllers/userAuth.controller.js';
import { authMiddleware } from '../utils/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleware, getUserProfile);

export { router };