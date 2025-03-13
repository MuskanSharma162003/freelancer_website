import express from 'express';
import { router as userRouter } from './routers/userRoutes.js';
import { router as jobRouter } from './routers/jobRoutes.js';
import { router as bidRouter } from './routers/bidRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db.js';

dotenv.config();
const app = express();

app.use(cors()); // Enable CORS
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/jobs', jobRouter);
app.use('/api/bids', bidRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    connectDB();
    console.log(`Server running on port ${port}`);
});