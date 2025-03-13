import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import JobDetail from './components/JobDetail';
import Register from './components/Register';
import Login from './components/Login';
import PostJob from './components/PostJob';
import JobList from './components/JobList';
import AcceptBid from './components/AcceptBid';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/job/:jobId" element={<JobDetail />} />
        <Route path="/job/:jobId/acceptBid" element={<AcceptBid />} />
        <Route path="/job/post" element={<PostJob />} />
        <Route path="/jobs" element={<JobList />} />
      </Routes>
    </Router>
  );
}

export default App;