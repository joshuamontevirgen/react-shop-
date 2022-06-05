import React from "react";
import { Link, useLocation } from "react-router-dom";

export const CheckoutResult = () => {
  const location = useLocation();
  const result = location.state;
  return (
    <>
      <div className="flex flex-col w-full justify-center items-center">
        <span> Order # {result.data.id}</span>
        <span>{result.message}</span>
        <Link to={`/orders/${result.data.id}`}>View details</Link>
      </div>
    </>
  );
};
