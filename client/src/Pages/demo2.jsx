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
    <div classNameName="container-fluid blue-container blue-background py-5">
      <div classNameName="row">
        <div classNameName="col-md-6">
          <img src={flight} classNameName="img-fluid rounded" alt="Left" />
        </div>
        <div classNameName="col-md-6 d-flex align-items-center">
          <div classNameName="p-5">

          <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Stops:</label>
          <input
            type="number"
            name="stops"
            value={formData.stops}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>className:</label>
          <input
            type="number"
            name="cla"
            value={formData.cla}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Days Left:</label>
          <input
            type="number"
            name="days_left"
            value={formData.days_left}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Airline:</label>
          <input
            type="text"
            name="airline"
            value={formData.airline}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Source City:</label>
          <input
            type="text"
            name="source_city"
            value={formData.source_city}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Destination City:</label>
          <input
            type="text"
            name="destination_city"
            value={formData.destination_city}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Predict Price</button>
      </form>

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
            
            <div className="d-grid gap-2 d-md-block">

         
           </div>
          </div>
        </div>
      </div>
    </div>




    </div>
  );
};

export default FlightPricePrediction;
