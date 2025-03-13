import express from 'express';
import { postJob, getJobs, getJobById, acceptBid, placeBid, getBidsForJob } from '../controllers/job.controller.js';
import { authMiddleware } from '../utils/authMiddleware.js';
import { roleMiddleware } from '../utils/roleMiddleware.js';

const router = express.Router();

router.post('/post', authMiddleware, roleMiddleware(['Employer']), postJob);
router.get('/all', getJobs);
router.get('/:jobId', getJobById);
router.get('/:jobId/bids', authMiddleware, roleMiddleware(['Employer', 'Freelancer']), getBidsForJob); // Add this route
router.post('/:jobId/bid', authMiddleware, roleMiddleware(['Freelancer']), placeBid);
router.post('/:jobId/acceptBid', authMiddleware, roleMiddleware(['Employer']), acceptBid);

export { router };