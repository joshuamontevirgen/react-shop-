import React, { useState, useEffect, useRef } from "react";
import { useContactDetailsData } from "./useContactDetailsData";
import { ContactDetails } from "./ContactDetailsForm";

export function SelectContactDetails({ onChange, formItemName }) {
  const [firstLoad, setFirstLoad] = useState(true);
  const [isContactDetailsLoading, contactDetails, fetchData] =
    useContactDetailsData();

  useEffect(() => {
    if (!isContactDetailsLoading) {
      onChange({
        target: {
          name: formItemName,
          value: contactDetails.mobileNumber,
        },
      });
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
                  <ContactDetails
                    contactDetails={contactDetails}
                    onSave={fetchData}
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
