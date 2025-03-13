import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './JobDetail.module.css';

function JobDetail() {
    const { jobId } = useParams();
    const [job, setJob] = useState(null);
    const [bidAmount, setBidAmount] = useState('');
    const [bids, setBids] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [role, setRole] = useState(localStorage.getItem('role'));

    useEffect(() => {
        const fetchJob = async () => {
            if (!jobId) {
                console.error('Job ID is undefined');
                return;
            }

            try {
                const response = await axios.get(`http://localhost:5000/api/jobs/${jobId}`);
                setJob(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching job details:', error);
                setError('Error fetching job details');
                setLoading(false);
            }
        };

        const fetchBids = async () => {
            try {
                const token = localStorage.getItem('token');
                const bidsResponse = await axios.get(`http://localhost:5000/api/jobs/${jobId}/bids`, {
                    headers: { Authorization: token },
                });
                setBids(bidsResponse.data);
            } catch (error) {
                console.error('Error fetching bids:', error);
                setError('Error fetching bids');
            }
        };

        fetchJob();
        fetchBids();
    }, [jobId]);

    const handleBid = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`http://localhost:5000/api/jobs/${jobId}/bid`, { amount: bidAmount }, { headers: { Authorization: token } });
            alert('Bid placed successfully');
            setBidAmount('');
            const bidsResponse = await axios.get(`http://localhost:5000/api/jobs/${jobId}/bids`, { headers: { Authorization: token } });
            setBids(bidsResponse.data);
        } catch (error) {
            console.error('Error placing bid:', error);
            setError('Error placing bid');
        }
    };

    const handleAcceptBid = async (bidId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`http://localhost:5000/api/jobs/${jobId}/acceptBid`, { bidId }, { headers: { Authorization: token } });
            alert('Bid accepted successfully');
            const bidsResponse = await axios.get(`http://localhost:5000/api/jobs/${jobId}/bids`, { headers: { Authorization: token } });
            setBids(bidsResponse.data);
        } catch (error) {
            console.error('Error accepting bid:', error);
            setError('Error accepting bid');
        }
    };

    if (loading) return <div className={styles.loading}>Loading job details...</div>;
    if (error) return <div className={styles.error}>{error}</div>;

    return (
        <div className={styles.container}>
            <h1>{job.title}</h1>
            <p>{job.description}</p>
            <p>Budget: ${job.budget}</p>
            {role === 'Freelancer' && (
                <>
                    <input
                        type="number"
                        placeholder="Enter your bid amount"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                    />
                    <button onClick={handleBid}>Place Bid</button>
                </>
            )}
            {role === 'Employer' && (
                <>
                    <h2>Bids</h2>
                    <ul>
                        {bids.map((bid) => (
                            <li key={bid._id}>
                                <p>Freelancer: {bid.freelancerId?.username || 'Unknown'}</p>
                                <p>Bid Amount: ${bid.amount}</p>
                                {bid.status !== 'accepted' && <button onClick={() => handleAcceptBid(bid._id)}>Accept Bid</button>}
                                {bid.status === 'accepted' && <p className={styles.accepted}>Accepted</p>}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}

export default JobDetail;