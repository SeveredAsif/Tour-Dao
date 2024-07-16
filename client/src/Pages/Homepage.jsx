import React, { useContext } from 'react';
import { Link} from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { UserContext } from '../Components/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './HomePage.css';
import p1 from '../pictures/1.jpg';
import p2 from '../pictures/2.jpg';
import p3 from '../pictures/3.jpg';
import ind from '../pictures/in.jpg';
import m from '../pictures/m.jpg';
import a from '../pictures/a.jpg';
import travel from '../pictures/travel1.jpg';

const HomePage = () => {
  const { username } = useContext(UserContext);

  return (
    <div>
      <Navbar />
      <div className="home-container">
        <h1 classname="playwrite-cu">Tour De {username}</h1>
        <p>Discover amazing Destinations,best Hotel offers and Book your flights with ease.</p>

<div class="input-group">
  <input type="text" class="form-control" placeholder= "Search Destinations,Hotels,Flights"aria-label="Text input with segmented dropdown button"/>
  <button type="button" class="btn btn-outline-secondary">
  <div className="icon-wrapper">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg></div>

    Search </button>
  <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
    <span class="visually-hidden">Toggle Dropdown</span>
  </button>
  <ul class="dropdown-menu dropdown-menu-end">
    <li><a class="dropdown-item" href="/destination">Destinations</a></li>
    <li><a class="dropdown-item" href="/hotels">Hotels</a></li>
    <li><a class="dropdown-item" href="/flights">Flights</a></li>
    <li><hr class="dropdown-divider"/></li>
    <li><a class="dropdown-item" href="/dashboard">My Booking</a></li>
  </ul>
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

      
      <div className="container">
      <h2 className="my-4">Here are our top picks by our users</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="card" style={{ width: '18rem' }}>
            <img src={ind} className="card-img-top" alt="Indonesia" />
            <div className="card-body">
              <p className="card-text">Indonesia</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card" style={{ width: '18rem' }}>
            <img src={m} className="card-img-top" alt="Maldives" />
            <div className="card-body">
              <p className="card-text">Maldives</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card" style={{ width: '18rem' }}>
            <img src={a} className="card-img-top" alt="Netherlands" />
            <div className="card-body">
              <p className="card-text">Netherlands</p>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div className="container-fluid blue-container blue-background py-5">
      <div className="row">
        <div className="col-md-6">
          <img src={travel} className="img-fluid rounded" alt="Left Image" />
        </div>
        <div className="col-md-6 d-flex align-items-center">
          <div className="p-5">
            <h2>It’s easier than ever to go together</h2>
            <p>Travel is better when you can share it with your best friend. Find all the tips, guides, and tools you need to take a dream trip with your dog.</p>
            <div class="d-grid gap-2 d-md-block">
      <Link to="/login">
      <button class="btn btn-outline-warning button-gap" type="button">Login</button>
      </Link> 
      <Link to="/register">
      <button class="btn btn-outline-warning" type="button">Register</button>
      </Link>        
         
           </div>
          </div>
        </div>
      </div>
    </div>


   <Footer/>


    </div>
  );
};

export default HomePage;
