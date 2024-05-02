import React, { useState,useEffect } from 'react';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, set, get, child  } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
import './meals.css';

const firebaseConfig = {
    apiKey: "AIzaSyA3rlehLWjQazkLeDF2K90OkhEvMdIRUgE",
    authDomain: "sugarsync-3daf5.firebaseapp.com",
    databaseURL: "https://sugarsync-3daf5-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "sugarsync-3daf5",
    storageBucket: "sugarsync-3daf5.appspot.com",
    messagingSenderId: "408123625851",
    appId: "1:408123625851:web:7ec76dd70b167950b72dde",
    measurementId: "G-ZKVDMJV6NS"
  };
  

const app = initializeApp(firebaseConfig);
const db = getDatabase();

const Meals = () => {
  const [username, setUsername] = useState('');
  const [macrosfood, setMacrosfood] = useState('');
  const [macrosquantity, setMacrosquantity] = useState('');
  const [datetime, setDatetime] = useState('');

  useEffect(() => {
    // Retrieve username from the "Patients" table  
    const patientRef = ref(db, 'Patients');
    get(patientRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const usernames = Object.keys(data);
          setUsername(usernames[0]);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error("Error retrieving username:", error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a new reference in the 'Patients' node
    const mealRef = ref(db, `Patients/${username}/meal`);
    // Set the meal data at the new reference
    set(mealRef, {
      macrosfood,
      macrosquantity,
      datetime
    })
      .then(() => {
        alert('Meal information saved successfully!');

        // Reset form fields after successful submission
        setMacrosfood('');
        setMacrosquantity('');
        setDatetime('');
        window.location.href = "/home";
      })
      .catch((error) => {
        alert('Error saving Meal information');
        console.error('Error:', error);
      });
  };

  return (
    <div>
      {username && (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="macros">Macros:</label>
            <input
              type="text"
              id="macros"
              value={macrosfood}
              onChange={(e) => setMacrosfood(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="macrosquantity">Macros Quantity:</label>
            <input
              type="number"
              id="macrosquantity"
              value={macrosquantity}
              onChange={(e) => setMacrosquantity(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="datetime">Datetime (YYYY-MM-DD HH:MM):</label>
            <input
              type="datetime-local"
              id="datetime"
              value={datetime}
              onChange={(e) => setDatetime(e.target.value)}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default Meals;
