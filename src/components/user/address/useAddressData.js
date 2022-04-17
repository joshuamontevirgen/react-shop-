import React, { useEffect, useState } from "react";
import { API_URL } from "../../../constants";
import { getToken } from "../../authentication/getToken";

export function useAddressData() {
  const [isLoading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);

  async function fetchData() {
    setLoading(true);
    var data = await fetch(API_URL + "/api/user/address", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getToken(),
      },
    }).then((data) => data.json());
    setAddresses(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);
  return [isLoading, addresses, fetchData];
}
