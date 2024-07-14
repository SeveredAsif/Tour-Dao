import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

const HotelBooking = () => {
  const [error, setError] = useState(null);
  const location = useLocation();
  const { fullBookingData } = location.state || {};

  useEffect(() => {
    console.log('Full Booking Data:', fullBookingData);
  }, [fullBookingData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/hotels/booking/information', fullBookingData);
      console.log('Success:', response.data);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    }
  };

  return (
    <div className="hotel-page">
      <Navbar />
      {fullBookingData ? (
        <div>
          <h2>Booking Details</h2>
          <p>Destination: {fullBookingData.destination}</p>
          <p>Check-In: {fullBookingData.checkIn}</p>
          <p>Check-Out: {fullBookingData.checkOut}</p>
          <p>Guests: {fullBookingData.guests}</p>
          <p>Hotel Name: {fullBookingData.hotelName}</p>
          <p>Price: ${fullBookingData.price}</p>
          <button type="submit" className="search-button" onClick={handleSubmit}>
              Confirm Booking
            </button>
          <Link to={`/hotels/booking/payment`}>
            <button type="submit" className="search-button">
              Proceed to payment
            </button>
          </Link>
        </div>
      ) : (
        <p>No booking data available.</p>
      )}
    </div>
  );
};

export default HotelBooking;
