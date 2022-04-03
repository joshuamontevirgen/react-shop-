import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";
//https://getbootstrap.com/docs/5.0/components/card/

export const Item = React.forwardRef(({ item, isGrid }, ref) => (
  <div className="card" ref={ref}>
    <div className={isGrid ? "" : "row "}>
      <div className={isGrid ? "" : "col-md-4"}>
        <img className="" src={item.imageUrl}></img>
      </div>
      <div className={isGrid ? "" : "col-md-8"}>
        <div className="card-body">
          <h3 className="card-title">{item.name}</h3>
          <p className="card-text">{item.desc}</p>
          <p className="card-text">P{item.price}</p>
        </div>
      </div>
    </div>
  </div>
));
