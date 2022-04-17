//https://stackoverflow.com/questions/32553158/detect-click-outside-react-component/42234988#42234988

import { useEffect } from "react";

export const useOnClickOutside = (ref, callback) => {
  const handleClick = (e) => {
    if (
      ref.current &&
      !ref.current.contains(e.target) //if ref does not have clicked child
    ) {
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};
