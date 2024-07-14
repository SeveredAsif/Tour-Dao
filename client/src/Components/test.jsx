import React,{useContext} from 'react';
import Navbar from '../Components/Navbar';
import { UserContext } from '../Components/UserContext';

import './HomePage.css';

const HomePage = () => {
  const { username } = useContext(UserContext);
  return (
    <div>
      <Navbar />
      <div className="home-container">
        <h1>Welcome to TravelSite {username}</h1>
        <p>Discover amazing destinations and book your flights with ease.</p>
      </div>
    </div>
  );
};

export default HomePage;
