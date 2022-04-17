import React from "react";

export function AddressItem({ address }) {
  return (
    <div className="flex flex-col">
      <div>{address.address}</div>
      <div>{address.city}</div>
      <div>{address.zipCode}</div>
    </div>
  );
}
