import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem, removeCartItem, subCartItem } from "./cartSlice";
import * as Icon from "react-bootstrap-icons"; //https://icons.getbootstrap.com/  https://github.com/ismamz/react-bootstrap-icons#readme
import "./styles.css";

export const CartItem = forwardRef(
  ({ item, enableControls, index, handleCartItemClick }, ref) => {
    const cartItemDivRef = useRef(null);

    const dispatch = useDispatch();
    const [showControls, setShowControls] = useState(false);
    const [disabledOpacity, setDisabledOpacity] = useState(1);

    useImperativeHandle(ref, () => ({
      hide: () => {
        setShowControls(false);
      },
    }));

    useEffect(() => {
      if (enableControls) {
        //https://stackoverflow.com/questions/60513173/how-to-add-an-event-listener-to-useref-in-useeffect
        //https://stackoverflow.com/questions/66022475/how-to-get-over-cannot-read-property-removeeventlistener-of-null-in-react
        const instance = cartItemDivRef.current;
        const handleClick = () =>
          handleCartItemClick({
            id: item.id,
            index: index,
          });
        instance.addEventListener("click", handleClick);

        return () => {
          instance.removeEventListener("click", handleClick);
        };
      }
    }, [ref]); //if ref changed(when item added or removed), update

    useEffect(() => {
      showControls ? setDisabledOpacity(0.7) : setDisabledOpacity(1);
    }, [showControls, enableControls]);

    function pageClick() {
      setShowControls(false);
    }

    return (
      <li className="noselect font-light ">
        <div
          ref={cartItemDivRef}
          className="cart-item flex flex-row flex-nowrap justify-center items-center "
        >
          <img
            className={`img  ${showControls ? "opacity-70" : ""}`}
            src={item.imageUrl}
            onClick={pageClick}
          ></img>
          <div
            className={`flex flex-col cart-item-name-wrapper grow font-normal  ${
              showControls ? "opacity-70" : ""
            }`}
            onClick={pageClick}
          >
            <span> {item.name}</span>
            <span className=" text-sm text-slate-600">{item.desc}</span>
          </div>

          <div
            className={`quantity flex flex-row justify-center items-center select-none h-10 w-20 relative ${
              showControls ? " active " : ""
            }`}
          >
            <button
              className={
                showControls
                  ? "absolute left-0 btn no-shadow p-0 h-full flex justify-center items-center select-none"
                  : "hidden"
              }
              onClick={() => dispatch(subCartItem(item))}
            >
              {item.quantity > 1 ? (
                <Icon.Dash className="" />
              ) : (
                <Icon.Trash3 className="" color={"red"} />
              )}
            </button>
            <span
              className={`enable-controls p-0 ${showControls ? "active " : ""}`}
              onClick={() => {
                enableControls && setShowControls(!showControls);
              }}
            >
              {item.quantity}
            </span>
            <button
              className={
                showControls
                  ? "absolute right-0 btn no-shadow p-0 h-full flex justify-center items-center select-none"
                  : "hidden"
              }
              onClick={() => dispatch(addCartItem(item))}
            >
              <Icon.Plus className=""></Icon.Plus>
            </button>
          </div>

          <div
            className={`item-subtotal text-right flex w-20 text-sm justify-end ${
              showControls ? "opacity-70" : ""
            }`}
            onClick={pageClick}
          >
            <span className=" ">
              ₱
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
);
