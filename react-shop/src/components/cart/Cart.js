import React, { useEffect } from "react";
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
import { setDisable as setPageDisable } from "../app/appSlice";
import "./styles.css";

export function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => {
    return state.cart.items;
  });

  const showSide = useSelector((state) => {
    return state.cart.showSide;
  });

  useEffect(() => {
    showSide
      ? document.body.classList.add("disable")
      : document.body.classList.remove("disable");
  }, [showSide]);

  function showSideCart() {
    dispatch(setPageDisable(true));
    dispatch(togglePopupFast(false));
    dispatch(toggleSide(true));
  }

  return (
    <div>
      <div
        id="cart-icon-wrapper"
        className="btn"
        onMouseEnter={() => dispatch(togglePopupFast(true))}
        onMouseLeave={() => dispatch(togglePopupFast(false))}
        onClick={showSideCart}
      >
        <Icon.Cart size={35} />
        {cart.length > 0 && (
          <span className="noselect bg-danger text-light circle">
            {cart.length}
          </span>
        )}
      </div>
      <PopupCart />
    </div>
  );
}
