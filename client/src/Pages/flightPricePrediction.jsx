import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import flight from '../pictures/flight.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../css/demo.css';

const FlightPricePrediction = () => {
  const [formData, setFormData] = useState({
    stops: '',
    cla: '',
    days_left: '',
    airline: '',
    source_city: '',
    destination_city: ''
  });

  const [prediction, setPrediction] = useState(null);  // State to store the prediction result
  const [error, setError] = useState(null);  // State to store error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await axios.post('http://localhost:4000/flight/price/prediction', formData);
      setPrediction(response.data.result);  // Update the prediction state with the response
      setError(null);  // Clear any previous error
    } catch (error) {
      console.error('There was an error making the request:', error);
      setError('Failed to get the prediction. Please try again.');
      setPrediction(null);  // Clear any previous prediction
    }
  };

  return (
<div>

<Navbar/>
<div className="card mb-3"  style={{ maxWidth: '800px' ,margin: '0 auto'}}>
  <div className="row g-0">
    <div className="col-md-4">
      <img src={flight} className="img-fluid rounded-start" alt="..." style={{ height: '1000px',width:'200px' }}/>
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h3 className="card-title">See Flight Price Prediction!</h3>

        <form className="row g-3" onSubmit={handleSubmit}>
  <div className="col-md-6">
    <label for="inputEmail4" className="form-label">Source City:</label>
    <select id="inputState" className="form-select" type="text"
            name="source_city"
            value={formData.source_city}
            onChange={handleChange}
            required>
      <option selected>Select Source:</option>
      <option value="Delhi">Delhi</option>
      <option value="Mumbai">Mumbai</option>
      <option value="Bangalore">Bangalore</option>
      <option value="Kolkata">Kolkata</option>
      <option value="Hyderabad">Hyderabad</option>
      <option value="Chennai">Chennai</option>
    </select>
  </div>
  <div className="col-md-6">
    <label for="inputPassword4" className="form-label">Destination City:</label>
    <select id="inputState" className="form-select" type="text"
            name="destination_city"
            value={formData.destination_city}
            onChange={handleChange}
            required>
      <option selected>Select Destination</option>
      <option value="Delhi">Delhi</option>
      <option value="Mumbai">Mumbai</option>
      <option value="Bangalore">Bangalore</option>
      <option value="Kolkata">Kolkata</option>
      <option value="Hyderabad">Hyderabad</option>
      <option value="Chennai">Chennai</option>
    </select>
  </div>
  <div className="col-12">
    <label for="inputAddress" className="form-label">Airline:</label>
    <select id="inputState" className="form-select" type="text"
            name="airline"
            value={formData.airline}
            onChange={handleChange}
            required>
      <option selected>Select Airline</option>
      <option value="Vistara">Vistara</option>
      <option value="Air_India">Air_India</option>
      <option value="Indigo">Indigo</option>
      <option value="GO_FIRST">GO_FIRST</option>
      <option value="AirAsia">AirAsia</option>
      <option value="SpiceJet">SpiceJet</option>
    </select>
  </div>
  <div className="col-12">
    <label for="inputAddress2" className="form-label">class:</label>
    <select id="inputState" className="form-select" type="number"
            name="cla"
            value={formData.cla}
            onChange={handleChange}
            required>
      <option selected>Select Business/Economy Class</option>
      <option value="1">Business</option>
      <option value="0">Economy</option>
    </select>
  </div>
  <div className="col-md-6">
    <label for="inputCity" className="form-label">Stops:</label>
    <input className="form-control" id="inputCity" type="number"
            name="stops"
            value={formData.stops}
            onChange={handleChange}
            required/>
  </div>
  <div className="col-md-6">
    <label for="inputCity" className="form-label">Days left:</label>
    <input className="form-control" id="inputCity" type="number"
            name="days_left"
            value={formData.days_left}
            onChange={handleChange}
            required/>
  </div>

  <div className="col-12">
    <button type="submit" className="btn btn-outline-info">Prediction</button>
  </div>
</form>

{/* Display the prediction result */}
<div className="alert alert-primary" role="alert" style={{ marginTop: '10px' }}>
      {prediction && (
        <div>
          <h5>Predicted Flight Price: $${prediction} </h5>
        </div>
      )}

      {/* Display any error message */}
      {error && (
        <div style={{ color: 'red' }}>
          <h3>{error}</h3>
        </div>
      )}
</div>



      </div>
    </div>
  </div>
</div> 


<Footer/>
</div>
  );
};

export default FlightPricePrediction;
