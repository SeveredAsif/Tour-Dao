import React from 'react';
import Navbar from '../Components/Navbar';
import './HomePage.css';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="home-container">
        <h1>Welcome to TravelSite</h1>
        <p>Discover amazing destinations and book your flights with ease.</p>
      </div>
    </div>
  );
};

export default HomePage;
