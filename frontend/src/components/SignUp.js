import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Define navigate using the useNavigate hook
    
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/users/signup', { name, email, password }, { withCredentials: true })
      .then(response => {
        console.log('Sign up successful');
        console.log(response.data);
        setEmail('');
        setPassword('');
        setName('');
        alert('Sign up successful! Please log in');
        navigate('/login'); // Navigate to the login page
      })
      .catch(error => {
        console.error('Error signing up:', error);
      });
  };

  return (
    <div className="sign-up">
      <div className="signup">
        <h2 className="title">Sign Up</h2>
        <form onSubmit={handleSubmit} className="sign-up-form">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
