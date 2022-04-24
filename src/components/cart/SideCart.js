import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CartContent } from "./CartContent";
import { toggleSide } from "./cartSlice";
import { Link } from "react-router-dom";
import { useOnClickOutside } from "../utility/useOnClickOutside";

import "./styles.css";

//https://upmostly.com/tutorials/react-onhover-event-handling-with-examples
//https://codezup.com/forwardref-in-functional-components-react-hooks/

export function SideCart() {
  const sideCartRef = useRef();
  const dispatch = useDispatch();
  const showSideCart = useSelector((state) => {
    return state.cart.showSide;
  });

  useOnClickOutside(sideCartRef, () => showSideCart && close());

  const total = useSelector((state) => {
    return state.cart.total;
  });

  function close() {
    dispatch(toggleSide(false));
  }

  return (
    <div>
      <div>
        <div
          className={` fixed inset-0 h-vh bg-black ${
            showSideCart ? " fadeIn opacity-30" : " fadeOut opacity-0"
          }`}
          style={{ zIndex: 999 }}
        ></div>
      </div>
      <div
        ref={sideCartRef}
        id="side-cart"
        className={showSideCart ? "open" : ""}
      >
        <div className="top flex justify-center content-center  p-2">
          <h2 className="font-semibold text-lg">Your Cart</h2>
        </div>
        <CartContent enableControls={true} />
        <div className="bottom h-full flex flex-col">
          <div className="total flex justify-between content-center">
            <span className=" font-semibold"> Total </span>
            <span className=" font-semibold">P{total}</span>
          </div>
          <div className="w-full grow buttons flex justify-between ">
            <button
              onClick={close}
              className="text-2xl font-light text-black w-2/4  bg-gray-100 hover:bg-gray-300 btn justify-between content-center "
            >
              Continue Shopping
            </button>
            <Link to="/checkout" className=" w-2/4" onClick={close}>
              <button className="text-2xl font-light  text-white w-full h-full bg-slate-500 hover:bg-slate-700 btn justify-between content-center ">
                Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
