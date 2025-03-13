import React from "react";
import { FaShoppingCart, FaBoxOpen } from "react-icons/fa";
import useStore from "../context/useStore";
import "../styles/cart.css";

const Cart = () => {
  const { cart } = useStore();

  return (
    <div className="cart-page">
      <h2><FaShoppingCart /> Savatcha</h2>

      {cart.length > 0 ? (
        <div className="cart-container">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <h3>{item.title}</h3>
              <p className="cart-price">
                {item.price.toLocaleString()} so‘m
              </p>
              <p className="cart-quantity">Soni: {item.quantity}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-cart">
          <FaBoxOpen className="empty-icon" /> Hozircha hech narsa yoq.
        </p>
      )}
    </div>
  );
};

export default Cart;
