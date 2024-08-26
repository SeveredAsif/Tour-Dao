import React, { useEffect, useContext } from 'react';
import React, { useEffect,useState, useContext } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Modal from '../Components/Modal';
import confirm from '../pictures/confirm.jpg';
import bg from '../pictures/hotel-bg.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import '../css/HotelBooking.css'
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../Components/UserContext';

const HotelBooking = () => {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const { fullBookingData } = location.state || {};
  const { username } = useContext(UserContext);

  useEffect(() => {
    console.log('Full Booking Data:', fullBookingData);
  }, [fullBookingData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setShowModal(true);
      const dataToSend = {
        ...fullBookingData,
        username
      };
      const response = await axios.post('http://localhost:4000/hotels/booking/information', dataToSend);
      console.log('Success:', response.data);
      // Handle success state or redirect to payment page
    } catch (error) {
      console.error('Error:', error);
      // Handle error state or display error message
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    /*if (modalMessage.includes('successful')) {
      navigate('/home');
    }*/
  };

  return (
    <div className="hotel-page" style={{ backgroundImage:  `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Navbar />
      <div className="container">
        <h1 style={{ textAlign: "center" }}>Booking Confirmation</h1>

        {fullBookingData ? (
          <div className="card mb-3">
            <div className="card-header">
              <img src={confirm} style={{width:"800px",height:"500px"}} alt="confirm"/>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
              <div className="icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
</svg>
             </div>
                <strong>Destination:</strong> {fullBookingData.destination}</li>
              <li className="list-group-item">
              <div className="icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
</svg>

             </div>
                <strong>Check-In:</strong> {fullBookingData.checkIn}</li>
              <li className="list-group-item">
              <div className="icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
</svg>

             </div>
                <strong>Check-Out:</strong> {fullBookingData.checkOut}</li>
              <li className="list-group-item">
              <div className="icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
</svg>
             </div>
              <strong>Guests:</strong> {fullBookingData.guests}</li>
              <li className="list-group-item">
              <div className="icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
</svg>
             </div>
                <strong>Hotel Name:</strong> {fullBookingData.hotelName}</li>
              <li className="list-group-item">
              <div className="icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

             </div>
                <strong>Price:</strong> ${fullBookingData.price}</li>
            </ul>
            <div className="card-body">
              <button type="submit" className="btn btn-outline-info" onClick={handleSubmit}>
                Confirm Booking
              </button>
              <Modal show={showModal} handleClose={handleCloseModal} message="Booking Confirmed" />
              <Link to={`/hotels/booking/payment`}>
              <button type="button" class="btn btn-outline-success">Proceed to Payment</button>
              </Link>
            </div>
          </div>
        ) : (
          <p>No booking data available.</p>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default HotelBooking;
