import React from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import './Cart.css'
const Cart = ({ cart, setCart }) => {
  // Remove book from cart
  const removeFromCart = (bookId) => {
    setCart(prevCart => prevCart.filter(item => item._id !== bookId));
  };

  // Change quantity of book in cart
  const changeQuantity = (bookId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
    } else {
      setCart(prevCart => prevCart.map(item =>
        item._id === bookId
          ? { ...item, quantity }
          : item
      ));
    }
  };

  // Calculate total cost
  const getTotalCost = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="cart-table-container">
      <h2>Your Cart</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={item._id}>
              <td>{item.title}</td>
              <td>₹{item.price}</td>
              <td>
                <Form.Control
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => changeQuantity(item._id, Number(e.target.value))}
                  style={{ width: '80px' }}
                />
              </td>
              <td>₹{item.price * item.quantity}</td>
              <td>
                <Button variant="danger" onClick={() => removeFromCart(item._id)}>
                  Remove
                </Button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="3" className="text-right"><strong>Total</strong></td>
            <td colSpan="2"><strong>₹{getTotalCost()}</strong></td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Cart;
