import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useOrderData } from "./useOrderData";
import { useOrderItemsData } from "./useOrderItemsData";

export const Order = () => {
  const params = useParams();
  const orderId = params.id;
  const [isOrderLoading, order, fetchOrderData] = useOrderData(orderId);
  const [isOrderitemsLoading, orderItems, fetchOrderItemsData] =
    useOrderItemsData(orderId);
  useEffect(() => {
    console.log(order);
  }, [order]);
  useEffect(() => {
    console.log(orderItems);
  }, [orderItems]);
  return (
    <>
      {!isOrderLoading && (
        <div className="flex flex-col w-full justify-center items-center">
          <span>Order # {order.id}</span>
          <span>Status: {order.sOrderStatus}</span>
          <span>Payment Status: {order.sPaymentStatus}</span>
          <span>Address: {order.address?.address}</span>
        </div>
      )}
      {!isOrderitemsLoading && (
        <div className="flex flex-col w-full justify-center items-center">
          {orderItems.map((orderitem) => {
            return (
              <div className="flex flex-col border w-full justify-start  items-center">
                <span>name: {orderitem.item.name}</span>
                <span>price: {orderitem.price}</span>
                <span>quantity: {orderitem.quantity}</span>
                <span>subtotal: P{orderitem.quantity * orderitem.price}</span>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
