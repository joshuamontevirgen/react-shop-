import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/navbar/Navbar";
import LoaderOverlay from "./components/utility/loaderOverlay/LoaderOverlay";
import { SideCart } from "./components/cart/SideCart";
import { AppRoutes } from "./AppRoutes";

export default function App() {
  return (
    <>
      <LoaderOverlay />
      <SideCart />

      <div id="App" className="flex flex-col h-screen ">
        <div className="w-full">
          <Navbar />
        </div>
        <div id="app-body" className="flex-1 overflow-y-auto">
          <AppRoutes />
        </div>
      </div>
    </>
  );
}
