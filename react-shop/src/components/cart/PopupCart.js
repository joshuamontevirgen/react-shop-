import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSide, togglePopupFast } from "./cartSlice";
import * as Icon from "react-bootstrap-icons"; //https://icons.getbootstrap.com/  https://github.com/ismamz/react-bootstrap-icons#readme

import { CartContent } from "./CartContent";
import { setDisable as setPageDisable } from "../app/appSlice";
import "./styles.css";

export function PopupCart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => {
    return state.cart.items;
  });

  const isSideCartShown = useSelector((state) => {
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

  useEffect(() => {
    isSideCartShown
      ? document.body.classList.add("disable")
      : document.body.classList.remove("disable");
  }, [isSideCartShown]);

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
      <div
        id="cart-popup"
        onMouseEnter={() => dispatch(togglePopupFast(true))}
        onMouseLeave={() => dispatch(togglePopupFast(false))}
        className={!isSideCartShown && showPopup ? "fadeIn" : fadeOutClass}
      >
        <CartContent enableControls={false} />
        <div className="bottom">
          <div className="total d-flex align-items-center">
            <span className="font-weight-bold"> Total </span>
            <span className="font-weight-bold right">P{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
