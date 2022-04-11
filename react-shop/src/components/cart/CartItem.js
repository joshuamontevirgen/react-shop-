import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCartItem, removeCartItem, subCartItem } from "./cartSlice";
import * as Icon from "react-bootstrap-icons"; //https://icons.getbootstrap.com/  https://github.com/ismamz/react-bootstrap-icons#readme
import "./styles.css";

export function CartItem({ item, enableControls }) {
  const dispatch = useDispatch();
  const [showControls, setShowControls] = useState(false);
  const [quantityNumberClasses, setQuantityNumberClasses] = useState("");
  const [quantityDivClasses, setQuantityDivClasses] = useState("");
  useEffect(() => {
    //quantity number
    var qclasses = enableControls ? "enable-controls " : "";
    qclasses += showControls ? "active " : "";
    setQuantityNumberClasses(qclasses);

    var dclasses = "quantity small d-flex flex-row ";
    dclasses += showControls ? "active " : "";
    setQuantityDivClasses(dclasses);
  }, [showControls, enableControls]);

  return (
    <li className="noselect ">
      <div className="cart-item d-flex align-items-center">
        <img className="img" src={item.imageUrl}></img>
        <div className="d-flex flex-column cart-item-name-wrapper">
          <span> {item.name}</span>
          <span className=" text-secondary small">{item.desc}</span>
        </div>

        <span className={quantityDivClasses}>
          <button
            className={showControls ? "btn no-shadow" : "hidden"}
            onClick={() => dispatch(subCartItem(item))}
          >
            {item.quantity > 1 ? <Icon.Dash /> : <Icon.Trash3 color={"red"} />}
          </button>
          <span
            className={quantityNumberClasses}
            onClick={() => {
              enableControls && setShowControls(!showControls);
            }}
          >
            {item.quantity}
          </span>
          <button
            className={showControls ? "btn no-shadow" : "hidden"}
            onClick={() => dispatch(addCartItem(item))}
          >
            <Icon.Plus></Icon.Plus>
          </button>
        </span>

        <div className="item-subtotal small text-right">
          <span className=" ">
            P
            {item.subTotal.toLocaleString("en", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>
    </li>
  );
}
