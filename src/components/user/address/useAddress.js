import React, { useEffect, useState } from "react";
import { API_URL } from "../../../constants";
import { getCookieValue } from "../../../helpers/cookies";
import { COOKIE_JWT_TOKEN_NAME } from "../../../constants";

export function useAddress() {
  const [isLoading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);

  var token = getCookieValue(COOKIE_JWT_TOKEN_NAME);

  async function fetchData() {
    setLoading(true);
    var data = await fetch(API_URL + "/api/user/address", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
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
