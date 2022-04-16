import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/navbar/Navbar";

import { useDispatch, useSelector } from "react-redux";

import { SideCart } from "./components/cart/SideCart";
import { AppRoutes } from "./AppRoutes";

export default function App() {
  const ref = useRef();

  const disabled = useSelector((state) => {
    return state.app.disable;
  });

  function pageClick() {
    ref.current.onPageClick();
  }

  return (
    <>
      <SideCart ref={ref} />
      <div
        onClick={pageClick} //close sidecart if page clicked
        className={disabled ? "disable-clicks active" : "disable-clicks"}
      ></div>

      <div id="App" className={disabled ? "disable" : ""}>
        <Navbar />
        <div id="main-container" className="">
          <AppRoutes />
        </div>
      </div>
    </>
  );
}
