import React, { useState } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
const CheckoutForm = ({selectedOrders}) => {
  const stripe = useStripe();
  const [amount, setAmount] = useState(0);
  const [destination, setDestination] = useState('');
  const handleSubmit = async (event) => {
    console.log(event.target.id)
    const payment_type=event.target.id;
    event.preventDefault();
   
    try {
      const response = await fetch('http://localhost:1337/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedOrders,
          payment_type,
        }),
      });
const session=await response.json();
const result=stripe.redirectToCheckout({
  sessionId:session.id
}); 
if(result.error)
{
  console.log(result.error)
}
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <button onClick={handleSubmit} id="klarna">Klarna</button>
      <button onClick={handleSubmit} id="card">Card</button>
      <button onClick={handleSubmit} id="paypal">PayPal</button>
    </>
  );
};

export default CheckoutForm;
