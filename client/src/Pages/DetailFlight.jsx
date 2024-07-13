import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import '../css/DetailFlight.css';
import axios from "axios";

const DetailFlight = () => {
  const location = useLocation();
  const { flight } = location.state;
  console.log(flight);
  const handleBookClick = () => {
    // Get the token from localStorage (assuming it's stored there after login)
    axios
      .get("http://localhost:4000/protected")
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error);
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
    </div>
  );
}

export default DetailFlight;
