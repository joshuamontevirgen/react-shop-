import React, { useState, useEffect, useRef } from "react";
import { useAddressData } from "./useAddressData";
import { AddressItem } from "./AddressItem";
import { AddressFormModal } from "./AddressFormModal";

export function SelectAddressWidget() {
  const addressEndListRef = useRef(null);
  const [firstLoad, setFirstLoad] = useState(true);
  const [isAddressLoading, addresses, fetchData] = useAddressData();
  const [selectedDeliveryAddress, setSelectedDeliveryAddress] = useState(null);

  const handleAddressSelect = (address) => {
    setSelectedDeliveryAddress(address);
  };

  function scrollToBottom() {
    !isAddressLoading &&
      addressEndListRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    if (!isAddressLoading && firstLoad) {
      setSelectedDeliveryAddress(addresses.find((e) => true));
      setFirstLoad(false);
    }
  }, [isAddressLoading]);

  useEffect(() => {
    scrollToBottom();
  }, [!isAddressLoading, addresses, addressEndListRef]);

  return (
    <div className="shadow1 p-8 flex flex-col">
      <div className="sticky top-0 whitespace-nowrap font-light text-2xl">
        Delivery Details
      </div>
      <div
        className={`flex flex-row relative  overflow-auto transition-height duration-500 ease-in-out ${
          !selectedDeliveryAddress
            ? addresses.length > 1
              ? "h-72 m-h-72"
              : "h-40"
            : "h-40"
        }`}
      >
        <div className="mt-3 w-full">
          <div className="">
            {selectedDeliveryAddress && (
              <div className="">
                <div className="flex flex-col">
                  <AddressItem
                    handleClick={() => handleAddressSelect(null)}
                    buttonText="Change Address"
                    address={selectedDeliveryAddress}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="  w-full">
            {!selectedDeliveryAddress && !isAddressLoading && (
              <div className="relative flex flex-col w-full">
                <div className="flex flex-col overflow-auto w-full mb-10">
                  {addresses.map((address, index) => (
                    <div className=" " key={address.id}>
                      <div>
                        <AddressItem
                          address={address}
                          handleClick={() => handleAddressSelect(address)}
                          buttonText="Select"
                        />
                      </div>
                    </div>
                  ))}
                  <div ref={addressEndListRef}></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {!selectedDeliveryAddress && !isAddressLoading && (
        <div
          className="w-full flex justify-center items-center mt-3"
          style={{ zIndex: 100 }}
        >
          <AddressFormModal onSaveAddressCallback={fetchData} />
        </div>
      )}
    </div>
  );
}
