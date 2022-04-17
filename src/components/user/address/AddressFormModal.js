import React, { useState, useRef } from "react";
import { useOnClickOutside } from "../../app/useOnClickOutside";
import { API_URL } from "../../../constants";
import { getToken } from "../../authentication/getToken";

export function AddressFormModal({ onSaveAddressCallback }) {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [showModal, setShowModal] = React.useState(false);
  const modalRef = useRef();

  useOnClickOutside(modalRef, () => showModal && setShowModal(false));
  const handleAdd = async (e) => {
    const res = await addAddress({ address, city, zipCode });
    if (res) {
      setShowModal(false);
      onSaveAddressCallback();
      alert("added");
    } else {
    }
  };

  async function addAddress(address) {
    return fetch(API_URL + "/api/user/address", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getToken(),
      },
      body: JSON.stringify(address),
    }).then((data) => data.json());
  }

  return (
    <>
      <div
        style={{ zIndex: 999 }}
        className={` fixed inset-0 h-vh bg-black ${
          showModal ? " fadeIn " : "fadeOut "
        }`}
      />
      <button
        className="text-white bg-slate-500 hover:bg-slate-700"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Add new address
      </button>
      {showModal ? (
        <div>
          <div
            style={{ zIndex: 1000 }}
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div
              className="relative w-auto my-6 mx-auto max-w-3xl"
              ref={modalRef}
            >
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Modal Title</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="w-full flex flex-col">
                    <div>
                      {/*address */}
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-first-name"
                      >
                        Address
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        type="text"
                        onChange={(e) => setAddress(e.target.value)}
                      ></input>
                    </div>

                    <div className="flex flex-row justify-between">
                      {/*city */}
                      <div className="w-5/12">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-first-name"
                        >
                          City
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          type="text"
                          onChange={(e) => setCity(e.target.value)}
                        ></input>
                      </div>

                      {/*zipcode */}
                      <div className="w-5/12">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-first-name"
                        >
                          Zip Code
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          type="text"
                          onChange={(e) => setZipCode(e.target.value)}
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleAdd()}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
