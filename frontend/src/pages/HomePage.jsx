import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css'; 

function HomePage() {
    const isLoggedIn = !!localStorage.getItem('token');
    return (
        <main className={styles.main}> 
            <h1>Welcome to the Freelancer Platform</h1>
            <p>Your one-stop destination for posting jobs or finding freelance work!</p>
            <section className={styles.section}> 
                <h2>Are you a Freelancer or Employer?</h2>
                <div className={styles.buttonContainer}> 
                    <Link to="/register" aria-label="Register">
                        <button className={styles.button}> 
                            Register
                        </button>
                    </Link>
                </div>
                <div className={styles.buttonContainer}>
                    <Link to="/login" aria-label="Login">
                        <button className={styles.button}>
                            Login
                        </button>
                    </Link>
                </div>
            </section>
        </main>
    );
}

export default HomePage;