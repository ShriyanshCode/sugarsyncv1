import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
import './loginform.css';

const LoginForm = () => {
  const [name, setName] = useState('');
  const [pass, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const db = getDatabase();
      const usersRef = ref(db, 'Patients/');
      const snapshot = await get(child(usersRef, name.toLowerCase())); // Assuming name is stored in lowercase
      
      if (snapshot.exists()) {
        const userData = snapshot.val();
        if (userData.pass === pass) {
          console.log("User logged in successfully");
          window.location.href = "/home";
        } else {
          setError("Incorrect password");
        }
      } else {
        setError("User not found");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      setError(error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  return (
    <div id="root">
      <h1>Login</h1>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={name} onChange={handleChange} placeholder='Enter username'/>
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" value={pass} onChange={handleChange} placeholder='Enter password'/>
      </div>
      {/* Display error message if login fails */}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {/* Change button onClick to call handleLogin function */}
      <button onClick={handleLogin}>Login</button>
      <div>
        <p>Don't have an account? <Link to="/Form1">Sign up</Link></p>
      </div>
      {/* Link to navigate to the home page */}
      <div>
        <p>Go to <Link to="/home">Home</Link></p>
      </div>
    </div>
  );
};

export default LoginForm;
