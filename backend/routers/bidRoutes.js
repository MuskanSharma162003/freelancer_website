import { Router } from 'express';
import { placeBid, acceptBid } from '../controllers/bid.controller.js';
import { authMiddleware } from '../utils/authMiddleware.js';

const router = Router();

router.post('/place', authMiddleware, placeBid);
router.post('/accept', authMiddleware, acceptBid);

export { router };
