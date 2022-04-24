import { useSelector, useDispatch } from "react-redux";
import { showLoaderOverlay, hideLoaderOverlay } from "./loaderOverlaySlice";
export function useOverlay() {
  const dispatch = useDispatch();
  const showLoader = () => {
    dispatch(showLoaderOverlay());
  };
  const hideLoader = () => {
    dispatch(hideLoaderOverlay());
  };

  return [showLoader, hideLoader];
}
