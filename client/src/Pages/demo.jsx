import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../css/PlaceRecommend.css';
import place from '../pictures/place.jpg';
import place_bg from '../pictures/place-bg.jpg';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const PlaceRecommend = () => {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState([]); // Initialize as an empty array

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:4000/destination/recommend', { query });

            // Parse the result string into a JSON object
            const parsedResult = JSON.parse(response.data.result);
        
            // Now, set the parsed array to state
            setResult(parsedResult);

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <Navbar/>
            <img src={place_bg} className="full-width-img" alt="..." />
            <div className="content-wrapper">
            

                <h1>Destination Recommendation</h1>
                <div className="input-group mb-3" style={{ maxWidth: '1500px', margin: '0 auto' }}>
                    <input 
                        type="text" 
                        value={query} 
                        onChange={(e) => setQuery(e.target.value)} 
                        placeholder="Enter a place" 
                        className="form-control"
                    />
                    <button onClick={handleSubmit} className="btn btn-outline-info"
                     style={{ 
                        padding: '10px', // Adjust the padding as needed
                        margin: '1px',
                        border: '2px solid #17a2b8' // Border width should be smaller than padding to create the gap
                    }}>Get Recommendation</button>
                </div>
                
                <div>
                    {result.length > 0 && (
                        <div className="card-container">
                            {result.map((rec, index) => (
                                <div key={index} className="card">
                                    <img src={place} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{rec.place}</h5>
                                        <p className="card-text">{rec.description}</p>
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">City: {rec.city}</li>
                                        <li className="list-group-item">Distance: {rec.distance}</li>
                                        <li className="list-group-item">Rating: {rec.ratings}</li>
                                    </ul>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                   
            </div> 
        </div>
    );
};

export default PlaceRecommend;

