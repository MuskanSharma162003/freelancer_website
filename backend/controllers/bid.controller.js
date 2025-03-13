import { Bid } from "../models/bid.model.js";

// Place a bid
export const placeBid = async (req, res) => {
    try {
        const { jobId, amount } = req.body;
        const freelancerId = req.userId;

        if (!amount || amount <= 0) {
            return res.status(400).json({ message: "Bid amount must be a positive number." });
        }

        const bid = new Bid({ jobId, freelancerId, amount });

        await bid.save();

        res.status(201).json({ message: 'Bid placed successfully', bid });
    } catch (error) {
        res.status(500).json({ message: 'Error placing bid', error: error.message });
    }
};

// Accept a bid
export const acceptBid = async (req, res) => {
    try {
        const { bidId } = req.body;

        const bid = await Bid.findByIdAndUpdate(bidId, { status: 'accepted' }, { new: true });
        if (!bid) {
            return res.status(404).json({ message: 'Bid not found' });
        }

        res.status(200).json({ message: 'Bid accepted successfully', bid });
    } catch (error) {
        res.status(500).json({ message: 'Error accepting bid', error: error.message });
    }
};