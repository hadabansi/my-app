import React, { useState } from 'react';

const ProductList = ({ onAddItem }) => {
  const products = [
    { id: 1, name: 'Item 1', price: 10 },
    { id: 2, name: 'Item 2', price: 20 },
    { id: 3, name: 'Item 3', price: 30 },
    { id: 4, name: 'Item 4', price: 40 },
    { id: 5, name: 'Item 5', price: 50 },
    { id: 6, name: 'Item 6', price: 60 },
    // Add more products as needed
  ];

  return (
    <div>
      <h2>Product List</h2>
      {products.map(product => (
        <div key={product.id}>
          <span>{product.name} - ${product.price}</span>
          <button onClick={() => onAddItem(product.price)}>Add</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
