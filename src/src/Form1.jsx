import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
import './Form1.css';
//import sugarSyncLogo from './imgurl.jpg';

const firebaseConfig = {
  // ENTER OWN CONFIG
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();

const Form1 = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [pass, setPass] = useState('');

  const handleAddAndNavigate = (event) => {
    event.preventDefault();
    set(ref(db, 'Patients/' + username), {
      name: name,
      age: age,
      phoneNumber: phoneNumber,
      email: email,
      gender: gender,
      pass: pass
    })
      .then(() => {
        alert('Thank you for signing in');
        window.location.href = "/doctorform";

      })
      .catch((error) => {
        alert('unsuccess');
        console.log(error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'username':
        setUsername(value);
        break;
      case 'name':
        setName(value);
        break;
      case 'age':
        setAge(value);
        break;
      case 'phoneNumber':
        setPhoneNumber(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'gender':
        setGender(value);
        break;
      case 'pass':
        setPass(value);
        break;
      default:
        console.warn(`Unexpected input name: ${name}`);
    }
  };

  //const imgUrl = sugarSyncLogo;
  return (
    <div id="root">
      <>
        <h1>Sign Up</h1>
        <br />
        <br />
        <div id="image">
        
        </div>
        <div id='box'>
          <div className="signup-field">
            <label className="signup-label">Username:</label>
            <input type="text" name="username" placeholder="Username" value={username} onChange={handleChange} />
          </div>
          <div className="signup-field">
            <label className="signup-label">Name:</label>
            <input type="text" name="name" placeholder="Name" value={name} onChange={handleChange} />
          </div>
          <div className="signup-field">
            <label className="signup-label">Age:</label>
            <input type="number" name="age" placeholder="Age" value={age} onChange={handleChange} min={0}/>
          </div>
          <div className="signup-field">
            <label className="signup-label">Gender:</label>
            <input type="text" name="gender" placeholder="Gender" value={gender} onChange={handleChange} />
          </div>
          <div className="signup-field">
            <label className="signup-label">Phone Number:</label>
            <input type="tel" name="phoneNumber" placeholder="Phone Number" value={phoneNumber} onChange={handleChange} />
          </div>
          <div className="signup-field">
            <label className="signup-label">Email:</label>
            <input type="email" name="email" placeholder="Email" value={email} onChange={handleChange} />
          </div>
          <div className="-field">
            <label className="sigsignupnup-label">Password:</label>
            <input type="password" name="pass" placeholder="Password" value={pass} onChange={handleChange} />
          </div>
          <button onClick={handleAddAndNavigate}>Sign Up</button>
          <Link to="/">Already have an account? Sign in</Link>
        </div>
      </>
    </div>
  );
};

export default Form1;
