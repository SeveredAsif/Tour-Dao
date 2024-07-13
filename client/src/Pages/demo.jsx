import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import '../css/HotelPage.css';
import hotelImage from '../pictures/hotel_page.jpg';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HotelPage = () => {
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [hotelsData, setHotelsData] = useState(null);
  
    const handleHotelClick = (dest_id, search_type) => {
      // Prepare data to send in the request body
      const requestData = {
        dest_id,
        search_type,
        destination,
        checkIn,
        checkOut,
        guests
      };
  
      axios.post('http://localhost:4000/hotels/search/details', requestData)
        .then(response => {
          console.log('Data sent successfully:', response.data);
          // Handle response data as needed
          setHotelsData(response.data.hotels); // Assuming response structure includes hotels
        })
        .catch(error => {
          console.error('Error sending data:', error);
        });
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const params = {
      destination,
      checkIn,
      checkOut,
      guests
    };

    try {
      const response = await axios.post('http://localhost:4000/hotels/search', params);
      console.log('Response:', response.data);
      setHotelsData(response.data);
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

        {hotelsData && hotelsData.hotels && (
          <div className="hotels-list">
            <h2>Found Hotels:</h2>
            <ul>
              {hotelsData.hotels.map((hotel, index) => (
                <li key={index} onClick={() => handleHotelClick(hotel.dest_id, hotel.search_type)}>
                  <p>Name: {hotel.name}</p>
                  <p>Country: {hotel.country}</p>
                  <p>Number of Hotels: {hotel.hotels}</p>
                  <Link to="/hotels/search/details">
                  <img src={hotel.image_url} alt={hotel.name} onClick={() => handleHotelClick(hotel.dest_id, hotel.search_type)}/>
                 </Link>
                 
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelPage;
