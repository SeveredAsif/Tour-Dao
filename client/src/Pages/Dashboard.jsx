import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { UserContext } from '../Components/UserContext';
import '../css/Dashboard.css';

const Dashboard = () => {
  const { username } = useContext(UserContext);
  const [flightBookings, setFlightBookings] = useState([]);
  const [hotelBookings, setHotelBookings] = useState([]);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('flights');

  useEffect(() => {
    if (username) {
      axios
        .get(`http://localhost:4000/bookings/flights/${username}`)
        .then((response) => {
          setFlightBookings(response.data);
        })
        .catch((error) => {
          setError(error);
        });

      axios
        .get(`http://localhost:4000/bookings/hotels/${username}`)
        .then((response) => {
          setHotelBookings(response.data);
        })
        .catch((error) => {
          setError(error);
        });
    }
  }, [username]);

  const renderFlightBookings = () => {
    return flightBookings.length === 0 ? (
      <p>No flight bookings found.</p>
    ) : (
      flightBookings.map((booking, index) => (
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
    );
  };

  const renderHotelBookings = () => {
    return hotelBookings.length === 0 ? (
      <p>No hotel bookings found.</p>
    ) : (
      hotelBookings.map((booking, index) => (
        <div key={index} className="booking-card">
          <h3>{booking.hotelName}</h3>
          <p><strong>Destination:</strong> {booking.destination}</p>
          <p><strong>Check-In:</strong> {new Date(booking.checkIn).toLocaleDateString()}</p>
          <p><strong>Check-Out:</strong> {new Date(booking.checkOut).toLocaleDateString()}</p>
          <p><strong>Guests:</strong> {booking.guests}</p>
          <p><strong>Price:</strong> ${booking.price.toFixed(2)}</p>
          <p><strong>Booked On:</strong> {new Date(booking.createdAt).toLocaleString()}</p>
        </div>
      ))
    );
  };

  return (
    <div className="dashboard-page">
      <Navbar />
      <div className="container">
        <h2>Your Bookings</h2>
        <div className="tabs">
          <button className={`tab ${activeTab === 'flights' ? 'active' : ''}`} onClick={() => setActiveTab('flights')}>
            Flight Bookings
          </button>
          <button className={`tab ${activeTab === 'hotels' ? 'active' : ''}`} onClick={() => setActiveTab('hotels')}>
            Hotel Bookings
          </button>
        </div>
        {error ? (
          <div>Error: {error.message}</div>
        ) : (
          <div className="bookings-list">
            {activeTab === 'flights' ? renderFlightBookings() : renderHotelBookings()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
