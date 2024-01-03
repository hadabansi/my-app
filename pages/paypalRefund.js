// pages/orders.js
import { useState, useEffect } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([]);

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

  const handleRefund = async (saleId, amount) => {
    console.log('Refunding order with ID:', saleId);
    try {
      const response = await fetch('https://api-m.sandbox.paypal.com/v2/payments/captures/' + saleId + '/refund', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
          'Prefer': 'return=representation', 
          'Authorization': 'Bearer A21AAI54cikuWAnCac32bN0G8vIWN_uMCMEb0fPSJuAi7zVNDsXczvFAspCclZ4DF5G2CesjEzLJctKv9pz8DwbSkSi9_pUrw'
        },
        body: JSON.stringify({
          amount: {
            value: amount,
            currency_code: 'USD', 
          },
        }),
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
                <button onClick={() => handleRefund(order.saleId,order.amount)}>Refund</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
