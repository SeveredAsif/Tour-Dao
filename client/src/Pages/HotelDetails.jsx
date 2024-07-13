import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import axios from 'axios';

const HotelDetails = () => {
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:4000/hotels/search/details")
      .then((response) => {
        console.log('Response:', response.data.data);
        setHotels(response.data.data);
       
      })
      .catch((error) => {
        setError(error); // Handle axios error
      });
  }, []);

  return (
    <div className="hotel-page">
      <Navbar />
      {error ? (
        <div>Error: {error.message}</div>
      ) : (
        <div className="hotels-list">
          {hotels.map((hotel, index) => (
            <div key={index} className="hotel-card">
              <img src={hotel.photoUrl} alt={hotel.name} />
              <h3>{hotel.name}</h3>
              <p>{hotel.accessibilityLabel}</p>
              <p>Price: {hotel.reviewScore}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HotelDetails;
