import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa'; // Import user icon
import './Profile.css'; // Custom CSS for styling

const Profile = () => {
  const [userData, setUserData] = useState(null); // State to store user data
  const navigate = useNavigate();

  // Fetch user data when the component mounts
  useEffect(() => {
    axios.get('http://localhost:5000/api/users/profile', { withCredentials: true })
      .then(response => {
        setUserData(response.data.user); // Store user data in state
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        if (error.response && error.response.status === 401) {
          navigate('/login'); // Redirect to login if not authenticated
        }
      });
  }, [navigate]);

  const handleLogout = () => {
    axios.post('http://localhost:5000/api/users/logout', {}, { withCredentials: true })
      .then(() => {
        console.log('Logged out successfully');
        navigate('/login'); // Redirect to login page
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <FaUserCircle className="profile-icon" /> {/* User icon */}
          <h2 className="profile-title">Your Profile</h2>
        </div>
        {userData ? (
          <div className="profile-info">
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Name:</strong> {userData.name}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <button className="" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
