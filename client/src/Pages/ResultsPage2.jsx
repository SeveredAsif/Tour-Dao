import React from 'react';
import { useLocation } from 'react-router-dom';
import '../css/ResultsPage.css';
import Navbar from '../Components/Navbar'

const ResultsPage = () => {
  const location = useLocation();
  const { flights } = location.state;

  const handleDetailClick = (flight) => {
    // Handle the detail button click (e.g., navigate to a detail page or show a modal)
    console.log(flight);
  };

  return (
    <div className="results-container">
      <Navbar/>
      {flights.map((flight, index) => (
        <div key={index} className="flight-box">
          <div className="flight-details">
            <p><strong>From:</strong> {flight.originStationCode}</p>
            <p><strong>To:</strong> {flight.destinationStationCode}</p>
            <p><strong>Departure:</strong> {flight.departureDateTime}</p>
            <p><strong>Arrival:</strong> {flight.arrivalDateTime}</p>
            <p><strong>Flight Number:</strong> {flight.flightNumber}</p>
          </div>
          <button className="detail-button" onClick={() => handleDetailClick(flight)}>Detail</button>
        </div>
      ))}
    </div>
  );
};

export default ResultsPage;
