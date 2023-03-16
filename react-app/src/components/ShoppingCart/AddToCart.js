import React from "react";
import { useModal } from "../../context/Modal";
import { NavLink } from 'react-router-dom';


export default function AddToCart({ product, quantity }) {
  const { closeModal } = useModal()

  const handleClick = () => {
    closeModal()
  }

  return (
    <div className="cart-modal-container">
      <div className="cart-img-text-container">
        <div>
          <img className="cart-image" src={product.preview_img} />
        </div>
        <div className="cart-text-container">
          {quantity} {quantity > 1 ? "items added to cart" : "item added to cart"}
        </div>
      </div>
      <NavLink to="/shopping-cart">
        <button
          className="view-cart-btn"
          onClick={handleClick}
        >
          View cart & Checkout
        </button>
      </NavLink>
      <button
        className="keep-shopping-btn"
        onClick={handleClick}
      >
        Keep shopping
      </button>
    </div>
  )
}
