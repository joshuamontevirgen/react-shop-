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
    const [quantityNumberClasses, setQuantityNumberClasses] = useState("");
    const [quantityDivClasses, setQuantityDivClasses] = useState("");
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
      //quantity number
      var qclasses = enableControls ? "enable-controls " : "";
      qclasses += showControls ? "active " : "";
      setQuantityNumberClasses(qclasses);

      //quantity div
      var dclasses = "quantity small d-flex flex-row ";
      dclasses += showControls ? "active " : "";
      setQuantityDivClasses(dclasses);

      showControls ? setDisabledOpacity(0.7) : setDisabledOpacity(1);
    }, [showControls, enableControls]);

    function pageClick() {
      setShowControls(false);
    }

    return (
      <li className="noselect ">
        <div
          ref={cartItemDivRef}
          className="cart-item d-flex align-items-center "
        >
          <img
            className="img"
            src={item.imageUrl}
            style={{ opacity: disabledOpacity }}
            onClick={pageClick}
          ></img>
          <div
            className="d-flex flex-column cart-item-name-wrapper"
            style={{ opacity: disabledOpacity }}
            onClick={pageClick}
          >
            <span> {item.name}</span>
            <span className=" text-secondary small">{item.desc}</span>
          </div>

          <span className={quantityDivClasses}>
            <button
              className={showControls ? "btn no-shadow" : "hidden"}
              onClick={() => dispatch(subCartItem(item))}
            >
              {item.quantity > 1 ? (
                <Icon.Dash />
              ) : (
                <Icon.Trash3 color={"red"} />
              )}
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

          <div
            className="item-subtotal small text-right"
            style={{ opacity: disabledOpacity }}
            onClick={pageClick}
          >
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
);
