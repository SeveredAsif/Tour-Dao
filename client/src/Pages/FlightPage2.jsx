import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './FlightPage.css';
import Autocomplete from './AutoComplete';

const FlightPage = () => {
  const [from, setFrom] = useState('BOM');
  const [to, setTo] = useState('DEL');
  const [departureDate, setDepartureDate] = useState('2024-07-13');
  const [returnDate, setReturnDate] = useState('');
  const [planeClass, setPlaneClass] = useState('ECONOMY');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const searchParams = {
      from,
      to,
      departureDate,
      returnDate,
      classOfService: planeClass,
      numAdults: adults,
      numChildren: children,
    };

    axios.post('http://localhost:4000/flights/search', searchParams)
      .then(response => {
        setLoading(false);
        console.log(searchParams);
        navigate('/results', { state: { flights: response.data.flights } });
      })
      .catch(err => {
        setError('Error fetching flights');
        setLoading(false);
      });
  };

  return (
    <div className="flight-page">
      <h1>Search for Flights</h1>
      <form onSubmit={handleSubmit} className="flight-form">
        <label>
          From:
          <Autocomplete value={from} onChange={setFrom} placeholder="Enter departure location" />
        </label>
        <label>
          To:
          <Autocomplete value={to} onChange={setTo} placeholder="Enter destination location" />
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
    </div>
  );
};

export default FlightPage;
