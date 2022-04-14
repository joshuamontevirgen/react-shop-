import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const FilterItem = ({ item }) => {
  var [isHover, setHover] = useState(false);
  var [isPopupHover, setPopupHover] = useState(false);
  const location = useLocation();
  return (
    <div
      className="relative w-full flex flex-row "
      onMouseEnter={() => item.children.length > 0 && setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link
        className={`block py-1 px-3 hover:font-normal ${
          location.pathname.includes(item.value)
            ? "font-semibold"
            : "font-light"
        }`}
        to={`/catalog/${item.value}`}
      >
        {item.label}
      </Link>

      <div
        className={`z-50 bg-white absolute ml-40 p-0 flex border flex-col w-96 ${
          !(isHover || isPopupHover) && "hidden"
        }`}
        onMouseEnter={() => setPopupHover(true)}
        onMouseLeave={() => setPopupHover(false)}
      >
        <h2 className="text-white bg-slate-500 w-full p-1 font-semibold">
          {item.label}
        </h2>
        <div>
          <ul className="flex flex-wrap flex-row ">
            {item.children.map((subitem, index) => {
              return (
                <li className=" w-1/2" key={index}>
                  <Link
                    className="block py-1 px-3 hover:font-normal border font-light"
                    to={`/catalog/${item.value}/${subitem.value}`}
                  >
                    {subitem.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
