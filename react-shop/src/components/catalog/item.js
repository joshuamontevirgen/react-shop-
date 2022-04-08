import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../cart/cartSlice";

//https://getbootstrap.com/docs/5.0/components/card/

export function Item({ item, isGrid }) {
  const dispatch = useDispatch();

  return (
    <div className="card">
      <div className={isGrid ? "" : "row "}>
        <div className={isGrid ? "" : "col-md-4"}>
          <img className="" src={item.imageUrl}></img>
        </div>
        <div className={isGrid ? "" : "col-md-8"}>
          <div className="card-body">
            <h3 className="card-title">{item.name}</h3>
            <p className="card-text">{item.desc}</p>
            <p className="card-text">P{item.price}</p>
            <button className="btn" onClick={() => dispatch(addItem(item))}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
