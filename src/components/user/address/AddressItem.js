import React, { useState } from "react";

export function AddressItem({ address, onClick, buttonText }) {
  const [isHover, setIsHover] = useState(false);
  return (
    <div
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="flex flex-row justify-between  hover:bg-slate-100 w-full p-4 items-start justify-center items-center border-b-2 border-gray-200"
    >
      <div className="flex flex-col">
        <span className="text-2xl font-normal">{address.address}</span>
        <span className="text-l font-light">{address.city}</span>
        <span className="text-l font-light">{address.zipCode}</span>
      </div>

      {buttonText && isHover && (
        <button
          className="px-3 py-1 text-white bg-slate-500 hover:bg-slate-700 text-sm font-light"
          onClick={onClick}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}
