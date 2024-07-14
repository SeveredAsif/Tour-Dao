import React, { useState } from 'react';
import qr_Image from '../pictures/qr_code.jpg';

const HotelPayment = () => {
  const [selectedOption, setSelectedOption] = useState('card');
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

  return (
    <div>
      <h1>Choose Payment Option</h1>
      <div>
        <label>
          <input
            type="radio"
            value="card"
            checked={selectedOption === 'card'}
            onChange={handleOptionChange}
          />
          Card Payment
        </label>
        <label>
          <input
            type="radio"
            value="digital"
            checked={selectedOption === 'digital'}
            onChange={handleOptionChange}
          />
          Digital Payment
        </label>
      </div>

      {selectedOption === 'card' && (
        <form onSubmit={handleCardPaymentSubmit}>
          <div>
            <label>
              Card Holder Name:
              <input
                type="text"
                name="cardHolderName"
                value={cardDetails.cardHolderName}
                onChange={handleCardDetailsChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Card Number:
              <input
                type="text"
                name="cardNumber"
                value={cardDetails.cardNumber}
                onChange={handleCardDetailsChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Expire Date:
              <input
                type="text"
                name="expireDate"
                value={cardDetails.expireDate}
                onChange={handleCardDetailsChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              CVC/CCC:
              <input
                type="text"
                name="cvc"
                value={cardDetails.cvc}
                onChange={handleCardDetailsChange}
                required
              />
            </label>
          </div>
          <button type="submit">Submit Card Payment</button>
        </form>

        
      )}

      {selectedOption === 'digital' && (
        <form onSubmit={handleDigitalPaymentSubmit}>
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
    </div>
  );
};

export default HotelPayment;
