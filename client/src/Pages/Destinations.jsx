import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Destinations.css";
//import Navbar from "../Components/Navbar";

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/destinations")
      .then((response) => {
        console.log(response.data.data)
        setDestinations(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading destinations!</p>;

  return (
    <div className="destinations">
      <h1>Popular Destinations</h1>
      <div className="grid">
        {destinations.map((destination) => (
          <div key={destination.id} className="card">
            <img src={destination.picLink} alt={destination.name} />
            <div className="card-content">
              <h2>{destination.name}</h2>
              <p>Rating: {destination.rating}</p>
            </div>
          </div>
        ))}
      </div>
      <a class="dropdown-item" href="/destination/recommend">Serach Destinations</a>
    </div>
  );
};

export default Destinations;
