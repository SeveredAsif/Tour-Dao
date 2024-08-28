import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Destinations.css";

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/destinations")
      .then((response) => {
        setDestinations(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error loading destinations!</div>;

  return (
    <div className="destinations">
      <a className="search-link" href="/destination/recommend">Search Destinations</a>
      <h1>Popular Destinations</h1>
      <div className="grid">
        {destinations.map((destination) => (
          <div key={destination.id} className="card">
            <img src={destination.picLink} alt={destination.name} className="card-img"/>
            <div className="card-content">
              <h2 className="card-title">{destination.name}</h2>
              <p className="card-rating">Rating: {destination.rating}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destinations;
