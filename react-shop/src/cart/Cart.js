import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, subItem } from "./cartSlice";
import * as Icon from "react-bootstrap-icons"; //https://icons.getbootstrap.com/  https://github.com/ismamz/react-bootstrap-icons#readme
import "./styles.css";

//https://upmostly.com/tutorials/react-onhover-event-handling-with-examples

export function Cart() {
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [hoverCartPopup, setHoverCartPopup] = useState(false);
  const cart = useSelector((state) => {
    return state.cart;
  });
  const dispatch = useDispatch();

  function toggleCartPopup() {
    setShowCartPopup(!showCartPopup);
    if (!showCartPopup) setHoverCartPopup(false);
  }

  return (
    <div>
      <div
        id="cart-icon-wrapper"
        className="btn"
        onMouseEnter={() => setHoverCartPopup(true)}
        onMouseLeave={() => setHoverCartPopup(false)}
      >
        <Icon.Cart size={35} onClick={toggleCartPopup} />
        {cart.length > 0 && (
          <span className="noselect bg-danger text-light circle">
            {cart.length}
          </span>
        )}
      </div>

      <div
        id="cart-popup"
        onMouseEnter={() => setHoverCartPopup(true)}
        onMouseLeave={() => setHoverCartPopup(false)}
        className={showCartPopup || hoverCartPopup ? "fadeIn" : " fadeOut"}
      >
        <ul>
          {cart.map((item, index) => {
            return (
              <li className="noselect" key={index}>
                {item.name}{" "}
                <Icon.FileMinus
                  size={25}
                  onClick={() => dispatch(subItem(item))}
                />
                {item.quantity}
                <Icon.FilePlus
                  size={25}
                  onClick={() => dispatch(addItem(item))}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
