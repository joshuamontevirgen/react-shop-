import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCartItem, removeCartItem, subCartItem } from "./cartSlice";
import * as Icon from "react-bootstrap-icons"; //https://icons.getbootstrap.com/  https://github.com/ismamz/react-bootstrap-icons#readme
import "./styles.css";

//https://upmostly.com/tutorials/react-onhover-event-handling-with-examples

export function CartContent({ enableControls }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => {
    return state.cart.items;
  });

  const showSideCart = useSelector((state) => {
    return state.cart.showSide;
  });

  function getTotal() {
    return cart
      .map((item) => {
        return item.subTotal;
      })
      .reduce((a, b) => a + b, 0);
  }

  return (
    <>
      <div className="cart-content">
        <div className="container">
          <ul>
            {cart.map((item, index) => {
              return (
                <li className="noselect " key={item.id}>
                  <div className="cart-item d-flex align-items-center">
                    <img className="img" src={item.imageUrl}></img>
                    <div className="d-flex flex-column cart-item-name-wrapper ">
                      <span> {item.name}</span>
                      <span className=" text-secondary small">{item.desc}</span>
                    </div>

                    <span className="quantity small">{item.quantity}</span>

                    <div className="item-subtotal">
                      <span className=" ">
                        P
                        {item.subTotal.toLocaleString("en", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
