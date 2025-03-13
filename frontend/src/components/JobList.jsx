import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/jobs/all');
      setJobs(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError(err.message || 'An error occurred while fetching jobs.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) return <div>Loading jobs...</div>;
  if (error) return <div>{error}</div>;
  if (jobs.length === 0) return <div>No jobs available.</div>;

  return (
    <div>
      <h1>Available Jobs</h1>
      <ul>
        {jobs.map((job) => (
          <li key={job._id}>
            <Link key={job._id} to={`/job/${job._id}`}>{job.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JobList;