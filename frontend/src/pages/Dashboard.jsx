import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../axios';
import styles from './Dashboard.module.css';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log("Token:", token);

        if (!token) {
          setError('Authentication token missing.');
          setLoading(false);
          return;
        }

        const userResponse = await axiosInstance.get('/users/profile', {
          headers: { Authorization: token },
        });

        setUser(userResponse.data);
        console.log("userResponse.data:", userResponse.data);

        const jobsResponse = await axiosInstance.get('/jobs/all', {
          headers: { Authorization: token },
        });

        setJobs(jobsResponse.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.response?.data?.message || 'Error fetching data.');
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>
      {user && <p>Welcome, {user.username}</p>}
      <h2>Jobs</h2>
      <ul>
        {jobs.map((job) => (
          <li key={job._id}>
            <Link to={`/job/${job._id}`}>{job.title}</Link>
          </li>
        ))}
      </ul>
      {user.role=="Employer"?<div>
        <Link to="/job/post" aria-label="Post a Job">
          <button style={{ margin: '10px', padding: '10px 20px', borderRadius: '5px' }}>
            Post a Job
          </button>
        </Link>
      </div>:""}
    </div>
  );
}

export default Dashboard;