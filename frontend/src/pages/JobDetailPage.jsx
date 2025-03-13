// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// function JobDetailPage() {
//     const { jobId } = useParams();
//     const [job, setJob] = useState(null);
//     const [bidAmount, setBidAmount] = useState('');
//     const [bids, setBids] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [bidLoading, setBidLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [role, setRole] = useState(null); // Initialize role to null

//     useEffect(() => {
//         const fetchJobDetails = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:5000/api/jobs/${jobId}`);
//                 setJob(response.data);
//                 setLoading(false);
//             } catch (err) {
//                 console.error('Error fetching job details:', err);
//                 setError(err.response?.data?.message || 'Error fetching job details');
//                 setLoading(false);
//             }
//         };

//         const fetchBids = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const response = await axios.get(`http://localhost:5000/api/jobs/${jobId}/bids`, {
//                     headers: { Authorization: token },
//                 });
//                 setBids(response.data);
//                 console.log("Frontend Bids:", response.data);
//             } catch (err) {
//                 console.error('Error fetching bids:', err);
//                 setError(err.response?.data?.message || 'Error fetching bids');
//             }
//         };

//         const getRole = () => {
//           setRole(localStorage.getItem('role'));
//         }

//         fetchJobDetails();
//         getRole();
//         fetchBids();
//     }, [jobId]);
//   const handleBid = async () => {
//     setBidLoading(true);
//     setError(null);
//     try {
//       const token = localStorage.getItem('token');
//       await axios.post(`http://localhost:5000/api/jobs/${jobId}/bid`, { amount: bidAmount }, {
//         headers: { Authorization: token },
//       });
//       alert('Bid placed successfully');
//       setBidAmount('');
//       fetchBids();
//     } catch (err) {
//       console.error('Error placing bid:', err);
//       setError(err.response?.data?.message || 'Error placing bid');
//     } finally {
//       setBidLoading(false);
//     }
//   };

//   if (loading) return <div>Loading job details...</div>;
//   if (error) return <div style={{ color: 'red' }}>{error}</div>;

//   return (
//     <div>
//       <h1>{job?.title}</h1>
//       <p>{job?.description}</p>
//       <p>Budget: ${job?.budget}</p>
//       {role === 'Freelancer' && (
//         <>
//           <input
//             type="number"
//             placeholder="Enter your bid amount"
//             value={bidAmount}
//             onChange={(e) => setBidAmount(e.target.value)}
//           />
//           <button onClick={handleBid} disabled={bidLoading}>
//             {bidLoading ? 'Placing Bid...' : 'Place Bid'}
//           </button>
//         </>
//       )}
//       {role === 'Employer' && (
//     <>
//         <h2>Bids</h2>
//         <p>Click the button to accept a bid</p>
//         <ul>
//             {bids.map((bid) => (
//                 <li key={bid._id}>
//                     <p>Freelancer: {bid.freelancerId?.username || 'Unknown'}</p>
//                     <p>Bid Amount: ${bid.amount}</p>
//                     <button>Accept Bid</button>
//                 </li>
//             ))}
//         </ul>
//     </>
// )}
//     </div>
//   );
// }

// export default JobDetailPage;