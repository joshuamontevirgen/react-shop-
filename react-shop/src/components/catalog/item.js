import React from "react";
//https://getbootstrap.com/docs/5.0/components/card/

export const Item = ({ item, isGrid }) => {
  return (
    <div className="card">
      <div className={isGrid ? "" : "row g-0"}>
        <div className={isGrid ? "" : "col-md-4"}>
          <img className="card-img-top" src={item.imageUrl}></img>
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
  );
};
