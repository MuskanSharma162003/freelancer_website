import { Job } from '../models/job.model.js';
import { Bid } from '../models/bid.model.js';
export const postJob = async (req, res) => {
  const { title, description, budget } = req.body;
  const employerId = req.user?.userId; // Change userId to employerId

  try {
    console.log("Posting Job - Title:", title);
    console.log("Posting Job - Description:", description);
    console.log("Posting Job - Budget:", budget);
    console.log("Posting Job - employerId:", employerId); //Log employerId

    const job = new Job({ title, description, budget, employerId }); // Use employerId
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    console.error("Error posting job:", error);
    res.status(500).json({ message: 'Error posting job', error: error.message });
  }
};
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs', error });
  }
};

export const getJobById = async (req, res) => {
  const { jobId } = req.params;

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching job details', error });
  }
};

export const placeBid = async (req, res) => {
  const { jobId } = req.params;
  const { amount } = req.body;
  console.log("req.user.userId:", req.user?.userId);
  const freelancerId = req.user?.userId; // Change userId to freelancerId

  try {
    console.log("Job ID:", jobId);
    console.log("Amount:", amount);
    console.log("User ID:", freelancerId); // Log freelancerId

    const bid = new Bid({ jobId, freelancerId, amount }); // Use freelancerId
    await bid.save();

    res.status(201).json(bid);
  } catch (error) {
    console.error('Error placing bid:', error);
    res.status(500).json({ message: 'Error placing bid', error: error.message });
  }
};

export const acceptBid = async (req, res) => {
  const { jobId } = req.params;
  const { bidId } = req.body;

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const bid = await Bid.findById(bidId);
    if (!bid) {
      return res.status(404).json({ message: 'Bid not found' });
    }

    bid.status = 'accepted';
    await bid.save();

    res.status(200).json({ message: 'Bid accepted', bid });
  } catch (error) {
    res.status(500).json({ message: 'Error accepting bid', error });
  }
};

export const getBidsForJob = async (req, res) => {
  const { jobId } = req.params;

  try {
      const bids = await Bid.find({ jobId })
          .populate({
              path: 'freelancerId',
              select: 'username'
          });
      console.log("Bid data", bids); // Add this log
      res.status(200).json(bids);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching bids', error });
  }
};