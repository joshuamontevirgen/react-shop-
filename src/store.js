import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./components/cart/cartSlice";
import authenticationReducer from "./components/authentication/authenticationSlice";
import loaderReducer from "./components/utility/loaderOverlay/loaderOverlaySlice";
export default configureStore({
  reducer: {
    cart: cartReducer,
    authentication: authenticationReducer,
    loader: loaderReducer,
  },
});
