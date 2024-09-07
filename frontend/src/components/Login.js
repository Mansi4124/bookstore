import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/users/login', { email, password }, { withCredentials: true })
      .then(response => {
        console.log('Logged in successfully');
        console.log(response.data);
        navigate('/')
      })
      .catch(error => {
        console.error('Error logging in:', error);
      });
  };

  return (
    <div className="login-container">
        <div className="login">
      <h2 className='title'>Login</h2>
      <form onSubmit={handleSubmit} className='f'>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
    </div>
    
  );
};

export default Login;
