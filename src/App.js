import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/navbar/Navbar";

import { SideCart } from "./components/cart/SideCart";
import { AppRoutes } from "./AppRoutes";

export default function App() {
  return (
    <>
      <SideCart />

      <div id="App">
        <Navbar />
        <div id="main-container" className="">
          <AppRoutes />
        </div>
      </div>
    </>
  );
}
