import React, { useState, useEffect, useRef } from "react";
import { useContactDetailsData } from "./useContactDetailsData";
import { ContactDetailsItem } from "./ContactDetailsItem";
export function SelectContactDetails({ setFormContact }) {
  const [firstLoad, setFirstLoad] = useState(true);
  const [isContactDetailsLoading, contactDetails, fetchData] =
    useContactDetailsData();
  const [mobileNumber, setMobileNumber] = useState(null);

  useEffect(() => {
    if (!isContactDetailsLoading && firstLoad) {
      setFormContact && setFormContact(contactDetails.mobileNumber);
      setMobileNumber(contactDetails.mobileNumber);
      setFirstLoad(false);
    }
  }, [isContactDetailsLoading]);

  return (
    <div>
      <div
        className={`flex flex-row relative overflow-auto transition-height duration-500 ease-in-out`}
      >
        <div className="mt-3 w-full">
          <div className="  w-full">
            {!isContactDetailsLoading && (
              <div className="relative flex flex-col w-full">
                <div className="flex flex-col overflow-auto w-full mb-5">
                  <ContactDetailsItem
                    contactDetails={contactDetails}
                    onSaveCallback={fetchData}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
