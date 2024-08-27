import sys
import json
import numpy as np
import io
from tensorflow.keras.models import load_model

# Load the model
model = load_model('model.h5')

# Override stdout and stderr with utf-8 encoding
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

def preprocess_input(data):
    # Access the nested 'features' dictionary
    features = data['features']
    
    # Convert string values to float
    for key in features:
        features[key] = float(features[key])
    
    return np.array(list(features.values())).reshape(1, -1)

def main():
    print("Python script started", file=sys.stderr)
    input_data = sys.argv[1]
    print("Raw input data:", input_data, file=sys.stderr)
    
    try:
        data = json.loads(input_data)
        print("Parsed data:", data, file=sys.stderr)
    except json.JSONDecodeError as e:
        print("JSON Decode Error:", e, file=sys.stderr)
        sys.exit(1)
    
    # Preprocess the input data
    processed_data = preprocess_input(data)
    
    # Make the prediction (if the model is loaded)
    try:
        prediction = model.predict(processed_data)
        print(json.dumps({'prediction': prediction[-1].tolist()}))
    except Exception as e:
        print(f"Error during prediction: {e}", file=sys.stderr)

if __name__ == "__main__":
    main()
