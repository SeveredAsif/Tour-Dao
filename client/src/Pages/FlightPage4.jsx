import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import '../css/FlightPage.css';
import { FaPlaneDeparture, FaPlaneArrival, FaCalendarAlt, FaUsers, FaChild, FaSearch } from 'react-icons/fa';

const FlightPage4 = () => {
  const [from, setFrom] = useState('BOM');
  const [to, setTo] = useState('DEL');
  const [departureDate, setDepartureDate] = useState('2024-07-13');
  const [returnDate, setReturnDate] = useState('');
  const [planeClass, setPlaneClass] = useState('ECONOMY');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
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
        console.log(response.data);
        navigate('/results2', { state: response.data });
      })
      .catch(err => {
        setError('Error fetching flights');
        setLoading(false);
      });
  };

  const fetchSuggestions = debounce(async (query, setFunction, setShowFunction) => {
    if (query.length < 2) {
      setFunction([]);
      setShowFunction(false);
      return;
    }
    try {
      const response = await axios.get('http://localhost:4000/airports/search', {
        params: { query }
      });
      setFunction(response.data);
      setShowFunction(true);
    } catch (err) {
      console.error('Error fetching suggestions', err);
    }
  }, 300);

  const handleFromChange = (e) => {
    setFrom(e.target.value);
    fetchSuggestions(e.target.value, setFromSuggestions, setShowFromSuggestions);
  };

  const handleToChange = (e) => {
    setTo(e.target.value);
    fetchSuggestions(e.target.value, setToSuggestions, setShowToSuggestions);
  };

  const handleSuggestionClick = (iata, setFunction, setShowFunction, setSuggestionsFunction) => {
    setFunction(iata);
    setShowFunction(false);
    setSuggestionsFunction([]);
  };

  return (
    <div className="flight-page">
      <h1>Search for Flights</h1>
      <form onSubmit={handleSubmit} className="flight-form">
        <label>
          <FaPlaneDeparture className="input-icon" />
          From:
          <input type="text" value={from} onChange={handleFromChange} />
          {showFromSuggestions && fromSuggestions.length > 0 && (
            <ul className="suggestions-list">
              {fromSuggestions.map((s, index) => (
                <li key={index} onClick={() => handleSuggestionClick(s.iata, setFrom, setShowFromSuggestions, setFromSuggestions)}>
                  {s.iata} - {s.airport} ({s.region_name})
                </li>
              ))}
            </ul>
          )}
        </label>
        <label>
          <FaPlaneArrival className="input-icon" />
          To:
          <input type="text" value={to} onChange={handleToChange} />
          {showToSuggestions && toSuggestions.length > 0 && (
            <ul className="suggestions-list">
              {toSuggestions.map((s, index) => (
                <li key={index} onClick={() => handleSuggestionClick(s.iata, setTo, setShowToSuggestions, setToSuggestions)}>
                  {s.iata} - {s.airport} ({s.region_name})
                </li>
              ))}
            </ul>
          )}
        </label>
        <label>
          <FaCalendarAlt className="input-icon" />
          Departure Date:
          <input type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} />
        </label>
        <label>
          <FaCalendarAlt className="input-icon" />
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
          <FaUsers className="input-icon" />
          Adults:
          <input type="number" value={adults} onChange={(e) => setAdults(Number(e.target.value))} />
        </label>
        <label>
          <FaChild className="input-icon" />
          Children:
          <input type="number" value={children} onChange={(e) => setChildren(Number(e.target.value))} />
        </label>
        <button type="submit" className="search-button">
          <FaSearch /> Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default FlightPage4;
