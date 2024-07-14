import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { Link,useNavigate,useLocation } from 'react-router-dom';

const HotelDetails = () => {
  const [hotels, setHotels] = useState([]);
  const [randomPrices, setRandomPrices] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const location = useLocation();
  const bookingData = location.state;
  const { destination, checkIn, checkOut, guests} = bookingData;
  
 

  /*const generateRandomNumber = () => {
    return Math.floor(Math.random() * (200 - 100 + 1)) + 100;
  };*/


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


  const handleSubmit = (hotelName, price) => (e) => {
    e.preventDefault();
  
    // Ensure bookingData is defined and contains necessary fields
    if (!bookingData || !bookingData.destination || !bookingData.checkIn || !bookingData.checkOut || !bookingData.guests||hotelName||price) {
      console.error('Booking data is incomplete or undefined.');
      return;
    }
  
    // Destructure bookingData
    const { destination, checkIn, checkOut, guests } = bookingData;
  
    // Prepare data to send to next route
    const FullbookingData = {
       // Include all fields from bookingData
      hotelName,      // Add hotelName to the booking data
      price,          // Add price to the booking data
    };
  
    console.log('Full Booking Data:', FullbookingData);
  
    // Navigate to next route with state
    /*navigate('/hotels/booking/details', { state: FullbookingData });*/
  };

  useEffect(() => {
    axios.get("http://localhost:4000/hotels/search/details")
      .then((response) => {
        setHotels(response.data.data);

      })
      .catch((error) => {
        setError(error); // Handle axios error
      });
  },[]);

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
               onClick={() => handleSubmit(hotel.name, randomPrices[hotel.name])}  >
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
