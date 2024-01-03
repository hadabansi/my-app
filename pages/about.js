// About.js
import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios'; // Import axios for making HTTP requests
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';

const About = () => {
  const [cartTotal, setCartTotal] = useState(0);
  const [paymentComplete, setPaymentComplete] = useState(false);

  // const handleAddItem = (price) => {
  //   setCartTotal(cartTotal + price);
  // };

  // const handlePaymentSuccess = (details, data) => {
  //   console.log('Payment successful:', details);
  //   console.log('Payment Data successful:', data);
  //   setPaymentComplete(true);
  //   fetch('http://localhost:1337/api/payment/create', {
  //     method: 'POST',
  //     body: JSON.stringify({ 
  //       paymentID: data.paymentID,
  //       orderId:data.orderID,
  //       saleId : details.purchase_units[0].payments.captures[0].id,
  //       amount: details.purchase_units[0].amount.value },
  //       ),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   console.log(data.orderID);
  // };
  // const handlePaymentError = (error) => {
  //   console.error('Payment error:', error);
  // };

  return (
    <PayPalScriptProvider options={{ "client-id": 'Af-yN1J-ojcM82BZWwWwVjP2jt7peCNLUJQBdN6DeVKUaQEfZ28G6-WljVMpgoubWXrJUwt1a6rLWxmn' }}>
      <div>
        <ProductList onAddItem={handleAddItem} />
        <Cart total={cartTotal} />

        {!paymentComplete && cartTotal > 0 && (
          <>
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: cartTotal,
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then((details) => {
                handlePaymentSuccess(details, data);
              });
            }}
            onError={(error) => handlePaymentError(error)}
          />
          
          </>
        )}
      </div>
    </PayPalScriptProvider>
    
  );
};
export default About;
