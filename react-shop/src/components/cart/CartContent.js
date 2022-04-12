import React, { useState, useRef, useEffect, createRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCartItem, removeCartItem, subCartItem } from "./cartSlice";
import { CartItem } from "./CartItem";

import "./styles.css";

//https://upmostly.com/tutorials/react-onhover-event-handling-with-examples

//https://stackoverflow.com/questions/54633690/how-can-i-use-multiple-refs-for-an-array-of-elements-with-hooks

export function CartContent({ enableControls }) {
  const dispatch = useDispatch();
  const itemsRef = useRef([]);

  const cart = useSelector((state) => {
    return state.cart.items;
  });

  const showSide = useSelector((state) => {
    return state.cart.showSide;
  });

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, cart.length);
  }, [cart]);

  useEffect(() => {
    itemsRef.current.forEach((item, index) => {
      item.hide();
    });
  }, [showSide]);

  const handleCartItemClick = (event) => {
    //hide other items' controls
    itemsRef.current.forEach((item, index) => {
      event.index !== index && item.hide();
    });
  };

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
                  handleCartItemClick={handleCartItemClick}
                  ref={(ref) => (itemsRef.current[index] = ref)}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
