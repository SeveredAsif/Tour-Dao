import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import '../css/HotelPage.css';
import hotelImage from '../pictures/hotel_page.jpg';


const HotelPage = () => {
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  const handleSearch = () => {
    // Implement your search logic here
    console.log('Searching for:', { destination, checkIn, checkOut, guests });
  };

  return (
    <div className="hotel-page">
      <Navbar />
      <div className="hotel-images">
          
      <img src={hotelImage} alt="Hotels" className="hotel-placeholder-image" />

        </div>
      <div className="content">
        <h1>Hotel Search</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="search-input"
          />
          <input
            type="date"
            placeholder="Check-in"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="search-input"
          />
          <input
            type="date"
            placeholder="Check-out"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="search-input"
          />
          <input
            type="number"
            placeholder="Guests"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>
       
      </div>
    </div>
  );
};

export default HotelPage;
