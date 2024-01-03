import React from 'react';

const Cart = ({ total }) => {
  return (
    <div>
      <h2>Shopping Cart</h2>
      <p>Total: ${total}</p>
    </div>
  );
};

export default Cart;
