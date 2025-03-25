import React from 'react';
import './Cart.css';

function Cart({ cartItems, removeProductFromCart, clearCart }) {

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = typeof item.price === 'number' ? item.price : 0;
      return total + itemPrice;
    }, 0).toFixed(2);
  };

  const finalizePurchase = () => {
    if (window.confirm("Tem certeza de que deseja finalizar as compras?")) {
      clearCart();
      alert("Compra finalizada! O carrinho foi esvaziado.");
    }
  };

  return (
    <div className="cart">
      <h2>Seu Carrinho</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div>
              <h3>{item.name}</h3>
              <p className="cart-item-price">
                R$
                {typeof item.price === 'number' 
                  ? item.price.toFixed(2)
                  : 'Preço Inválido'}
              </p>
              <button
                className="btn-remove-cart"
                onClick={() => removeProductFromCart(index)}
              >
                Remover
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-total">
        <h3>Total:</h3>
        <p>R$ {getTotalPrice()}</p>
      </div>
      
      {cartItems.length > 0 && (
        <button
          id="finalize-btn"
          className="finalize-btn"
          onClick={finalizePurchase}
        >
          Finalizar Compras
        </button>
      )}
    </div>
  );
}

export default Cart;
