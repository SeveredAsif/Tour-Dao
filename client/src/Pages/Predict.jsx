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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const transformedFeatures = {
                ...features,
                lead_time: Math.log(parseFloat(features.lead_time) + 1),
                arrival_date_week_number: Math.log(parseFloat(features.arrival_date_week_number) + 1),
                arrival_date_day_of_month: Math.log(parseFloat(features.arrival_date_day_of_month) + 1),
                agent: Math.log(parseFloat(features.agent) + 1),
                company: Math.log(parseFloat(features.company) + 1),
                adr: Math.log(parseFloat(features.adr) + 1),
            };

            const res = await axios.post('http://localhost:4000/predict', { features: transformedFeatures });

            // Extract and clean the JSON part from the result field
            const resultString = res.data.result;
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
                <select name="hotel" value={features.hotel} onChange={handleChange}>
                    <option value="0">Resort Hotel</option>
                    <option value="1">City Hotel</option>
                </select>

                <select name="meal" value={features.meal} onChange={handleChange}>
                    <option value="0">BB</option>
                    <option value="1">FB</option>
                    <option value="2">HB</option>
                    <option value="3">SC</option>
                    <option value="4">Undefined</option>
                </select>

                <select name="market_segment" value={features.market_segment} onChange={handleChange}>
                    <option value="0">Direct</option>
                    <option value="1">Corporate</option>
                    <option value="2">Online TA</option>
                    <option value="3">Offline TA/TO</option>
                    <option value="4">Complementary</option>
                    <option value="5">Groups</option>
                    <option value="6">Undefined</option>
                    <option value="7">Aviation</option>
                </select>

                <select name="distribution_channel" value={features.distribution_channel} onChange={handleChange}>
                    <option value="0">Direct</option>
                    <option value="1">Corporate</option>
                    <option value="2">TA/TO</option>
                    <option value="3">Undefined</option>
                    <option value="4">GDS</option>
                </select>

                <select name="reserved_room_type" value={features.reserved_room_type} onChange={handleChange}>
                    <option value="0">C</option>
                    <option value="1">A</option>
                    <option value="2">D</option>
                    <option value="3">E</option>
                    <option value="4">G</option>
                    <option value="5">F</option>
                    <option value="6">H</option>
                    <option value="7">L</option>
                    <option value="8">B</option>
                </select>

                <select name="deposit_type" value={features.deposit_type} onChange={handleChange}>
                    <option value="0">No Deposit</option>
                    <option value="1">Refundable</option>
                    <option value="3">Non Refund</option>
                </select>

                <select name="customer_type" value={features.customer_type} onChange={handleChange}>
                    <option value="0">Transient</option>
                    <option value="1">Contract</option>
                    <option value="2">Transient-Party</option>
                    <option value="3">Group</option>
                </select>

                <select name="year" value={features.year} onChange={handleChange}>
                    <option value="0">2015</option>
                    <option value="1">2014</option>
                    <option value="2">2016</option>
                    <option value="3">2017</option>
                </select>

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
