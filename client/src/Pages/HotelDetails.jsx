import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const HotelDetails = () => {
  const [hotels, setHotels] = useState([]);
  const [randomPrices, setRandomPrices] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const location = useLocation();
  const bookingData = location.state;

  // Function to generate random number for a hotel
  const generateRandomNumber = (hotelName) => {
    if (!randomPrices[hotelName]) {
      // Generate a random price if not already generated for this hotel
      const randomPrice = Math.floor(Math.random() * 1000);
      setRandomPrices((prevPrices) => ({
        ...prevPrices,
        [hotelName]: randomPrice,
      }));
      return randomPrice;
    } else {
      // Return stored random price if already generated
      return randomPrices[hotelName];
    }
  };

  // Handle form submission
  const handleSubmit = (hotelName, price) => {

    // Ensure bookingData is defined and contains necessary fields
    if (!bookingData || !bookingData.destination || !bookingData.checkIn || !bookingData.checkOut || !bookingData.guests) {
      console.error('Booking data is incomplete or undefined.');
      return;
    }

    // Prepare data to send to next route
    const fullBookingData = {
      ...bookingData, // Include all fields from bookingData
      hotelName,      // Add hotelName to the booking data
      price,          // Add price to the booking data
    };

    console.log('Full Booking Data:', fullBookingData);

    // Navigate to next route with state
    navigate('/hotels/booking/details', { state: { fullBookingData } });
  };

  // Fetch hotels data on component mount
  useEffect(() => {
    axios.get("http://localhost:4000/hotels/search/details")
      .then((response) => {
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
              <p>Review: {hotel.reviewScore}</p>
              <p>Price: ${generateRandomNumber(hotel.name)}</p>
              
              <button
                type="button" // Ensure type is "button" if it doesn't submit a form
                className="search-button"
                onClick={() => handleSubmit(hotel.name, randomPrices[hotel.name])}
              >
                Book Now
              </button>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HotelDetails;
