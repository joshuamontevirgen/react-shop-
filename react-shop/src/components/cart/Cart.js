import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addCartItem,
  removeCartItem,
  subCartItem,
  toggleShowFast,
  toggleShowSlow,
  toggleHover,
} from "./cartSlice";
import * as Icon from "react-bootstrap-icons"; //https://icons.getbootstrap.com/  https://github.com/ismamz/react-bootstrap-icons#readme
import "./styles.css";

//https://upmostly.com/tutorials/react-onhover-event-handling-with-examples

export function Cart() {
  const cart = useSelector((state) => {
    return state.cart.items;
  });

  const showCart = useSelector((state) => {
    return state.cart.show;
  });

  const hoverCart = useSelector((state) => {
    return state.cart.hover;
  });

  const fadeOutClass = useSelector((state) => {
    return state.cart.fadeOutClass;
  });

  const dispatch = useDispatch();

  function toggleCartPopup() {
    dispatch(toggleShowFast(!showCart));
    if (!showCart) {
      dispatch(toggleHover(false));
    }
  }

  function getTotal() {
    return cart
      .map((item) => {
        return item.subTotal;
      })
      .reduce((a, b) => a + b, 0);
  }

  return (
    <div>
      <div
        id="cart-icon-wrapper"
        className="btn"
        onMouseEnter={() => dispatch(toggleHover(true))}
        onMouseLeave={() => dispatch(toggleHover(false))}
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
        onMouseEnter={() => dispatch(toggleHover(true))}
        onMouseLeave={() => dispatch(toggleHover(false))}
        className={showCart || hoverCart ? "fadeIn" : fadeOutClass}
      >
        <div className="container">
          <ul>
            {cart.map((item, index) => {
              return (
                <li className="noselect " key={item.id}>
                  <div className="cart-item d-flex align-items-center">
                    <span className="quantity small">{item.quantity}</span>
                    <img className="img" src={item.imageUrl}></img>
                    <div className="d-flex flex-column cart-item-name-wrapper ">
                      <span> {item.name}</span>
                      <span className=" text-secondary small">{item.desc}</span>
                    </div>
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
        <div className="total d-flex align-items-center">
          <span className="font-weight-bold"> Total </span>
          <span className="font-weight-bold right">
            P
            {getTotal().toLocaleString("en", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
        <div className="">
          <button className="btn btn-primary btn-block ">Checkout</button>
        </div>
      </div>
    </div>
  );
}
