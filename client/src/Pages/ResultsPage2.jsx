import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { FaPlaneDeparture, FaPlaneArrival, FaClock, FaInfoCircle } from 'react-icons/fa';
import '../css/ResultsPage.css';

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { flights } = location.state;

  const handleDetailClick = (flight) => {
    navigate('/detail-flight', { state: { flight } });
  };

  return (
    <div className="results-page">
      <Navbar />
      <div className="results-container">
        {flights.length > 0 ? (
          flights.map((flight, index) => (
            <div key={index} className="flight-box">
              <div className="flight-details">
                <p><FaPlaneDeparture /> <strong>From:</strong> {flight.originStationCode}</p>
                <p><FaPlaneArrival /> <strong>To:</strong> {flight.destinationStationCode}</p>
                <p><FaClock /> <strong>Departure:</strong> {flight.departureDateTime}</p>
                <p><FaClock /> <strong>Arrival:</strong> {flight.arrivalDateTime}</p>
                <p><FaInfoCircle /> <strong>Flight Number:</strong> {flight.flightNumber}</p>
              </div>
              <button className="detail-button" onClick={() => handleDetailClick(flight)}>Detail</button>
            </div>
          ))
        ) : (
          <p className="no-flights-message">No flights found.</p>
        )}
      </div>
      <footer className="footer">
        <p>Contact Us</p>
      </footer>
    </div>
  );
};

export default ResultsPage;
