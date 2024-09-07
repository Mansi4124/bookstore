import React from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="dashboard-buttons">
        <button>Manage Books</button>
        <button>Manage Orders</button>
        <button>Manage Users</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
