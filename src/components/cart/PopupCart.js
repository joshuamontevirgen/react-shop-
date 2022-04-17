import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSide, togglePopupFast } from "./cartSlice";
import * as Icon from "react-bootstrap-icons"; //https://icons.getbootstrap.com/  https://github.com/ismamz/react-bootstrap-icons#readme

import { CartContent } from "./CartContent";
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

  const total = useSelector((state) => {
    return state.cart.total;
  });

  useEffect(() => {
    isSideCartShown
      ? document.body.classList.add("disable")
      : document.body.classList.remove("disable");
  }, [isSideCartShown]);

  function showSideCart() {
    //dispatch(setPageDisable(true));
    // dispatch(togglePopupFast(false));
    dispatch(toggleSide(true));
  }

  return (
    <div>
      <div
        id="cart-icon-wrapper"
        className=""
        onMouseEnter={() => dispatch(togglePopupFast(true))}
        onMouseLeave={() => dispatch(togglePopupFast(false))}
        onClick={showSideCart}
      >
        <Icon.Cart size={35} />
        {cart.length > 0 && (
          <div>
            <span className="noselect ping-once rounded-full text-sm m-0 p-0 h-5 w-5 h-full w-full text-white bg-rose-500 flex justify-center text-center">
              {cart.length}
            </span>
          </div>
        )}
      </div>
      <div
        id="cart-popup"
        onMouseEnter={() => dispatch(togglePopupFast(true))}
        onMouseLeave={() => dispatch(togglePopupFast(false))}
        className={!isSideCartShown && showPopup ? "fadeIn" : "fadeOut"}
      >
        <CartContent enableControls={false} />
        <div className="bottom">
          <div className="total ">
            <span className="font-weight-bold"> Total </span>
            <span className="font-weight-bold right">P{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
