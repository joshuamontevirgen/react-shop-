import React, { useState } from "react";

export function AddressForm({ onSaveAddressCallback }) {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();
    const res = await addAddress({ Email: email, Password: password });
    if (res) {
      onSaveAddressCallback();
    } else {
    }
  };

  async function addAddress(address) {
    return fetch(API_URL + "/api/user/address", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    }).then((data) => data.json());
  }

  return (
    <div className="w-full flex flex-col">
      <div>
        {/*address */}
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-first-name"
        >
          Address
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          type="text"
          onChange={(e) => setAddress(e.target.value)}
        ></input>
      </div>

      <div className="flex flex-row justify-between">
        {/*city */}
        <div className="w-5/12">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-first-name"
          >
            City
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="text"
            onChange={(e) => setCity(e.target.value)}
          ></input>
        </div>

        {/*zipcode */}
        <div className="w-5/12">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-first-name"
          >
            Zip Code
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="text"
            onChange={(e) => setZipCode(e.target.value)}
          ></input>
        </div>
      </div>
    </div>
  );
}
