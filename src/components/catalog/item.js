import React, { useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  addCartItem,
  subCartItem,
  togglePopupFast,
  togglePopupSlow,
} from "../../components/cart/cartSlice";
import * as Icon from "react-bootstrap-icons"; //https://icons.getbootstrap.com/  https://github.com/ismamz/react-bootstrap-icons#readme
import "./styles.css";

//https://getbootstrap.com/docs/5.0/components/card/

export function Item({ item, isGrid }) {
  const dispatch = useDispatch();
  const cartItem = useSelector(
    (state) =>
      state.cart.items.find((i) => {
        return i.id == item.id;
      }),
    shallowEqual
  );

  const tempShowCart = {
    show: function () {
      this.timeoutID = setTimeout(function () {
        dispatch(togglePopupSlow(false));
      }, 500);
    },
    cancel: function () {
      clearTimeout(this.timeoutID);
    },
  };

  function modifyQuantity(item, fn) {
    dispatch(fn(item));
    dispatch(togglePopupSlow(true));

    tempShowCart.cancel();
    tempShowCart.show();
  }

  function subItem(item) {
    dispatch(subCartItem(item));
  }
  return (
    <div className="card">
      <div className={isGrid ? "" : "row "}>
        {/* add cart buttons */}
        <div className="m-2 catalog-controls d-flex flex-row-reverse ">
          {!cartItem && (
            <button
              className=" catalog-controls-button btn no-shadow"
              onClick={() => modifyQuantity(item, addCartItem)}
            >
              <Icon.PlusCircle></Icon.PlusCircle>
            </button>
          )}
          {cartItem && (
            <div className="quantity d-flex flex-row flex-nowrap justify-content-between">
              <button
                className="catalog-controls-button btn no-shadow"
                onClick={() => modifyQuantity(item, subCartItem)}
              >
                {cartItem && cartItem.quantity > 1 ? (
                  <Icon.Dash />
                ) : (
                  <Icon.Trash3 color={"red"} />
                )}
              </button>
              <span className="d-flex align-items-center text-center">
                {cartItem && cartItem.quantity}
              </span>
              <button
                className="catalog-controls-button btn no-shadow"
                onClick={() => modifyQuantity(item, addCartItem)}
              >
                <Icon.Plus></Icon.Plus>
              </button>
            </div>
          )}
        </div>
        <div className={isGrid ? "" : "col-md-4"}>
          <img className="" src={item.imageUrl}></img>
        </div>
        <div className={isGrid ? "" : "col-md-8"}>
          <div className="card-body">
            <h3 className="card-title">{item.name}</h3>
            <p className="card-text">{item.desc}</p>
            <p className="card-text">
              P
              {item.price.toLocaleString("en", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
