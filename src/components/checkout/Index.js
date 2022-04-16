import React from "react";
import { useSelector } from "react-redux";
import { SelectAddressWidget } from "../user/address/SelectAddressWidget";

export function Index() {
  const total = useSelector((state) => {
    return state.cart.total;
  });
  return (
    <div className="bg-slate-100 w-full flex flex-row justify-center  w-full  ">
      <div className=" w-5/12 bg-rose-100 px-5 mx-10 flex-grow flex-col">
        <SelectAddressWidget />
      </div>
      <div className="w-3/12 h-3/12 bg-blue-100 p-8 mx-10  flex-grow">
        <div className="flex flex-row justify-between text-3xl font-light my-3">
          <span>Total</span>
          <span>{total}</span>
        </div>
        <div className="w-full flex justify-center content-center my-3">
          <button className="p-3 text-white w-full bg-slate-500 hover:bg-slate-700 btn justify-center content-center font-light text-3xl ">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
