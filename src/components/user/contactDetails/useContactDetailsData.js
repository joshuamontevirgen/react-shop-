import React, { useEffect, useState } from "react";
import { API_URL } from "../../../constants";
import { getToken } from "../../authentication/getToken";

export function useContactDetailsData() {
  const [isLoading, setLoading] = useState(true);
  const [contactDetails, setContactDetails] = useState({});

  async function fetchData() {
    setLoading(true);
    var data = await fetch(API_URL + "/api/user/contactdetails", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getToken(),
      },
    }).then((data) => data.json());
    setContactDetails(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);
  return [isLoading, contactDetails, fetchData];
}
