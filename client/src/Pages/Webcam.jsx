import React, { useState } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs';
import "../css/webcam.css"

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
        <div>
            <h1>Image Classifier</h1>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <div>
                {image && <img id="uploaded-image" src={image} alt="Uploaded" width="400px" />}
            </div>
            <button onClick={classifyImage}>Classify Image</button>
            <div>
                {predictions.length > 0 && (
                    <ul>
                        {predictions.map((prediction, index) => (
                            <li key={index}>
                                {prediction.className}: {(prediction.probability * 100).toFixed(2)}%
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default ImageClassifier;
