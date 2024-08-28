import pickle
import numpy as np
import pandas as pd


feature_names = ['stops', 'class', 'days_left', 'AirAsia', 'Air_India',
       'GO_FIRST', 'Indigo', 'SpiceJet', 'Vistara', 'src_Bangalore',
       'src_Chennai', 'src_Delhi', 'src_Hyderabad', 'src_Kolkata',
       'src_Mumbai', 'dest_Bangalore', 'dest_Chennai', 'dest_Delhi',
       'dest_Hyderabad', 'dest_Kolkata', 'dest_Mumbai']


# Now you can use the model to make predictions
# predictions = model.predict(X_test)


def prepare_input(user_input, feature_names):
    # Create a zero-filled array for all features
    input_data = np.zeros(len(feature_names))

    # Fill in the numeric features
    input_data[feature_names.index('days_left')] = user_input['days_left']
    input_data[feature_names.index('stops')] = user_input['stops']
    input_data[feature_names.index('class')] = user_input['class']

    # One-hot encode categorical features
    if user_input['airline'] in feature_names:
        input_data[feature_names.index(user_input['airline'])] = 1
    if f"src_{user_input['source_city']}" in feature_names:
        input_data[feature_names.index(f"src_{user_input['source_city']}")] = 1  
    if f"dest_{user_input['destination_city']}" in feature_names:
        input_data[feature_names.index(f"dest_{user_input['destination_city']}")] = 1

    return pd.DataFrame([input_data], columns=feature_names)

# Usage

import sys
import json

# Retrieve arguments passed from Node.js

user_input = json.loads(sys.argv[1])

# Load the model from the file
with open('flightPricePrediction.pkl', 'rb') as file:
    model = pickle.load(file)
    input_df = prepare_input(user_input, feature_names)
    y_pred = model.predict(input_df)
    print(y_pred)
