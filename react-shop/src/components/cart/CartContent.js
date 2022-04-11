import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCartItem, removeCartItem, subCartItem } from "./cartSlice";
import { CartItem } from "./CartItem";

import "./styles.css";

//https://upmostly.com/tutorials/react-onhover-event-handling-with-examples

export function CartContent({ enableControls }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => {
    return state.cart.items;
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
                />
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
