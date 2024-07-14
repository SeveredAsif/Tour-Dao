import React, { useContext } from 'react';
import Navbar from '../Components/Navbar';
import { UserContext } from '../Components/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './HomePage.css';
import p1 from '../pictures/1.jpg';
import p2 from '../pictures/2.jpg';
import p3 from '../pictures/3.jpg';

const HomePage = () => {
  const { username } = useContext(UserContext);

  return (
    <div>
      <Navbar />
      <div className="home-container">
        <h1>Welcome to TravelSite {username}</h1>
        <p>Discover amazing Destinations,best Hotel offers and Book your flights with ease.</p>
        <div class="input-group">
        <input type="text" class="form-control" aria-label="Dollar amount (with dot and two decimal places)"/>
        <span class="input-group-text">$</span>
        </div>

        <div id="carouselExampleFade" className="carousel slide carousel-fade">
          <div className="carousel-inner">
          <div className="carousel-item active">
              <div className="image-container">
                <img src={p1} className="d-block w-100" alt="First slide" />
              </div>
            </div>
            <div className="carousel-item">
              <div className="image-container">
                <img src={p2} className="d-block w-100" alt="Second slide" />
              </div>
            </div>
            <div className="carousel-item">
              <div className="image-container">
                <img src={p3} className="d-block w-100" alt="Third slide" />
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

       
      </div>
    </div>
  );
};

export default HomePage;
