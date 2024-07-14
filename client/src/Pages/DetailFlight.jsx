import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import '../css/DetailFlight.css';
import axios from "axios";
import { UserContext } from '../Components/UserContext'; // Import the UserContext

const DetailFlight = () => {
  const location = useLocation();
  const { flight } = location.state;
  const { username } = useContext(UserContext); // Access the username from the context

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentDetails, setPaymentDetails] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleBookClick = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    if (!paymentMethod || !paymentDetails) {
      setErrorMessage('Please provide payment method and details');
      return;
    }

    axios
      .post("http://localhost:4000/book", {
        username, // Include the username in the request body
        flight,
        paymentMethod,
        paymentDetails
      })
      .then((response) => {
        console.log(response.data);
        alert("Booking successful!");
        setShowPaymentModal(false);
      })
      .catch((error) => {
        console.log(error);
        alert("Error booking flight.");
      });
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2>Flight Details</h2>
        <div className="flight-details">
          <img src={flight.operatingCarrier_logoUrl} alt={flight.operatingCarrier_displayName} />
          <p><strong>Airline:</strong> {flight.operatingCarrier_displayName} ({flight.operatingCarrier_code})</p>
          <p><strong>Flight Number:</strong> {flight.flightNumber}</p>
          <p><strong>Class of Service:</strong> {flight.classOfService}</p>
          <p><strong>Origin:</strong> {flight.originStationCode}</p>
          <p><strong>Destination:</strong> {flight.destinationStationCode}</p>
          <p><strong>Departure Time:</strong> {new Date(flight.departureDateTime).toLocaleString()}</p>
          <p><strong>Arrival Time:</strong> {new Date(flight.arrivalDateTime).toLocaleString()}</p>
          <p><strong>Number of Stops:</strong> {flight.numStops}</p>
          <p><strong>Distance:</strong> {flight.distanceInKM} km</p>
          <p><strong>International:</strong> {flight.isInternational ? "Yes" : "No"}</p>
        </div>
        <button className="book-button" onClick={handleBookClick}>
          Book Ticket
        </button>
      </div>

      {showPaymentModal && (
        <div className="payment-modal">
          <div className="payment-modal-content">
            <h2>Payment Details</h2>
            <form onSubmit={handlePaymentSubmit}>
              <label>
                Payment Method:
                <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                  <option value="">Select a payment method</option>
                  <option value="card">Card</option>
                  <option value="mobile">Mobile</option>
                </select>
              </label>
              <label>
                Payment Details:
                <input
                  type="text"
                  value={paymentDetails}
                  onChange={(e) => setPaymentDetails(e.target.value)}
                  required
                />
              </label>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <button type="submit">Submit Payment</button>
            </form>
            <button className="cancel-button" onClick={() => setShowPaymentModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailFlight;
