import React from 'react';
import './Cart.css';

function Cart({ cartItems, removeProductFromCart }) {
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0).toFixed(2);
  };

  return (
    <div className="cart">
      <h2>Seu Carrinho</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div>
              <h3>{item.name} (x{item.quantity})</h3>
              <p className="cart-item-price">R$ {item.price.toFixed(2)}</p>
              <button className="btn-remove-cart" onClick={() => removeProductFromCart(index)}>Remover</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-total">
        <h3>Total:</h3>
        <p>R$ {getTotalPrice()}</p>
      </div>
    </div>
  );
}

export default Cart;