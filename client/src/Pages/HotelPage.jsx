import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import '../css/HotelPage.css';
import hotelImage from '../pictures/hotel_page.jpg';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const HotelRating = ({ stars }) => {
  const renderStars = (stars) => {
    let starElements = [];
    for (let i = 0; i < stars; i++) {
      starElements.push(<span key={i} className="star">★</span>);
    }
    return starElements;
  };

  return (
    <div>
      {renderStars(stars)}
    </div>
  );
};

const HotelPage = () => {
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [hotelsData, setHotelsData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/hotels")
      .then((response) => {
        console.log(response.data.data);
        setHotelsData(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching hotels data:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare data to send to next route
    const bookingData = {
      destination,
      checkIn,
      checkOut,
      guests
    };

    navigate('/hotels/search/details', { state: bookingData });
  };

  return (
    <div>
    <div className="hotel-page">
      <Navbar />
      <div className="hotel-search-container">
        <div className="hotel-images">
          <img src={hotelImage} alt="Hotels" className="hotel-placeholder-image" />
        </div>
        <div className="content">
          <h1>Hotel Search</h1>
          <form onSubmit={handleSubmit} className="search-bar">
          <label className="input-label">Place:</label>
            <input
              type="text"
              placeholder="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="search-input"
            />
            <label className="input-label">Check In:</label>
            <input
              type="date"
              placeholder="Check-in"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="search-input"
            />
            <label className="input-label">Check Out:</label>
            <input
              type="date"
              placeholder="Check-out"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="search-input"
            />
            <label className="input-label">Guests:</label>
            <input
              type="number"
              placeholder="Guests"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
              className="search-input"
            />
            

            {/* Use Link component properly for navigation */}
            <Link to="/hotels/search/details">
              <button type="submit" className="search-button">
                Search
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>


    <h1 style={{ textAlign: 'center' }}>Award Winning Hotels of 2024!!</h1>
    {hotelsData.map((hotel, index) => (
          <div className="container-fluid blue-container blue-background py-5">
          <div className="row">
            <div className="col-md-6">
              <img src={hotel.photo} className="img-fluid rounded" alt="Left" />
            </div>
            <div className="col-md-6 d-flex align-items-center">
              <div className="p-5">
                <h2>It’s easier than ever to go together</h2>
                <p>Name: {hotel.name}</p>
          <p>Country: {hotel.country}</p>
          <p>Amenities: {hotel.amenities}</p>
          <p>Price: $${hotel.price}</p>
          <p>Stars:</p>
          <HotelRating stars={hotel.stars} />
          
                <div class="d-grid gap-2 d-md-block">
          <Link to="/">
          <button class="btn btn-outline-danger button-gap" type="button">View Details</button>
          </Link>      
             
               </div>
              </div>
            </div>
          </div>
        </div>
        
      ))}
    

    <Footer/>
    </div>
  );
};

export default HotelPage;
