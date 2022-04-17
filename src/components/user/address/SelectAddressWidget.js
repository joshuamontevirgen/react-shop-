import React, { useState } from "react";
import { useAddress } from "./useAddress";
import { AddressItem } from "./AddressItem";
import { Modal } from "../../modal/Modal";
import { AddressFormModal } from "./AddressFormModal";

export function SelectAddressWidget() {
  const [isLoading, addresses, fetchData] = useAddress();
  const [selectedDeliveryAddress, setSelectedDeliveryAddress] = useState();

  const handleAddressSelect = (address) => {
    setSelectedDeliveryAddress(address);
  };

  return (
    <div>
      <div>
        {selectedDeliveryAddress && (
          <div className="flex flex-row">
            <div className="flex flex-col">
              <span className="text-5xl font-normal">
                {selectedDeliveryAddress.address}
              </span>
              <span className="text-2xl font-light">
                {selectedDeliveryAddress.city}
              </span>
              <span className="text-2xl font-light">
                {selectedDeliveryAddress.zipCode}
              </span>
            </div>
            <div className="flex justify-center content-center">
              <button
                className="text-white bg-slate-500 hover:bg-slate-700"
                onClick={() => handleAddressSelect(null)}
              >
                Change
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="">
        {!selectedDeliveryAddress && (
          <div className="flex flex-col">
            {addresses.map((address, index) => (
              <div className="flex flex-row m-1" key={address.id}>
                <div>
                  <AddressItem address={address} />
                </div>
                <button
                  className="text-white bg-slate-500 hover:bg-slate-700"
                  onClick={() => handleAddressSelect(address)}
                >
                  Select
                </button>
              </div>
            ))}
            <div>
              <AddressFormModal onSaveAddressCallback={fetchData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
