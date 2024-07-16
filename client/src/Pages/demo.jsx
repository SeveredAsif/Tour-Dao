import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import '../css/HotelDetails.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const HotelDetails = () => {
  const [hotels, setHotels] = useState([]);
  const [randomPrices, setRandomPrices] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const location = useLocation();
  const bookingData = location.state;


  const [value, setValue] = useState(0); // Initial value set to 0

  const handleChange = (event) => {
    setValue(event.target.value);
  };


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
      <h1>Here are our top picks from Travellers in {bookingData.destination}!</h1>
      
      <div className="row">
        <div className="col-md-6">
          {/* Hotel List Column */}
          {error ? (
            <div>Error: {error.message}</div>
          ) : (
            <div className="hotels-list">
              {hotels.map((hotel, index) => (
                <div key={index} className="hotel-card">
                  <div className="card card-size" style={{ width: "100%", margin: "20px" }}>
                    <img src={hotel.photoUrl} alt={hotel.name} className="card-img-top" />
                    <div className="card-body">
                      <h5 className="card-title">{hotel.name}</h5>
                      <p className="card-text">{hotel.accessibilityLabel}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">Review: {hotel.reviewScore}</li>
                      <li className="list-group-item">Price: ${generateRandomNumber(hotel.name)}</li>
                    </ul>
                    <div className="card-body">
                      <button
                        type="button"
                        className="btn btn-outline-info"
                        onClick={() => handleSubmit(hotel.name, randomPrices[hotel.name])}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="col-md-6">
          {/* Checkbox and Texts Column */}
        <div className="checkbox-container">
          <p>Amenities:</p>
         <div className="form-check">
            <input className="form-check-input" type="checkbox" id="checkbox1" />
            <label className="form-check-label" htmlFor="checkbox1">
              Free Wifi
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="checkbox1" />
            <label className="form-check-label" htmlFor="checkbox1">
              Breakfast
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="checkbox1" />
            <label className="form-check-label" htmlFor="checkbox1">
              Free Parking
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="checkbox1" />
            <label className="form-check-label" htmlFor="checkbox1">
              Pool
            </label>
          </div>
          
         </div>
        
        <div className="checkbox-container">
        <label htmlFor="customRange2" className="form-label">
        Distance From City Center
      </label>
      <input
        type="range"
        className="form-range"
        min="0"
        max="5"
        id="customRange2"
        value={value}
        onChange={handleChange}
      />
      <div>Value: {value}km</div>
      </div>

       </div>



      </div>
      
    </div>
  );
};

export default HotelDetails;
