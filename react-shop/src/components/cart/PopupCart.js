import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addCartItem,
  removeCartItem,
  subCartItem,
  toggleSide,
  togglePopupFast,
  togglePopupSlow,
} from "./cartSlice";

import { CartContent } from "./CartContent";

import "./styles.css";

//https://upmostly.com/tutorials/react-onhover-event-handling-with-examples

export function PopupCart() {
  const cart = useSelector((state) => {
    return state.cart.items;
  });

  const showSideCart = useSelector((state) => {
    return state.cart.showSide;
  });

  const showPopup = useSelector((state) => {
    return state.cart.showPopup;
  });

  const fadeOutClass = useSelector((state) => {
    return state.cart.fadeOutClass;
  });

  const total = useSelector((state) => {
    return state.cart.total;
  });

  const dispatch = useDispatch();

  return (
    <div
      id="cart-popup"
      onMouseEnter={() => dispatch(togglePopupFast(true))}
      onMouseLeave={() => dispatch(togglePopupFast(false))}
      className={!showSideCart && showPopup ? "fadeIn" : fadeOutClass}
    >
      <CartContent enableControls={false} />
      <div className="bottom">
        <div className="total d-flex align-items-center">
          <span className="font-weight-bold"> Total </span>
          <span className="font-weight-bold right">P{total}</span>
        </div>
      </div>
    </div>
  );
}
