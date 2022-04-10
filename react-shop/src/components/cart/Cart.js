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
import * as Icon from "react-bootstrap-icons"; //https://icons.getbootstrap.com/  https://github.com/ismamz/react-bootstrap-icons#readme

import { SideCart } from "./SideCart";
import { PopupCart } from "./PopupCart";
import "./styles.css";

export function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => {
    return state.cart.items;
  });

  const showSideCart = useSelector((state) => {
    return state.cart.showSide;
  });

  function toggleSideCart() {
    dispatch(togglePopupFast(false));
    dispatch(toggleSide(!showSideCart));
  }
  return (
    <div>
      <div
        id="cart-icon-wrapper"
        className="btn"
        onMouseEnter={() => dispatch(togglePopupFast(true))}
        onMouseLeave={() => dispatch(togglePopupFast(false))}
        onClick={toggleSideCart}
      >
        <Icon.Cart size={35} />
        {cart.length > 0 && (
          <span className="noselect bg-danger text-light circle">
            {cart.length}
          </span>
        )}
      </div>
      <PopupCart />
      <SideCart />
    </div>
  );
}
