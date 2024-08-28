import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/Predict.css';
import Navbar from '../Components/Navbar.jsx'

const Predict = () => {
    const [features, setFeatures] = useState({
        hotel: '0',
        meal: '0',
        market_segment: '0',
        distribution_channel: '0',
        reserved_room_type: '1',
        deposit_type: '0',
        customer_type: '0',
        year: '0',
        month: '7',
        day: '1',
        lead_time: '737',
        arrival_date_week_number: '27',
        arrival_date_day_of_month: '1',
        stays_in_weekend_nights: '0',
        stays_in_week_nights: '0',
        adults: '2',
        children: '0',
        babies: '0',
        is_repeated_guest: '0',
        previous_cancellations: '0',
        previous_bookings_not_canceled: '0',
        agent: '0',//74.88
        company: '0',//10.735
        adr: '0',//101.969092
        required_car_parking_spaces: '0',//0.062553
        total_of_special_requests: '0',//0.571504
    });

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [prediction, setPrediction] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setFeatures({
            ...features,
            year: (date.getFullYear() - 2015).toString(),
            arrival_date_day_of_month: date.getDate().toString(),
            day: date.getDate().toString(),
            month: (date.getMonth() + 1).toString()
        });
    };

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
            console.log(transformedFeatures);
            const res = await axios.post('http://localhost:4000/predict', { features: transformedFeatures });

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
        <>
            <Navbar />    
            <div className="container">  
            <h1 className="page-title">Predict Hotel Booking Cancellation</h1>    
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="date-picker-container">
                    <label htmlFor="arrival_date">Arrival Date:</label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="yyyy/MM/dd"
                    />
                </div>

                <label htmlFor="hotel">Hotel:</label>
                <select name="hotel" value={features.hotel} onChange={handleChange}>
                    <option value="0">Resort Hotel</option>
                    <option value="1">City Hotel</option>
                </select>

                <label htmlFor="meal">Meal:</label>
                <select name="meal" value={features.meal} onChange={handleChange}>
                    <option value="0">BB</option>
                    <option value="1">FB</option>
                    <option value="2">HB</option>
                    <option value="3">SC</option>
                    <option value="4">Undefined</option>
                </select>

                <label htmlFor="market_segment">Market Segment:</label>
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

                <label htmlFor="distribution_channel">Distribution Channel:</label>
                <select name="distribution_channel" value={features.distribution_channel} onChange={handleChange}>
                    <option value="0">Direct</option>
                    <option value="1">Corporate</option>
                    <option value="2">TA/TO</option>
                    <option value="3">Undefined</option>
                    <option value="4">GDS</option>
                </select>

                <label htmlFor="reserved_room_type">Reserved Room Type:</label>
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

                <label htmlFor="deposit_type">Deposit Type:</label>
                <select name="deposit_type" value={features.deposit_type} onChange={handleChange}>
                    <option value="0">No Deposit</option>
                    <option value="1">Refundable</option>
                    <option value="3">Non Refund</option>
                </select>

                <label htmlFor="customer_type">Customer Type:</label>
                <select name="customer_type" value={features.customer_type} onChange={handleChange}>
                    <option value="0">Transient</option>
                    <option value="1">Contract</option>
                    <option value="2">Transient-Party</option>
                    <option value="3">Group</option>
                </select>

                {/* <select name="year" value={features.year} onChange={handleChange}>
                    <option value="0">2015</option>
                    <option value="1">2014</option>
                    <option value="2">2016</option>
                    <option value="3">2017</option>
                </select> */}

                <label htmlFor="lead_time">Lead Time:</label>
                <input type="text" name="lead_time" value={features.lead_time} onChange={handleChange} placeholder="Lead Time" />
                <label htmlFor="arrival_date_week_number">Arrival Date Week Number:</label>
                <input type="text" name="arrival_date_week_number" value={features.arrival_date_week_number} onChange={handleChange} placeholder="Arrival Date Week Number" />
                <label htmlFor="arrival_date_day_of_month">Arrival date day of month:</label>
                <input type="text" name="arrival_date_day_of_month" value={features.arrival_date_day_of_month} onChange={handleChange} placeholder="Arrival Date Day of Month" />

                <label htmlFor="stays_in_weekend_nights">Stays in Weekend Nights:</label>
                <input type="text" name="stays_in_weekend_nights" value={features.stays_in_weekend_nights} onChange={handleChange} placeholder="Stays in Weekend Nights" />

                <label htmlFor="stays_in_week_nights">Stays in Week Nights:</label>
                <input type="text" name="stays_in_week_nights" value={features.stays_in_week_nights} onChange={handleChange} placeholder="Stays in Week Nights" />

                <label htmlFor="adults">Adults:</label>
                <input type="text" name="adults" value={features.adults} onChange={handleChange} placeholder="Adults" />

                <label htmlFor="children">Children:</label>
                <input type="text" name="children" value={features.children} onChange={handleChange} placeholder="Children" />

                <label htmlFor="babies">Babies:</label>
                <input type="text" name="babies" value={features.babies} onChange={handleChange} placeholder="Babies" />

                <label htmlFor="is_repeated_guest">Is Repeated Guest:</label>
                <input type="text" name="is_repeated_guest" value={features.is_repeated_guest} onChange={handleChange} placeholder="Is Repeated Guest" />

                <label htmlFor="previous_cancellations">Previous Cancellations:</label>
                <input type="text" name="previous_cancellations" value={features.previous_cancellations} onChange={handleChange} placeholder="Previous Cancellations" />

                <label htmlFor="previous_bookings_not_canceled">Previous Bookings Not Canceled:</label>
                <input type="text" name="previous_bookings_not_canceled" value={features.previous_bookings_not_canceled} onChange={handleChange} placeholder="Previous Bookings Not Canceled" />
                <label htmlFor="lead_time">Lead Time:</label>
                <input type="text" name="lead_time" value={features.lead_time} onChange={handleChange} placeholder="Lead Time" />
                <label htmlFor="arrival_date_week_number">Arrival Date Week Number:</label>
                <input type="text" name="arrival_date_week_number" value={features.arrival_date_week_number} onChange={handleChange} placeholder="Arrival Date Week Number" />

                <label htmlFor="agent">Agent:</label>
                <input type="text" name="agent" value={features.agent} onChange={handleChange} placeholder="Agent" />

                <label htmlFor="company">Company:</label>
                <input type="text" name="company" value={features.company} onChange={handleChange} placeholder="Company" />

                <label htmlFor="adr">ADR:</label>
                <input type="text" name="adr" value={features.adr} onChange={handleChange} placeholder="ADR" />

                <label htmlFor="required_car_parking_spaces">Required Car Parking Spaces:</label>
                <input type="text" name="required_car_parking_spaces" value={features.required_car_parking_spaces} onChange={handleChange} placeholder="Required Car Parking Spaces" />

                <label htmlFor="total_of_special_requests">Total of Special Requests:</label>
                <input type="text" name="total_of_special_requests" value={features.total_of_special_requests} onChange={handleChange} placeholder="Total of Special Requests" />

                <button type="submit">Predict</button>
            </form>

            {prediction && (
                <div className="prediction-result">
                    <h3>Prediction: {`Probability of Cancelling: ${(prediction[0] * 100)}% | Probability of not Cancelling: ${(prediction[1] * 100)}%`}</h3>
                </div>
            )}
        </div>
        </div>
        </>  
    );
};

export default Predict;
