import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useOrdersData } from "./useOrdersData";
import { Link } from "react-router-dom";

export const Orders = () => {
  const params = useParams();
  const orderId = params.id;
  const [isOrderLoading, orders, fetchOrderData] = useOrdersData(orderId);

  return (
    <div className="">
      <div className="border p-1">Orders</div>
      {!isOrderLoading && (
        <div className="flex flex-col w-full">
          {orders.map((order) => {
            return (
              <div key={order.id} className="">
                <div className="flex flex-col border relative ">
                  <div className="sticky top-0 flex flex-row justify-between bg-slate-100 px-3 py-1">
                    <div className="flex flex-col">
                      <span>Order # {order.id}</span>
                      <span>{order.sDate}</span>
                    </div>
                    <div className="flex flex-col ml-auto">
                      <span>Status: {order.sOrderStatus}</span>
                      <span>Payment Status: {order.sPaymentStatus}</span>
                    </div>
                    <Link
                      to={`/orders/${order.id}`}
                      className="flex justify-center items-center ml-3 border-2 p-3"
                    >
                      Details
                    </Link>
                  </div>

                  <div className="flex flex-col">
                    {order.items.map((orderitem) => {
                      return (
                        <div
                          key={orderitem.id}
                          className="flex flex-row font-light justify-between py-1 pl-5 pr-3"
                        >
                          <span>{orderitem.item.name}</span>
                          <span>
                            {(
                              orderitem.price * orderitem.quantity
                            ).toLocaleString("en", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                      );
                    })}
                    <div className="flex flex-row justify-between  py-1 px-3 border-t-2">
                      <span>Total</span>
                      <span>
                        {order.total.toLocaleString("en", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
