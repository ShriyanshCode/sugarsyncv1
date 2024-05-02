import React, { useState } from 'react';
import Navbar from './Navbar';
import './Home.css';
import { Link } from 'react-router-dom';
import Graph from './Graph';

function Home() {
  const [plotData, setPlotData] = useState(null);

  // You can fetch data from an API and set the plotData state here
  // or pass it as a prop from a parent component

  return (
    <>
      <Navbar />
      <div className="home-container">
        <main className="main-content">
          <section className="hero">
            <h2>Welcome to Sugar Sync!</h2>
            <div className="hero-content">
              <p>Here are your daily analytics</p>
              <Link to="/graph">Graph</Link>
              <div className="graph-container">
                {plotData && <Graph plotData={plotData} />}
              </div>
            </div>
            <div className="meal-log">
              <h2>Meal Logging & Glucose Prediction</h2>
              <Link to="/mealss">
                <button>Click Here</button>
              </Link>
             
              
            </div>
          </section>
          <p>
          <Link to="/">Sign out</Link>
          </p>
        </main>
        <footer className="footer">
          <p>&copy; 2024 My Awesome Website</p>
        </footer>
      </div>
    </>
  );
}

export default Home;