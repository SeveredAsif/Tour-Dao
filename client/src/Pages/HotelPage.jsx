import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import '../css/HotelPage.css';
import hotelImage from '../pictures/hotel_page.jpg';
import axios from 'axios'; // Import axios directly
const https = require('https');

const HotelPage = () => {
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [hotels, setHotels] = useState([]);

  const handleSearch = async () => {
    // Prepare the request parameters

  };

  const options = {
    method: 'GET',
    hostname: 'booking-com.p.rapidapi.com',
    path: '/v1/hotels/data',
    headers: {
      'x-rapidapi-key': '9339cf7a9amshefe5ad25556e91bp133a8ejsna241101b6824',
      'x-rapidapi-host': 'booking-com.p.rapidapi.com',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };
  
  const req = https.request(options, function (res) {
    const chunks = [];
  
    res.on('data', function (chunk) {
      chunks.push(chunk);
    });
  
    res.on('end', function () {
      const body = Buffer.concat(chunks);
      console.log(body.toString());
    });
  });
  
  req.end();

  const fetchAllHotels = async () => {
    const options = {
      method: 'GET',
      url: 'https://booking-com.p.rapidapi.com/v1/hotels/data',
      params: {
       
        locale: 'en-gb',
      },
      headers: {
        'x-rapidapi-key': '9339cf7a9amshefe5ad25556e91bp133a8ejsna241101b6824',
        'x-rapidapi-host': 'booking-com.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log('Fetched Hotels:', response.data);
      setHotels(response.data); // Update state with fetched hotels
    } catch (error) {
      console.error('Error fetching hotels:', error);
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
          <button onClick={fetchAllHotels} className="all-hotels-button">
            Fetch All Hotels
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelPage;
