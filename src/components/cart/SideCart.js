import React, { useEffect, forwardRef, useImperativeHandle } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CartContent } from "./CartContent";
import { toggleSide, togglePopupFast } from "./cartSlice";
import { setDisable as setPageDisable } from "../app/appSlice";
import "./styles.css";

//https://upmostly.com/tutorials/react-onhover-event-handling-with-examples
//https://codezup.com/forwardref-in-functional-components-react-hooks/

export const SideCart = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const showSideCart = useSelector((state) => {
    return state.cart.showSide;
  });

  function close() {
    dispatch(setPageDisable(false));
    dispatch(togglePopupFast(false));
    dispatch(toggleSide(false));
  }

  const total = useSelector((state) => {
    return state.cart.total;
  });

  useImperativeHandle(ref, () => ({
    onPageClick: (event) => {
      close();
    },
  }));

  return (
    <div id="side-cart" className={showSideCart ? "open" : ""}>
      <div className="top d-flex align-items-center justify-content-center p-2">
        <h2>Your Cart</h2>
      </div>
      <CartContent enableControls={true} />
      <div className="bottom h-100 d-flex flex-column">
        <div className="total d-flex align-items-center justify-content-between">
          <h3 className="font-weight-bold"> Total </h3>
          <h3 className="font-weight-bold right">P{total}</h3>
        </div>
        <div className="flex-grow-1  buttons d-flex justify-content-between ">
          <button
            onClick={close}
            className="btn-block btn btn-secondary  rounded-0 col-6"
          >
            Continue Shopping
          </button>
          <button className="btn-block btn btn-primary  rounded-0 col-6">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
});
