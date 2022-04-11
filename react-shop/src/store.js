import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./components/cart/cartSlice";
import authenticationReducer from "./components/authentication/authenticationSlice";
import appReducer from "./components/app/appSlice";
export default configureStore({
  reducer: {
    cart: cartReducer,
    authentication: authenticationReducer,
    app: appReducer,
  },
});
