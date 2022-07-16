import React, { useState, useEffect, useRef, forwardRef } from "react";
import { useDispatch } from "react-redux";
import { addCartItem, subCartItem } from "./cartSlice";
import * as Icon from "react-bootstrap-icons"; //https://icons.getbootstrap.com/  https://github.com/ismamz/react-bootstrap-icons#readme
import { useOnClickOutside } from "../utility/useOnClickOutside";
import "./styles.css";

export function CartItem({ item, enableControls, index }) {
  const cartItemDivRef = useRef(null);

  const dispatch = useDispatch();
  const [showControls, setShowControls] = useState(false);

  useOnClickOutside(cartItemDivRef, () => pageClick());

  function pageClick() {
    setShowControls(false);
  }

  return (
    <li className="noselect font-light ">
      <div
        ref={cartItemDivRef}
        className="cart-item flex flex-row flex-nowrap justify-center items-center "
      >
        <img
          alt="item"
          className={`img  ${showControls ? "opacity-70" : ""}`}
          src={item.imageUrl}
          onClick={pageClick}
        ></img>
        <div
          className={`flex flex-col cart-item-name-wrapper grow font-normal  ${
            showControls ? "opacity-70" : ""
          }`}
          onClick={pageClick}
        >
          <span> {item.name}</span>
          <span className=" text-sm text-slate-600">{item.desc}</span>
        </div>

        <div
          className={`quantity flex flex-row justify-center items-center select-none h-10 w-20 relative ${
            showControls ? " active " : ""
          }`}
        >
          <button
            className={
              showControls
                ? "absolute left-0 btn no-shadow p-0 h-full flex justify-center items-center select-none"
                : "hidden"
            }
            onClick={() => dispatch(subCartItem(item))}
          >
            {item.quantity > 1 ? (
              <Icon.Dash className="" />
            ) : (
              <Icon.Trash3 className="" color={"red"} />
            )}
          </button>
          <span
            className={`enable-controls p-0 ${showControls ? "active " : ""}`}
            onClick={() => {
              enableControls && setShowControls(!showControls);
            }}
          >
            {item.quantity}
          </span>
          <button
            className={
              showControls
                ? "absolute right-0 btn no-shadow p-0 h-full flex justify-center items-center select-none"
                : "hidden"
            }
            onClick={() => dispatch(addCartItem(item))}
          >
            <Icon.Plus className=""></Icon.Plus>
          </button>
        </div>

        <div
          className={`item-subtotal text-right flex w-20 text-sm justify-end ${
            showControls ? "opacity-70" : ""
          }`}
          onClick={pageClick}
        >
          <span className=" ">
            ₱
            {item.subTotal.toLocaleString("en", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>
    </li>
  );
}
