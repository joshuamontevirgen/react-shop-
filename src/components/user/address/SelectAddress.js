import React, { useState, useEffect, useRef } from "react";
import { useAddressData } from "./useAddressData";
import { AddressItem } from "./AddressItem";
import { AddressForm } from "./AddressForm";
import { Modal } from "../../modal/Modal";

export function SelectAddress({ setFormSelectedId }) {
  const addressEndListRef = useRef(null);
  const [firstLoad, setFirstLoad] = useState(true);
  const [isAddressLoading, addresses, fetchData] = useAddressData();
  const [selectedDeliveryAddress, setSelectedDeliveryAddress] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);

  const handleAddressSelect = (address) => {
    setSelectedDeliveryAddress(address);
    setFormSelectedId && setFormSelectedId(address?.id);
  };

  function scrollToBottom() {
    !isAddressLoading &&
      addressEndListRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    if (!isAddressLoading && firstLoad) {
      var address = addresses.find((e) => true);
      setFormSelectedId && setFormSelectedId(address?.id);
      setSelectedDeliveryAddress(address);
      setFirstLoad(false);
    }
  }, [isAddressLoading]);

  useEffect(() => {
    scrollToBottom();
  }, [!isAddressLoading, addresses, addressEndListRef]);

  return (
    <div>
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
                    onClick={() => handleAddressSelect(null)}
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
                <div className="flex flex-col overflow-auto w-full mb-5">
                  {addresses.map((address, index) => (
                    <div className=" " key={address.id}>
                      <div>
                        <AddressItem
                          address={address}
                          onClick={() => handleAddressSelect(address)}
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
          <button
            className="px-3 py-1 text-white bg-slate-500 hover:bg-slate-700 text-sm font-light flex justify-center items-center w-full"
            type="button"
            onClick={() => setShowAddressModal(true)}
          >
            Add new address
          </button>
          <Modal
            showModal={showAddressModal}
            setShowModal={setShowAddressModal}
            title="New Address"
          >
            <AddressForm
              onCancel={() => setShowAddressModal(false)}
              onSave={() => {
                setShowAddressModal(false);
                fetchData();
              }}
            />
          </Modal>
        </div>
      )}
    </div>
  );
}
