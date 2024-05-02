import React, { useState,useEffect  } from 'react';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, set, get, child  } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
import { Link } from 'react-router-dom';
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

const PatientHistoryForm = () => {
  const [medid, setMedid] = useState('');
  const [insulinSyndrome, setInsulinSyndrome] = useState('');
  const [thyroidCondition, setThyroidCondition] = useState('');
  const [smoke, setSmoke] = useState('');
  const [drink, setDrink] = useState('');
  const [diabetes, setDiabetes] = useState('');
  const [username, setUsername] = useState('');
  useEffect(() => {
    // Retrieve username from the "Patients" table
    const patientRef = ref(db, 'Patients');
    get(patientRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const usernames = Object.keys(data);
          // Handle multiple usernames or prompt the user to select one
          // For example, you could set the first username by default
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

    // Create a new reference under 'Patients/<username>/history'
    const patientHistoryRef = ref(db, `Patients/${username}/history`);
    // Set the patient history data at the new reference
    set(patientHistoryRef, {
      medid,
      insulinSyndrome,
      thyroidCondition,
      smoke,
      drink,
      diabetes,
    })
      .then(() => {
        alert('Patient history saved successfully!');
        // Reset form fields after successful submission
        setMedid('');
        setInsulinSyndrome('');
        setThyroidCondition('');
        setSmoke('');
        setDrink('');
        setDiabetes('');
      })
      .catch((error) => {
        alert('Error saving patient history');
        console.error('Error:', error);
      });
  };

  return (
    <>
    <div>
    {username && (
      <form onSubmit={handleSubmit}>
       <div>
        <label htmlFor="medid">MedID:</label>
        <input
          type="text"
          id="medid"
          value={medid}
          onChange={(e) => setMedid(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="insulinSyndrome">Insulin Syndrome:</label>
        <input
          type="text"
          id="insulinSyndrome"
          value={insulinSyndrome}
          onChange={(e) => setInsulinSyndrome(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="thyroidCondition">Thyroid Condition:</label>
        <input
          type="text"
          id="thyroidCondition"
          value={thyroidCondition}
          onChange={(e) => setThyroidCondition(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="smoke">Smoke:</label>
        <select
          id="smoke"
          value={smoke}
          onChange={(e) => setSmoke(e.target.value)}
        >
          <option value="">Select an option</option>
          <option value="never">Never</option>
          <option value="onceAWeek">Once a week</option>
          <option value="regularly">Regularly</option>
          <option value="multipleTimesAWeek">Multiple times a week</option>
        </select>
      </div>
      <div>
        <label htmlFor="drink">Drink:</label>
        <select
          id="drink"
          value={drink}
          onChange={(e) => setDrink(e.target.value)}
        >
          <option value="">Select an option</option>
          <option value="never">Never</option>
          <option value="onceAWeek">Once a week</option>
          <option value="regularly">Regularly</option>
          <option value="multipleTimesAWeek">Multiple times a week</option>
        </select>
      </div>
      <div>
        <label htmlFor="diabetes">Diabetes:</label>
        <select
          id="diabetes"
          value={diabetes}
          onChange={(e) => setDiabetes(e.target.value)}
        >
          <option value="">Select an option</option>
          <option value="none">None</option>
          <option value="type1">Type 1</option>
          <option value="type2">Type 2</option>
          <option value="gestational">Gestational</option>
        </select>
      </div>
      <button type="submit">Submit</button>
      </form>
    )}
  </div>
  
  <Link to="/">Sign in here!</Link> 
  </>
  );
};

export default PatientHistoryForm;