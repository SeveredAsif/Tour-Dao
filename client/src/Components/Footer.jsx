import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer className="bg-dark text-black pt-4 pb-2">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5>About Us</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
          </div>
          <div className="col-md-4 mb-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/destinations" className="text-black">Destinations</a></li>
              <li><a href="/hotels" className="text-black">Hotels</a></li>
              <li><a href="/flights" className="text-black">Flights</a></li>
              <li><a href="/contact" className="text-black">Contact Us</a></li>
            </ul>
          </div>
          <div className="col-md-4 mb-4">
            <h5>Contact</h5>
            <p>
              <i className="bi bi-geo-alt-fill"></i> 123 Travel Street, City, Country<br />
              <i className="bi bi-telephone-fill"></i> +1 234 567 890<br />
              <i className="bi bi-envelope-fill"></i> email@example.com
            </p>
          </div>
        </div>
        <div className="text-center">
          <p>&copy; 2024 TravelSite. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
