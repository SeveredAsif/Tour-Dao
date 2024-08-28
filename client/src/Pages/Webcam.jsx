import React, { useState } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs';
import "../css/webcam.css";
import Navbar from '../Components/Navbar'; // Importing Navbar component

function ImageClassifier() {
    const [image, setImage] = useState(null);
    const [predictions, setPredictions] = useState([]);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const classifyImage = async () => {
        const imgElement = document.getElementById('uploaded-image');
        const model = await mobilenet.load();
        const predictions = await model.classify(imgElement);
        setPredictions(predictions);
    };

    return (
        <>
            <Navbar />
        <div className="container">
             {/* Including Navbar component */}
            <header className="header">
                <h1>SnapClassifier</h1>
                <p>Upload your travel photos and let us identify the destination for you!</p>
            </header>
            <div className="upload-area" onClick={() => document.getElementById('image-input').click()}>
                <input type="file" accept="image/*" onChange={handleImageUpload} id="image-input" style={{ display: 'none' }} />
                <p>Click to upload an image or drag and drop here</p>
                {image && <img id="uploaded-image" src={image} alt="Uploaded" />}
            </div>
            <button className="classify-button" onClick={classifyImage}>Classify Image</button>
            <div className="prediction-results">
                {predictions.length > 0 && (
                    <ul>
                        {predictions.map((prediction, index) => (
                            <li key={index}>
                                <span>{prediction.className}:</span> {(prediction.probability * 100).toFixed(2)}%
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <footer className="footer">
                <p>&copy; 2024 SnapClassifier. All rights reserved.</p>
            </footer>
        </div>
        </>
    );
}

export default ImageClassifier;
