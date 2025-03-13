# Freelancer Platform Backend

This project implements a backend system for a freelancer platform, similar to Fiverr or Upwork, with core functionalities like user registration, job posting, bidding, and job status management.

## Features

-   **User Management:**
    -      User Registration (Freelancer/Employer)
    -      User Authentication (Login with JWT)
-   **Job Management:**
    -      Job Posting (Employers)
    -      Job Bidding (Freelancers)
    -      Bid Acceptance (Employers)
-   **Database:**
    -      Users (username, email, password, role)
    -      Jobs (title, description, budget, employerId)
    -      Bids (jobId, freelancerId, amount, status)

## Technologies Used

-   Node.js
-   Express.js
-   MongoDB (or another suitable database)
-   Mongoose (ODM for MongoDB)
-   JSON Web Tokens (JWT) for authentication
-   bcrypt (for password hashing)
-   dotenv (for environment variable management)

## Setup Instructions

1.  **Clone the Repository:**

    ```bash
    git clone <repository_url>
    cd freelancer-platform-backend
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**

    -      Create a `.env` file in the root directory.
    -      Add the following variables:

        ```
        PORT=5000
        MONGODB_URI=<your_mongodb_uri>
        JWT_SECRET=<your_jwt_secret>
        ```

    -      Replace `<your_mongodb_uri>` and `<your_jwt_secret>` with your actual MongoDB connection string and a secure secret key for JWT.

4.  **Start the Server:**

    ```bash
    npm start
    ```

    The server will start running on the specified port.

## Database Schema

-   **Users:**
    -   `_id`: ObjectId
    -   `username`: String
    -   `email`: String
    -   `password`: String (hashed)
    -   `role`: String ("freelancer" or "employer")

-   **Jobs:**
    -   `_id`: ObjectId
    -   `title`: String
    -   `description`: String
    -   `budget`: Number
    -   `employerId`: ObjectId (reference to Users)

-   **Bids:**
    -   `_id`: ObjectId
    -   `jobId`: ObjectId (reference to Jobs)
    -   `freelancerId`: ObjectId (reference to Users)
    -   `amount`: Number
    -   `status`: String ("pending", "accepted")

## API Endpoints

-   **User Management:**
    -   `POST /api/users/register`: Register a new user.
    -   `POST /api/users/login`: Authenticate a user and return a JWT.
-   **Job Management:**
    -   `POST /api/jobs`: Post a new job (requires authentication).
    -   `GET /api/jobs`: Get all jobs.
    -   `GET /api/jobs/:jobId`: Get a specific job by ID.
    -   `POST /api/jobs/:jobId/bid`: Place a bid on a job (requires authentication).
    -   `GET /api/jobs/:jobId/bids`: get all bids for a job (requires authentication).
    -   `POST /api/jobs/:jobId/acceptBid`: Accept a bid (requires authentication).

## Authentication

-   All protected routes require a valid JWT in the `Authorization` header.
-   The JWT should be in the format `Bearer <token>`.

## Future Enhancements

-   Profile management for users.
-   Payment integration.
-   Messaging system for communication between freelancers and employers.
-   Review and rating system.
-   Search and filtering for jobs.
-   More robust error handling and validation.
-   Unit and integration tests.