import React, { useState,useEffect } from 'react';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, set, get, child  } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

const firebaseConfig = {
    // ENTER OWN CONFIG
  };
  

const app = initializeApp(firebaseConfig);
const db = getDatabase();

const DoctorForm = () => {
    const [username, setUsername] = useState('');

  const [doctorId, setDoctorId] = useState('');
  
  const [doctorname, setDoctorName] = useState('');
  const [hospitalNumber, setHospitalNumber] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [specialist, setSpecialist] = useState('');


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

    // Create a new reference in the 'Doctors' node
    const doctorRef = ref(db, `Patients/${username}/doc`);
    // Set the doctor's data at the new reference
    set(doctorRef, {
      doctorId,
      doctorname,
      hospitalNumber,
      hospitalName,
      specialist,
    })
      .then(() => {
        alert('Doctor information saved successfully!');

        // Reset form fields after successful submission
        setDoctorId(''); 
        setDoctorName('');
        setHospitalNumber('');
        setHospitalName('');
        setSpecialist('');
        
        window.location.href = "/patienthistoryform";
      })
      .catch((error) => {
        alert('Error saving doctor information');
        console.error('Error:', error);
      });
  };

  return (
    <div>
    {username && (
        <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="doctorname">Doctor Name:</label>
          <input
            type="text"
            id="doctorname"
            value={doctorname}
            onChange={(e) => setDoctorName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="doctorId">Doctor ID:</label>
          <input
            type="text"
            id="doctorId"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="hospitalNumber">Hospital Number:</label>
          <input
            type="text"
            id="hospitalNumber"
            value={hospitalNumber}
            onChange={(e) => setHospitalNumber(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="hospitalName">Hospital Name:</label>
          <input
            type="text"
            id="hospitalName"
            value={hospitalName}
            onChange={(e) => setHospitalName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="specialist">Specialist:</label>
          <input
            type="text"
            id="specialist"
            value={specialist}
            onChange={(e) => setSpecialist(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    )}
  </div>

  );
};

export default DoctorForm;
