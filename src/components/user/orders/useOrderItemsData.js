import React, { useEffect, useState } from "react";
import { API_URL } from "../../../constants";
import { getToken } from "../../authentication/getToken";

export function useOrderItemsData(orderId) {
  const [isLoading, setLoading] = useState(true);
  const [orderItems, setOrder] = useState();

  async function fetchData() {
    setLoading(true);
    var data = await fetch(API_URL + `/api/orderItems/${orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getToken(),
      },
    }).then((data) => data.json());
    setOrder(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);
  return [isLoading, orderItems, fetchData];
}
