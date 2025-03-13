import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css'; // Import CSS module

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'Freelancer',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/users/register', formData);
            console.log(response.data);
            navigate('/login');
            setFormData({ username: '', email: '', password: '', role: 'Freelancer' }); // Clear form.
        } catch (err) {
            setError(err.response?.data?.message || 'Error registering user');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}> {/* Apply container style */}
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <select name="role" value={formData.role} onChange={handleChange} required>
                    <option value="Freelancer">Freelancer</option>
                    <option value="Employer">Employer</option>
                </select>
                <button type="submit" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
            {error && <p className={styles.error}>{error}</p>} {/* Apply error style */}
        </div>
    );
};

export default Register;