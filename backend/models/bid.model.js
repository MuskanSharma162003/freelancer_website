import mongoose from 'mongoose';

const bidSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Job',
        required: true
    },
    freelancerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted'],
        default: 'pending'
    }
}, { timestamps: true });

export const Bid = mongoose.model('Bid', bidSchema);
