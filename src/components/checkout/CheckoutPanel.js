import React from "react";
export function CheckoutPanel({ title, children, isError }) {
  return (
    <div
      className={`shadow-lg p-8 flex flex-col  my-0  ${
        isError && " border border-red-500 "
      }`}
    >
      <div className="sticky top-0 whitespace-nowrap font-light text-2xl">
        {title}
      </div>
      <div>{children}</div>
    </div>
  );
}
