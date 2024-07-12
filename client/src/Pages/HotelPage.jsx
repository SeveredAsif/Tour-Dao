import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import '../css/HotelPage.css';
import hotelImage from '../pictures/hotel_page.jpg';
import axios from 'axios'; // Import axios directly

const HotelPage = () => {
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare request parameters
    const params = {
      destination: destination,
      checkIn: checkIn,
      checkOut: checkOut,
      guests: guests
    };

    console.log(params)

    try {
      // Make API request to fetch hotels
      const response = await axios.post('http://localhost:4000/hotels/search', params);
      console.log(response)
    } catch (error) {
      console.error('Error fetching hotels:', error);
      // Handle error state or display error message
    }
  };


  return (
    <div className="hotel-page">
      <Navbar />
      <div className="hotel-images">
        <img src={hotelImage} alt="Hotels" className="hotel-placeholder-image" />
      </div>
      <div className="content">
        <h1>Hotel Search</h1>
        <form onSubmit={handleSubmit} className="search-bar">
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
            onChange={(e) => setGuests(parseInt(e.target.value))}
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
          
        </form>
       
      </div>
    </div>
  );
};

export default HotelPage;
