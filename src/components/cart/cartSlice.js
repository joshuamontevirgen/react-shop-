import { createSlice } from "@reduxjs/toolkit";
import { getIndex } from "../../helpers/array";

function getTotal(items) {
  return items
    .map((item) => {
      return item.subTotal;
    })
    .reduce((a, b) => a + b, 0)
    .toLocaleString("en", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
}

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    showSide: false,
    showPopup: false,
    total: "0.00",
  },
  reducers: {
    addCartItem: (state, action) => {
      var item = state.items.find((i) => i.id === action.payload.id);
      if (!item) {
        state.items.push({
          ...action.payload,
          quantity: 1,
          subTotal: action.payload.price,
        });
      } else {
        item.quantity++;
        item.subTotal = item.quantity * item.price;
      }

      state.total = getTotal(state.items);
    },
    subCartItem: (state, action) => {
      var item = state.items.find((i) => i.id === action.payload.id);
      item.quantity--;
      item.subTotal = item.quantity * item.price;
      if (item.quantity === 0) {
        state.items.splice(getIndex(state.items, action.payload.id), 1);
      }
      state.total = getTotal(state.items);
    },
    removeCartItem: (state, action) => {
      state.items.splice(getIndex(state.items, action.payload.id), 1);
      state.total = getTotal(state.items);
    },
    toggleSide: (state, action) => {
      state.showSide = action.payload;
    },
  },
});

export const {
  addCartItem,
  removeCartItem,
  subCartItem,
  toggleSide,
  togglePopupFast,
  togglePopupSlow,
} = cartSlice.actions;
export default cartSlice.reducer;
