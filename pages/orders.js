// pages/orders.js
import { useState, useEffect } from 'react';
import CheckoutForm from './CheckoutForm';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51OOgEPIkmKy32BTDivwqtLNAKQWsYNCXgyJJhF1r78sCqodWoblBHRZmAGSMuKI1CRTHEpbjjFCrMuxUdOWBqq6W002oUkjqMN');
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:1337/api/v1/ordersdata');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  const handleAddOrder = (order) => {
    // Add the selected order to the list
    setSelectedOrders([...selectedOrders, order]);
  };


  const handleRefund = async (paymentID, amount) => {
    console.log('Refunding order with ID:', paymentID);
    try {
      const response = await fetch('http://localhost:1337/refund/' + paymentID, {
        method: 'GET'
      });   
      const data = await response.json();
      console.log('Refund response:', data);
      
    } catch (error) {
      console.error('Error refunding order:', error);
      }
  };
  

  return (
    <div>
      <h1>Orders</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.amount}</td>
              <td>{order.status}</td>
              <td>
                <button onClick={() => handleRefund(order.paymentID,order.amount)}>Refund</button>
              </td>
              <td>
              <button onClick={() => handleAddOrder(order)}>Add</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Selected Orders</h2>
      <ul>
        {selectedOrders.map((selectedOrder, index) => (
          <li key={index}>{selectedOrder.id} {selectedOrder.amount}</li>
        ))}
      </ul>
      <Elements stripe={stripePromise}>  <CheckoutForm selectedOrders={selectedOrders} /></Elements>
    
    </div>
  );
};

export default Orders;
