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
    <div className="p-2 pt-0 mx-0 shadow-md">
      <div className={isGrid ? "" : " "}>
        {/* add cart buttons */}
        <div className="my-2 p-0 w-full catalog-controls flex flex-row-reverse ">
          {!cartItem && (
            <button
              className=" p-1 catalog-controls-button  btn no-shadow p-1 flex justify-center items-center select-none"
              onClick={() => modifyQuantity(item, addCartItem)}
            >
              <Icon.PlusCircle size={20}></Icon.PlusCircle>
            </button>
          )}
          {cartItem && (
            <div className="quantity w-full flex flex-row flex-nowrap justify-between">
              <button
                className="catalog-controls-button btn no-shadow  p-1 flex justify-center items-center select-none"
                onClick={() => modifyQuantity(item, subCartItem)}
              >
                {cartItem && cartItem.quantity > 1 ? (
                  <Icon.Dash size={20} />
                ) : (
                  <Icon.Trash3 size={17} color={"red"} />
                )}
              </button>
              <span className="flex justify-center items-center select-none">
                {cartItem && cartItem.quantity}
              </span>
              <button
                className="catalog-controls-button btn no-shadow p-1 flex justify-center items-center select-none"
                onClick={() => modifyQuantity(item, addCartItem)}
              >
                <Icon.Plus size={20}></Icon.Plus>
              </button>
            </div>
          )}
        </div>
        <div className={isGrid ? "" : "col-md-4"}>
          <img className="" src={item.imageUrl}></img>
        </div>
        <div className={isGrid ? "" : "col-md-8"}>
          <div className="">
            <p className="font-bold">
              ₱
              {item.price.toLocaleString("en", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
            <h3 className="font-normal">{item.name}</h3>
            <p className="font-light text-sm">{item.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
