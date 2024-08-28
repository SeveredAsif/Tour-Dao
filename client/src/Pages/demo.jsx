import React, { useState } from 'react';
import axios from 'axios';
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
    <div classNameNameName="container-fluid blue-container blue-background py-5">
      <div classNameNameName="row">
        <div classNameNameName="col-md-6">
          <img src={flight} classNameNameName="img-fluid rounded" alt="Left" />
        </div>
        <div classNameNameName="col-md-6 d-flex align-items-center">
          <div classNameNameName="p-5">

          <form className="row g-3" onSubmit={handleSubmit}>
  <div className="col-md-6">
  <label for="inputState" className="form-label">Source City:</label>
    <select id="inputState" className="form-select"  type="text"
            name="source_city"
            value={formData.source_city}
            onChange={handleChange}
            required>
      <option selected>Choose...</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
  </div>
  <div className="col-md-6">
  <label for="inputState" className="form-label">Destination City:</label>
    <select id="inputState" className="form-select"  type="text"
            name="destination_city"
            value={formData.destination_city}
            onChange={handleChange}
            required>
      <option selected>Choose...</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
  </div>
  <div className="col-12">
  <label for="inputState" className="form-label">Airline:</label>
    <select id="inputState" className="form-select"  type="text"
            name="airline"
            value={formData.cla}
            onChange={handleChange}
            required>
      <option selected>Choose...</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
  </div>
  <div className="col-md-12">
    <label for="inputCity" className="form-label">Class</label>
    <input className="form-control" id="inputCity"  type="number"
            name="cla"
            value={formData.cla}
            onChange={handleChange}
            required/>
  </div>
  <div className="col-md-6">
    <label for="inputState" className="form-label">Stops:</label>
    <input className="form-control" id="inputCity"  type="number" placeholder="stops between flights"
            name="stops"
            value={formData.stops}
            onChange={handleChange}
            required/>
  </div>

  <div className="col-md-6">
    <label for="inputState" className="form-label">Days left:</label>
     <select id="inputState" className="form-select"  type="number"
            name="airline"
            value={formData.days_left}
            onChange={handleChange}
            required>
      <option selected>Choose...</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>        
  </div>

  <div className="col-12">
  <button type="submit">Predict Price</button>
  </div>
</form>

          <div>

  



      {/* Display the prediction result */}
      {prediction && (
        <div>
          <h3>Predicted Flight Price: {prediction}</h3>
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




    </div>
  );
};

export default FlightPricePrediction;
