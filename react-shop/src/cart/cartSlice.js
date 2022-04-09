import { createSlice } from "@reduxjs/toolkit";
import { getIndex } from "../helpers/array";
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    show: false,
    hover: false,
    fadeOutClass: "fadeOut",
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
    },
    subCartItem: (state, action) => {
      var item = state.items.find((i) => i.id === action.payload.id);
      item.quantity--;
      item.subTotal = item.quantity * item.price;
      if (item.quantity == 0) {
        state.items.splice(getIndex(state.items, action.payload.id));
      }
    },
    removeCartItem: (state, action) => {
      var item = state.items.find((i) => i.id === action.payload.id);
      state.items.splice(getIndex(state.items, action.payload.id));
    },
    toggleShowFast: (state, action) => {
      state.fadeOutClass = "fadeOut";
      state.show = action.payload;
    },
    toggleShowSlow: (state, action) => {
      state.fadeOutClass = "fadeOutSlow";
      state.show = action.payload;
    },
    toggleHover: (state, action) => {
      state.fadeOutClass = "fadeOut";
      state.hover = action.payload;
    },
  },
});

export const {
  addCartItem,
  removeCartItem,
  subCartItem,
  toggleShowFast,
  toggleShowSlow,
  toggleHover,
} = cartSlice.actions;
export default cartSlice.reducer;
