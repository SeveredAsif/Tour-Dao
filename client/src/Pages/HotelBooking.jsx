import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

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
    </div>
  );
};

export default HotelBooking;
