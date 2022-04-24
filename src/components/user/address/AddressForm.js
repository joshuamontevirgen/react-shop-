import React, { useState, useRef, useEffect } from "react";
import { API_URL } from "../../../constants";
import { getToken } from "../../authentication/getToken";
import { useForm } from "../../utility/useForm";

export function AddressForm({ onSave, onCancel }) {
  const [formData, submitting, handleSubmit, handleChange] = useForm();

  const onSubmit = async (e) => {
    const res = await addAddress(formData);
    if (res) {
      onSave();
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
            className="appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight outline-slate-300 focus:outline-1  "
            type="text"
            name="address"
            onChange={handleChange}
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
              className="appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight outline-slate-300 focus:outline-1  "
              type="text"
              name="city"
              onChange={handleChange}
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
              className="appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight outline-slate-300 focus:outline-1 "
              type="text"
              name="zipCode"
              onChange={handleChange}
            ></input>
          </div>
        </div>
      </div>

      {/*footer*/}
      <div className="flex items-center justify-end p-6 pr-0 border-t border-solid border-slate-200 rounded-b">
        <button
          className="text-gray-700 background-transparent font-light uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={onCancel}
        >
          Close
        </button>
        <button
          className="px-6 py-2 text-white bg-slate-500 uppercase hover:bg-slate-700 text-sm font-light flex justify-center items-center "
          type="button"
          onClick={(e) => handleSubmit(e, onSubmit)}
        >
          Save Changes
        </button>
      </div>
    </>
  );
}
