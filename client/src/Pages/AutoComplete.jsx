import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AutoComplete.css';

const Autocomplete = ({ value, onChange, placeholder }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    if (inputValue.length > 2) {
      const fetchSuggestions = async () => {
        try {
          const response = await axios.get('https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchAirport', {
            params: { query: inputValue },
            headers: {
              'x-rapidapi-key': 'ef609bca72msha460ddd3d4261e7p12b5b7jsn3ef8a8dd62b2',
              'x-rapidapi-host': 'tripadvisor16.p.rapidapi.com',
            },
          });
          setSuggestions(response.data.data); // Adjust based on the actual response structure
        } catch (error) {
          console.error('Error fetching location suggestions', error);
        }
      };

      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    console.log(suggestion)
    setInputValue(suggestion.
        airportCode
        ); // Adjust based on actual response structure
    onChange(suggestion.code); // Adjust based on actual response structure
    setSuggestions([]);
  };

  return (
    <div className="autocomplete">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion.name} ({suggestion.code})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
