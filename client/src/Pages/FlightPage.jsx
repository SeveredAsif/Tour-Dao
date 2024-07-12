import React, { useState } from 'react';
import axios from 'axios';
import './FlightPage.css';

const FlightPage = () => {
  const [from, setFrom] = useState('BOM'); // Default value for sourceAirportCode
  const [to, setTo] = useState('DEL'); // Default value for destinationAirportCode
  const [departureDate, setDepartureDate] = useState('2024-07-13'); // Default value for date
  const [returnDate, setReturnDate] = useState('');
  const [planeClass, setPlaneClass] = useState('ECONOMY'); // Default value for classOfService
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const searchParams = {
      from,
      to,
      departureDate,
      returnDate,
      classOfService: planeClass, // Renaming planeClass to classOfService for consistency with API
      numAdults: adults,
      numChildren: children,
    };

    axios.post('http://localhost:4000/flights/search', searchParams)
      .then(response => {
        setFlights(response.data.flights);
        console.log(response.data.flights);
        setLoading(false);
      })
      .catch(err => {
        setError('Error fetching flights');
        setLoading(false);
      });
    //console.log(searchParams);
  };

  return (    
    <div className="flight-page"> 
      <h1>Search for Flights</h1>
      <form onSubmit={handleSubmit} className="flight-form">
        <label>
          From:
          <input type="text" value={from} onChange={(e) => setFrom(e.target.value)} />
        </label>
        <label>
          To:
          <input type="text" value={to} onChange={(e) => setTo(e.target.value)} />
        </label>
        <label>
          Departure Date:
          <input type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} />
        </label>
        <label>
          Return Date:
          <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
        </label>
        <label>
          Class:
          <select value={planeClass} onChange={(e) => setPlaneClass(e.target.value)}>
            <option value="ECONOMY">Economy</option>
            <option value="BUSINESS">Business</option>
            <option value="FIRST">First</option>
          </select>
        </label>
        <label>
          Adults:
          <input type="number" value={adults} onChange={(e) => setAdults(Number(e.target.value))} />
        </label>
        <label>
          Children:
          <input type="number" value={children} onChange={(e) => setChildren(Number(e.target.value))} />
        </label>
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {flights.length > 0 && (
        <div className="flight-results">
          <h2>Flight Results:</h2>
          <ul>
            {flights.map((flight, index) => (
              <li key={index}>
                <p>Origin: {flight.segments[0].legs[0].originStationCode}</p>
                <p>Destination: {flight.segments[0].legs[0].destinationStationCode}</p>
                <p>Departure: {flight.segments[0].legs[0].departureDateTime}</p>
                <p>Arrival: {flight.segments[0].legs[0].arrivalDateTime}</p>
                <p>Class: {flight.segments[0].legs[0].classOfService}</p>
                <p>Flight Number: {flight.segments[0].legs[0].flightNumber}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FlightPage;
