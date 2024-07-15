import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
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
                <p><strong>From:</strong> {flight.originStationCode}</p>
                <p><strong>To:</strong> {flight.destinationStationCode}</p>
                <p><strong>Departure:</strong> {flight.departureDateTime}</p>
                <p><strong>Arrival:</strong> {flight.arrivalDateTime}</p>
                <p><strong>Flight Number:</strong> {flight.flightNumber}</p>
              </div>
              <button className="detail-button" onClick={() => handleDetailClick(flight)}>Detail</button>
            </div>
          ))
        ) : (
          <p className="no-flights-message">No flights found.</p>
        )}
      </div>
      <div className="promo-section">
        <img src="../pictures/flightbg.jpg" alt="Fly with us" className="promo-image" />
        <div className="promo-text">Fly with Us</div>
      </div>
      <footer className="footer">
        <p>Contact Us</p>
      </footer>
    </div>
  );
};

export default ResultsPage;
