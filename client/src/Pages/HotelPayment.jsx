import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Modal from '../Components/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import qr_Image from '../pictures/qr_code.jpg';
import '../css/HotelPayment.css';
import card from '../pictures/card.png';
import mobile from '../pictures/mobile-banking.png';

const HotelPayment = () => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [selectedOption, setSelectedOption] = useState('card');
  const [showModal, setShowModal] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardHolderName: '',
    cardNumber: '',
    expireDate: '',
    cvc: ''
  });
  const [transactionId, setTransactionId] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleCardDetailsChange = (event) => {
    const { name, value } = event.target;
    setCardDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleTransactionIdChange = (event) => {
    setTransactionId(event.target.value);
  };

  const handleCardPaymentSubmit = (event) => {
    event.preventDefault();
    console.log('Card Payment Details:', cardDetails);
  };

  const handleDigitalPaymentSubmit = (event) => {
    event.preventDefault();
    console.log('Digital Payment Transaction ID:', transactionId);
  };

  const handlePaymentSubmit = (event) => {
    event.preventDefault();
    // Simulate successful payment or implement your payment logic here
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    /*if (modalMessage.includes('successful')) {
      navigate('/home');
    }*/
  };


  return (
    <div>
      <Navbar/>
      <h1>Complete Payment!!</h1>

      <div className="text-center">
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          value="card"
          checked={selectedOption === 'card'}
          onChange={handleOptionChange}
          id="paymentOptionCard"
        />
        <label className="form-check-label" htmlFor="paymentOptionCard">
          Card Payment
        </label>
      </div>

      <hr />

      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          value="digital"
          checked={selectedOption === 'digital'}
          onChange={handleOptionChange}
          id="paymentOptionDigital"
        />
        <label className="form-check-label" htmlFor="paymentOptionDigital">
          Digital Payment
        </label>
      </div>
    </div>

    

      {selectedOption === 'card' &&

      (<form class="row g-3">

    <div className="card-container">
      {/* Apply CSS class to container */}
      <img src={card} className="card-image" alt="Card" />
    </div>      
  <div class="col-md-4 container-with-border">
    <label for="validationDefault01" class="form-label">Card Holder Name</label>
    <input type="text" class="form-control" id="validationDefault01"  required/>
  </div>
  <div class="col-md-4 container-with-border">
    <label for="validationDefault02" class="form-label">Card Number</label>
    <input type="text" class="form-control" id="validationDefault02" required/>
  </div>
  <div class="col-md-4 container-with-border">
    <label for="validationDefaultUsername" class="form-label">Amount</label>
    <div class="input-group">
      <span class="input-group-text" id="inputGroupPrepend2">$$</span>
      <input type="text" class="form-control" id="validationDefaultUsername" aria-describedby="inputGroupPrepend2" required/>
    </div>
  </div>
  <div class="col-md-6 container-with-border">
    <label for="validationDefault03" class="form-label">CCC/CVC</label>
    <input type="text" class="form-control" id="validationDefault03" required/>
  </div>
  <div class="col-md-3 container-with-border">
    <label for="validationDefault04" class="form-label">Choose Card Type</label>
    <select class="form-select" id="validationDefault04" required>
    <option selected disabled value="">Choose...</option>
    <option value="visa">Visa</option>
    <option value="mastercard">MasterCard</option>
    <option value="amex">American Express</option>
    <option value="discover">Discover</option>
    </select>
  </div>
  <div class="col-md-3 container-with-border">
    <label for="validationDefault05" class="form-label">Expire Date</label>
    <input type="text" class="form-control" id="validationDefault05" required/>
  </div>
  <div class="col-12 ">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" value="" id="invalidCheck2" required/>
      <label class="form-check-label" for="invalidCheck2">
        Agree to terms and conditions
      </label>
    </div>
  </div>

  
  <div className="col-12 mt-3 mb-3 text-center">
        <button className="btn btn-primary" type="submit" onClick={handlePaymentSubmit}>
          Submit Card Payment
        </button>
      </div>

      <Modal show={showModal} handleClose={handleCloseModal} message="Payment Successful" />

</form>)
      
      
      
      
      
      
      
      }

      {selectedOption === 'digital' && (
        <form onSubmit={handleDigitalPaymentSubmit}>
          <div className="card-container">
      {/* Apply CSS class to container */}
      <img src={mobile} className="card-image" alt="Card" />
    </div>
          <div>
            <label>
              Transaction ID:
              <input
                type="text"
                value={transactionId}
                onChange={handleTransactionIdChange}
                required
              />
            </label>
          </div>
          <div>
            <img src={qr_Image} alt="QR Code" />
          </div>
          <button type="submit">Submit Digital Payment</button>
        </form>
      )}

    <Footer/>
    </div>
  );
};

export default HotelPayment;
