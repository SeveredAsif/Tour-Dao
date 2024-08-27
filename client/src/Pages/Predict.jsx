import React, { useState } from 'react';
import axios from 'axios';
import '../css/Predict.css'; // Import the CSS file

const Predict = () => {
    const [features, setFeatures] = useState({
        hotel: '1',
        meal: '0',
        market_segment: '1',
        distribution_channel: '1',
        reserved_room_type: '1',
        deposit_type: '0',
        customer_type: '2',
        year: '0',
        month: '12',
        day: '2',
        lead_time: '3.135494',
        arrival_date_week_number: '3.951244',
        arrival_date_day_of_month: '2.944439',
        stays_in_weekend_nights: '0',
        stays_in_week_nights: '1',
        adults: '1',
        children: '0',
        babies: '0',
        is_repeated_guest: '0',
        previous_cancellations: '1',
        previous_bookings_not_canceled: '0',
        agent: '0',
        company: '3.713572',
        adr: '4.189655',
        required_car_parking_spaces: '0',
        total_of_special_requests: '0',
    });

    const [prediction, setPrediction] = useState(null);

    const handleChange = (e) => {
        setFeatures({
            ...features,
            [e.target.name]: e.target.value
        });
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const res = await axios.post('http://localhost:4000/predict', { features });

    //         // Clean the response data
    //         const cleanedData = res.data.result;
    //         const resultData = JSON.parse(cleanedData);
    //         const prediction = resultData.prediction;
    //         console.log("Cleaned Data:", prediction);

    //         setPrediction(cleanedData);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:4000/predict', { features });

            // Extract and clean the JSON part from the result field
            const resultString = res.data.result;
            // Use a regular expression to find the JSON part
            const jsonMatch = resultString.match(/\{.*\}/);

            if (jsonMatch) {
                const jsonString = jsonMatch[0];
                const resultData = JSON.parse(jsonString);
                const prediction = resultData.prediction;

                console.log("Prediction:", prediction);

                setPrediction(prediction);
            } else {
                console.error("No valid JSON found in the result.");
            }
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <input type="text" name="hotel" value={features.hotel} onChange={handleChange} placeholder="Hotel" />
                <input type="text" name="meal" value={features.meal} onChange={handleChange} placeholder="Meal" />
                <input type="text" name="market_segment" value={features.market_segment} onChange={handleChange} placeholder="Market Segment" />
                <input type="text" name="distribution_channel" value={features.distribution_channel} onChange={handleChange} placeholder="Distribution Channel" />
                <input type="text" name="reserved_room_type" value={features.reserved_room_type} onChange={handleChange} placeholder="Reserved Room Type" />
                <input type="text" name="deposit_type" value={features.deposit_type} onChange={handleChange} placeholder="Deposit Type" />
                <input type="text" name="customer_type" value={features.customer_type} onChange={handleChange} placeholder="Customer Type" />
                <input type="text" name="year" value={features.year} onChange={handleChange} placeholder="Year" />
                <input type="text" name="month" value={features.month} onChange={handleChange} placeholder="Month" />
                <input type="text" name="day" value={features.day} onChange={handleChange} placeholder="Day" />
                <input type="text" name="lead_time" value={features.lead_time} onChange={handleChange} placeholder="Lead Time" />
                <input type="text" name="arrival_date_week_number" value={features.arrival_date_week_number} onChange={handleChange} placeholder="Arrival Date Week Number" />
                <input type="text" name="arrival_date_day_of_month" value={features.arrival_date_day_of_month} onChange={handleChange} placeholder="Arrival Date Day of Month" />
                <input type="text" name="stays_in_weekend_nights" value={features.stays_in_weekend_nights} onChange={handleChange} placeholder="Stays in Weekend Nights" />
                <input type="text" name="stays_in_week_nights" value={features.stays_in_week_nights} onChange={handleChange} placeholder="Stays in Week Nights" />
                <input type="text" name="adults" value={features.adults} onChange={handleChange} placeholder="Adults" />
                <input type="text" name="children" value={features.children} onChange={handleChange} placeholder="Children" />
                <input type="text" name="babies" value={features.babies} onChange={handleChange} placeholder="Babies" />
                <input type="text" name="is_repeated_guest" value={features.is_repeated_guest} onChange={handleChange} placeholder="Is Repeated Guest" />
                <input type="text" name="previous_cancellations" value={features.previous_cancellations} onChange={handleChange} placeholder="Previous Cancellations" />
                <input type="text" name="previous_bookings_not_canceled" value={features.previous_bookings_not_canceled} onChange={handleChange} placeholder="Previous Bookings Not Canceled" />
                <input type="text" name="agent" value={features.agent} onChange={handleChange} placeholder="Agent" />
                <input type="text" name="company" value={features.company} onChange={handleChange} placeholder="Company" />
                <input type="text" name="adr" value={features.adr} onChange={handleChange} placeholder="ADR" />
                <input type="text" name="required_car_parking_spaces" value={features.required_car_parking_spaces} onChange={handleChange} placeholder="Required Car Parking Spaces" />
                <input type="text" name="total_of_special_requests" value={features.total_of_special_requests} onChange={handleChange} placeholder="Total of Special Requests" />

                <button type="submit">Predict</button>
            </form>
            {prediction && (
                <h3>
                    Prediction: {`Canceled: ${(prediction[0] * 100)}% | Not Canceled: ${(prediction[1] * 100)}%`}
                </h3>
            )}
        </div>
    );
};

export default Predict;
