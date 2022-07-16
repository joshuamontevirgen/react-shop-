import React, { useEffect, useState } from "react";
import { API_URL } from "../../../constants";
import { getToken } from "../../authentication/getToken";

export function useOrdersData() {
  const [isLoading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  async function fetchData() {
    setLoading(true);
    var data = await fetch(API_URL + `/api/order`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getToken(),
      },
    }).then((data) => data.json());
    setOrders(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);
  return [isLoading, orders, fetchData];
}
