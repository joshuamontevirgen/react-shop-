import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./components/cart/cartSlice";
import authenticationReducer from "./components/authentication/authenticationSlice";
export default configureStore({
  reducer: {
    cart: cartReducer,
    authentication: authenticationReducer,
  },
});
