import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function AcceptBid() {
  const { jobId } = useParams();
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [role, setRole] = useState(localStorage.getItem('role'));

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/jobs/${jobId}/bids`,{
          headers: { Authorization: token }
        });
        setBids(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bids:', error);
        setError('Error fetching bids');
        setLoading(false);
      }
    };

    fetchBids();
  }, [jobId]);

  const handleAcceptBid = async (bidId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5000/api/jobs/${jobId}/acceptBid`,
        { bidId },
        { headers: { Authorization: token } }
      );
      alert('Bid accepted successfully');
      const updatedBids = bids.map(bid =>
        bid._id === bidId ? { ...bid, status: 'accepted' } : bid
      );
      setBids(updatedBids);

    } catch (error) {
      console.error('Error accepting bid:', error);
      setError('Error accepting bid');
    }
  };

  if (loading) return <div>Loading bids...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Bids</h2>
      <ul>
        {bids.map((bid) => (
          <li key={bid._id}>
            <p>Amount: ${bid.amount}</p>
            {role === 'Employer' && bid.status !== 'accepted' && (
              <button onClick={() => handleAcceptBid(bid._id)}>Accept Bid</button>
            )}
            {bid.status === 'accepted' && <p>Accepted</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AcceptBid;