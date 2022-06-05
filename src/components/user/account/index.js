import React, { useEffect, useState } from "react";
import Profile from "../profile/index";
import { Orders } from "../orders/Orders";

export default function Index() {
  const [showProfile, setShowProfile] = useState(true);
  const [showOrders, setShowOrders] = useState(false);

  function hideAll() {
    setShowProfile(false);
    setShowOrders(false);
  }

  return (
    <div className="flex flex-row h-full ">
      <div className="fixed w-52 pt-5 select-none h-full  border-r   ">
        <div className="flex justify-center py-2">
          <strong className="">My Account</strong>
        </div>
        <div
          className={`${
            showProfile ? "font-normal bg-slate-100" : "font-light"
          } flex justify-center  w-100 px-5 py-1  hover:font-normal hover:bg-slate-100`}
          onClick={() => {
            hideAll();
            setShowProfile(true);
          }}
        >
          Profile
        </div>
        <div
          className={`${
            showOrders ? "font-normal bg-slate-100" : "font-light"
          } flex justify-center  w-100 px-5 py-1  hover:font-normal hover:bg-slate-100`}
          onClick={() => {
            hideAll();
            setShowOrders(true);
          }}
        >
          Orders
        </div>
      </div>

      <div className="ml-60 m-5 w-full  ">
        {showProfile && <Profile></Profile>}
        {showOrders && <Orders></Orders>}
      </div>
    </div>
  );
}
