import React from 'react';
import { PayPalButton } from 'react-paypal-button-v2';

const PayPalButtonComponent = ({ amount, onSuccess, onError }) => {
  return (
    <PayPalButton
      amount={amount}
      onSuccess={(details, data) => onSuccess(details, data)}
      onError={(error) => onError(error)}
    />
  );
};

export default PayPalButtonComponent;
