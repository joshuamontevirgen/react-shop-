import React, { useState, useRef, useEffect } from "react";
import { useOnClickOutside } from "../../app/useOnClickOutside";
import { API_URL } from "../../../constants";
import { getToken } from "../../authentication/getToken";

export function ContactDetails({ contactDetails, onSave }) {
  const divRef = useRef();
  const inputRef = useRef();
  const [isHover, setIsHover] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");

  const handleSave = async (e) => {
    const res = await saveContact({ mobileNumber: mobileNumber });
    if (res) {
      setIsEdit(false);
      onSave();
    } else {
    }
  };
  async function saveContact(contact) {
    return fetch(API_URL + "/api/user/contactDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getToken(),
      },
      body: JSON.stringify(contact),
    }).then((data) => data.json());
  }

  useEffect(() => {
    isEdit && inputRef.current?.focus();
  }, [isEdit]);
  useOnClickOutside(divRef, () => isEdit && setIsEdit(false));
  return (
    <div
      ref={divRef}
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={`flex flex-row justify-between ${
        !isEdit && " hover:bg-slate-100 "
      } w-full  items-start justify-center items-center border-b-2 border-gray-200`}
    >
      <div className="flex flex-col">
        {!isEdit && (
          <span
            className={`text-2xl font-normal p-4 noselect ${
              !contactDetails.mobileNumber && " text-gray-300"
            }`}
          >
            {contactDetails.mobileNumber
              ? contactDetails.mobileNumber
              : "09XXXXXXXXX"}
          </span>
        )}

        {isEdit && (
          <input
            ref={inputRef}
            className=" text-2xl font-normal p-4 appearance-none border-0 rounded w-full p-0 m-0 text-gray-700 leading-tight outline-none outline-0"
            value={mobileNumber}
            placeholder="09XXXXXXXXX"
            onChange={(e) => setMobileNumber(e.target.value)}
          ></input>
        )}
      </div>

      {!isEdit && isHover && (
        <button
          className="p-2 mx-3  py-1 mt-0 text-white bg-slate-500 hover:bg-slate-700 text-sm font-light"
          type="button"
          onClick={() => {
            setIsEdit(true);
            setMobileNumber("");
          }}
        >
          Change
        </button>
      )}

      {isEdit && (
        <div className="flex flex-row p-1">
          <button
            className="p-2 mx-1 py-1 mt-0 text-white bg-slate-500 hover:bg-slate-700 text-sm font-light"
            type="button"
            onClick={() => setIsEdit(false)}
          >
            Cancel
          </button>
          <button
            className="p-2 py-1 mt-0 mr-3 text-white bg-slate-500 hover:bg-slate-700 text-sm font-light"
            type="button"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}
