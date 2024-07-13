import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import axios from 'axios'; // Import axios directly

const HotelDetails = () => {
  const [hotelsData, setHotelsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/hotels/search/details")
      .then((response) => {
        setHotelsData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="hotel-page">
      <Navbar />
      <div className="hotels-list">
        <h2>Found Hotels:</h2>
        {hotelsData && hotelsData.hotels && hotelsData.hotels.length > 0 ? (
          <ul>
            {hotelsData.hotels.map((hotel) => (
              <li key={hotel.hotel_id}>
                <p>Name: {hotel.name}</p>
                <p>Country: {hotel.countryCode}</p>
                <p>Rating: {hotel.reviewScoreWord} ({hotel.reviewScore}/10)</p>
                <p>Reviews: {hotel.reviewCount}</p>
                <p>Check-in Date: {hotel.checkinDate}</p>
                <p>Check-out Date: {hotel.checkoutDate}</p>
                <p>Price: {hotel.priceBreakdown}</p>
                <img src={hotel.photoUrls[0]} alt={hotel.name} />
              </li>
            ))}
          </ul>
        ) : (
          <p>No hotels found.</p>
        )}
      </div>
    </div>
  );
};

export default HotelDetails;
