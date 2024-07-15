import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import '../css/FlightPage.css';
import { FaPlane, FaGlobe, FaUsers, FaTicketAlt } from 'react-icons/fa';

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
        navigate('/results2', { state:  response.data  });
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
      <div className="hero-section">
        <h1>Find Your Perfect Flight</h1>
        <p>Book your next adventure with us. Best prices guaranteed!</p>
      </div>
      <form onSubmit={handleSubmit} className="flight-form">
        <label>
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

      <div className="highlights-section">
        <h2>Why Book With Us?</h2>
        <div className="highlights">
          <div className="highlight">
            <FaPlane size={50} />
            <h3>Easy Booking</h3>
            <p>Book your flights in just a few clicks.</p>
          </div>
          <div className="highlight">
            <FaGlobe size={50} />
            <h3>Global Coverage</h3>
            <p>Flights to destinations all around the world.</p>
          </div>
          <div className="highlight">
            <FaUsers size={50} />
            <h3>24/7 Support</h3>
            <p>Our support team is here to help you anytime.</p>
          </div>
          <div className="highlight">
            <FaTicketAlt size={50} />
            <h3>Best Prices</h3>
            <p>We offer the best prices for your travels.</p>
          </div>
        </div>
      </div>

      <div className="footer">
        <p>© 2024 Your Company. All rights reserved.</p>
      </div>
    </div>
  );
};

export default FlightPage4;
