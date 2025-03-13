import React, { useState } from 'react';
import axiosInstance from '../../axios';
import styles from './PostJob.module.css'; // Import CSS module

function PostJob() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [budget, setBudget] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            await axiosInstance.post(
                '/jobs/post',
                { title, description, budget },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Job posted successfully');
            setTitle('');
            setDescription('');
            setBudget('');
        } catch (err) {
            console.error('Error posting job:', err);
            setError(err.response?.data?.message || 'Error posting job');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Post a Job</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Job Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Job Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Posting...' : 'Post Job'}
                </button>
            </form>
            {error && <p className={styles.error}>{error}</p>}
            {loading && <p className={styles.loading}>Posting...</p>}
        </div>
    );
}

export default PostJob;