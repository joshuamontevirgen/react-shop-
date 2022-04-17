import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { CartItem } from "./CartItem";

import "./styles.css";

//https://upmostly.com/tutorials/react-onhover-event-handling-with-examples

//https://stackoverflow.com/questions/54633690/how-can-i-use-multiple-refs-for-an-array-of-elements-with-hooks

export function CartContent({ enableControls }) {
  const cart = useSelector((state) => {
    return state.cart.items;
  });

  const showSide = useSelector((state) => {
    return state.cart.showSide;
  });

  return (
    <>
      <div className="cart-content">
        <div className="container">
          <ul>
            {cart.map((item, index) => {
              return (
                <CartItem
                  item={item}
                  enableControls={enableControls}
                  key={item.id}
                  index={index}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
