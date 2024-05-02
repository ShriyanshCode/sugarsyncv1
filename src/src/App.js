import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Form1 from './Form1'; 
import HomePage from "./Home";
import LoginForm from "./LoginForm"; 
import DoctorForm from "./DoctorForm";
import PatientHistoryForm from "./PatientHistoryForm";
import React from 'react';
import Graph from './Graph';
import MLmodel from './MLmodel';
import Meals2 from "./Meals2";
import Mealsfin from "./Mealsfin";

const App = () => {

  return (
    <>
  
    <br/>
    <Router>
      <div>
        {/*
        <nav> 
          
          <Link to="/">Login</Link>
          <Link to="/Form1">sign up</Link>
          <Link to="/doctorform">Doc</Link>
          <Link to="/patienthistoryform">PatientHistoryForm</Link>
        <nav>
        <Link to="/mealss">mealsfin</Link>

        </nav>
          </nav>
        
        {/* Routes */}
        
        
        <Routes>
          {/* Route for the Form1 page */}
          <Route exact path="/" element={<LoginForm />} />
          {/* Route for the Meals page */}
          <Route path="/Form1" element={<Form1 />} />
          <Route path="/home" element={<HomePage />} />
          
          <Route path="/doctorform" element={<DoctorForm />} />

          <Route path="/meals" element={<Meals2/>} />
          
          <Route path="/patienthistoryform" element={<PatientHistoryForm />} />
          <Route path="/graph" element={<Graph />} />
          <Route path= "/MLmodel" element={<MLmodel/>}/>
          <Route path="/mealss" element={<Mealsfin/>}/>
        </Routes>
      </div>
    </Router>
    </>
  );
};

export default App;
