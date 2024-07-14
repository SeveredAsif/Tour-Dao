import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { UserContext } from '../Components/UserContext';
import '../css/Dashboard.css';

const Dashboard = () => {
  const { username } = useContext(UserContext);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (username) {
      axios
        .get(`http://localhost:4000/bookings/${username}`)
        .then((response) => {
          setBookings(response.data);
        })
        .catch((error) => {
          setError(error);
        });
    }
  }, [username]);

  return (
    <div className="dashboard-page">
      <Navbar />
      <div className="container">
        <h2>Your Bookings</h2>
        {error ? (
          <div>Error: {error.message}</div>
        ) : (
          <div className="bookings-list">
            {bookings.length === 0 ? (
              <p>No bookings found.</p>
            ) : (
              bookings.map((booking, index) => (
                <div key={index} className="booking-card">
                  <h3>{booking.operatingCarrier_displayName}</h3>
                  <p><strong>Flight Number:</strong> {booking.flightNumber}</p>
                  <p><strong>Class of Service:</strong> {booking.classOfService}</p>
                  <p><strong>Origin:</strong> {booking.originStationCode}</p>
                  <p><strong>Destination:</strong> {booking.destinationStationCode}</p>
                  <p><strong>Departure Time:</strong> {new Date(booking.departureDateTime).toLocaleString()}</p>
                  <p><strong>Arrival Time:</strong> {new Date(booking.arrivalDateTime).toLocaleString()}</p>
                  <p><strong>Status:</strong> {booking.status}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
