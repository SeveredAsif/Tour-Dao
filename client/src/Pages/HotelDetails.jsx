import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import star from '../pictures/star.png';
import wifi from '../pictures/wifi.png';
import dollar from '../pictures/dollar.png';
import distance from '../pictures/distance.png';
import hotel from '../pictures/hotel.png';
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
      <h1 style={{ textAlign: 'center' }}>Book now with best deal!</h1>
      
      <div className="alert alert-success d-flex align-items-center" role="alert">
  <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:">
    <use xlinkHref="#check-circle-fill"/>
  </svg>
  <div>
  Here are our top picks from Travellers in {bookingData.destination}!
  </div>
</div>

      
      <div className="row">
        <div className="col-md-8">
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
                      <li className="list-group-item"> 
                        <img src={star} style={{ width: '50px', height: '50px' }}/>
                        <b style={{margin: "10px"}}> {hotel.reviewScore} </b></li> 
                      <li className="list-group-item">      
                      <img src={dollar} style={{ width: '50px', height: '50px' }}/>
                      <b style={{margin: "10px"}}> {generateRandomNumber(hotel.name)}</b>          
                      </li>
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
        
        <div className="col-md-4">
          {/* Checkbox and Texts Column */}
          <div class="form-check form-switch checkbox-container">
            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
            <label class="form-check-label" for="flexSwitchCheckDefault">Apply Filters</label>
          </div>

          <br/>

        <div className="checkbox-container">
        <img src={wifi} style={{ width: '100px', height: '100px' }}/>
        
          <p>Amenities
          <div className="icon-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
</svg>
        </div>
          </p>
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
              Parking
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="checkbox1" />
            <label className="form-check-label" htmlFor="checkbox1">
              Pool
            </label>
          </div>
          
         </div>

         <br/>
        
        <div className="checkbox-container">
        <img src={distance} style={{ width: '100px', height: '100px' }}/>
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

      <br/>
      <div className="checkbox-container">
      <img src={hotel} style={{ width: '100px', height: '100px' }}/>
      <p>
        Style
        <div className="icon-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
</svg>
        </div>
       
      </p>
         <div className="form-check">
            <input className="form-check-input" type="checkbox"  />
            <label className="form-check-label" htmlFor="checkbox1">
              Budget
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox"  />
            <label className="form-check-label" htmlFor="checkbox1">
              Luxury
            </label>
          </div>
          <div class="form-check">
             <input class="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate"/>
             <label class="form-check-label" for="flexCheckIndeterminate">
               Family
             </label>
          </div>
          
         </div>

     </div>



      </div>
      

    <Footer/>  
    </div>
  );
};

export default HotelDetails;
