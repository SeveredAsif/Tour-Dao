import React from 'react';
import Navbar from '../Components/Navbar';
import './FlightPage.css';

const FlightPage = () => {
  return (
    <div className="flight-page">
      <Navbar />
      <div className="content">
        <h1>This is the Flight Page</h1>
      </div>
    </div>
  );
};

export default FlightPage;
