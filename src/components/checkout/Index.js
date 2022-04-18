import React from "react";
import { useSelector } from "react-redux";
import { SelectAddressWidget } from "../user/address/SelectAddressWidget";

//flex items-start https://stackoverflow.com/questions/27575779/prevent-a-flex-items-height-from-expanding-to-match-other-flex-items
export function Index() {
  const total = useSelector((state) => {
    return state.cart.total;
  });
  return (
    <div className=" w-full flex flex-row justify-between  w-full items-start  ">
      <div className=" w-7/12 px-1 mx-10 flex-col ">
        <SelectAddressWidget />
      </div>
      <div className="w-3/12   p-8 mx-10 grow-0 shadow1  ">
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
