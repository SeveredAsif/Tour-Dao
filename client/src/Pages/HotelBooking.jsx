import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import { Link,useLocation } from 'react-router-dom';

const HotelBooking = () => {
  const [error, setError] = useState(null);
  const location = useLocation();
  const { fullBookingData } = location.state || {};

  useEffect(() => {
    console.log('Full Booking Data:', fullBookingData);
    // You can add further logic to handle fullBookingData here
  }, [fullBookingData]);

  return (
    <div className="hotel-page">
      <Navbar />
      {/* Render components based on fullBookingData */}
      {fullBookingData ? (
        <div>
          <h2>Booking Details</h2>
          <p>Destination: {fullBookingData.destination}</p>
          <p>Check-In: {fullBookingData.checkIn}</p>
          <p>Check-Out: {fullBookingData.checkOut}</p>
          <p>Guests: {fullBookingData.guests}</p>
          <p>Hotel Name: {fullBookingData.hotelName}</p>
          <p>Price: ${fullBookingData.price}</p>
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
