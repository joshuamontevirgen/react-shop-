import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addCartItem,
  subCartItem,
  togglePopupFast,
  togglePopupSlow,
} from "../../components/cart/cartSlice";

//https://getbootstrap.com/docs/5.0/components/card/

export function Item({ item, isGrid }) {
  const dispatch = useDispatch();

  const tempShowCart = {
    show: function () {
      this.timeoutID = setTimeout(function () {
        dispatch(togglePopupSlow(false));
      }, 1000);
    },
    cancel: function () {
      clearTimeout(this.timeoutID);
    },
  };

  function addItem(item) {
    dispatch(addCartItem(item));
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
            <button className="btn" onClick={() => addItem(item)}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
