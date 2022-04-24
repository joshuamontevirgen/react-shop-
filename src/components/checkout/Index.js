import React, { useState, useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { SelectAddress } from "../user/address/SelectAddress";
import { SelectContactDetails } from "../user/contactDetails/SelectContactDetails";
import { CheckoutPanel } from "./CheckoutPanel";
import { useForm } from "../utility/useForm";
//flex items-start https://stackoverflow.com/questions/27575779/prevent-a-flex-items-height-from-expanding-to-match-other-flex-items

export function Index() {
  const total = useSelector((state) => {
    return state.cart.total;
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
    console.log(formData);
  };

  const [formData, submitting, handleSubmit, handleChange] = useForm();

  return (
    <>
      <div className=" w-full flex flex-row justify-between  w-full items-start  ">
        <div className="flex flex-col w-7/12 px-1 mx-10">
          <CheckoutPanel title="Delivery Details" isError={!formData.address}>
            <SelectAddress formItemName="address" onChange={handleChange} />
          </CheckoutPanel>
          <CheckoutPanel title="Contact Details" isError={!formData.contact}>
            <SelectContactDetails
              formItemName="contact"
              onChange={handleChange}
            />
          </CheckoutPanel>
        </div>

        <div className="w-3/12  mx-10  ">
          <CheckoutPanel>
            <div className="flex flex-row justify-between text-3xl font-light my-3">
              <span>Total</span>
              <span>{total}</span>
            </div>
            <div className="w-full flex justify-center content-center my-3">
              <button
                className="p-3 text-white w-full bg-slate-500 hover:bg-slate-700 btn justify-center content-center font-light text-3xl "
                onClick={(e) => handleSubmit(e, onSubmit)}
              >
                Checkout
              </button>
            </div>
          </CheckoutPanel>
        </div>
      </div>
    </>
  );
}
