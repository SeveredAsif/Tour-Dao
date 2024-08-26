import React, { useState } from 'react';
import axios from 'axios'; // Make sure to install axios

const PlaceRecommend = () => {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:4000/destination/recommend', { query });
            setResult(response.data.result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>Travel Recommendation</h1>
            <input 
                type="text" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                placeholder="Enter a place" 
            />
            <button onClick={handleSubmit}>Get Recommendation</button>
            <div>
                <h2>Result:</h2>
                <p>{result}</p>
            </div>
        </div>
    );
};

export default PlaceRecommend;
