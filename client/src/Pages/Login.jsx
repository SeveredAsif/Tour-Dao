// Login.jsx
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Components/UserContext'; // Import the context
import '../css/Login.css'; // Import CSS file for styling
import { Link } from 'react-router-dom';

const Login = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { username, setUsername } = useContext(UserContext); // Use context to get and set the username

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/login', { username, password });
      console.log(response);
      localStorage.setItem('token', response.data.token);
      alert(response.data.message);
      navigate('/home');
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="text"
          className="login-input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          className="login-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-button">Login</button>
      </form>
      <Link to="/" >Registration</Link>
    </div>
  );
};

export default Login;
