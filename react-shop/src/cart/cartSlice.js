import { createSlice } from "@reduxjs/toolkit";
import { getIndex } from "../helpers/array";
export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      var item = state.find((i) => i.id === action.payload.id);
      if (!item) {
        state.push({ ...action.payload, quantity: 1 });
      } else {
        item.quantity++;
      }
    },
    subItem: (state, action) => {
      var item = state.find((i) => i.id === action.payload.id);

      item.quantity--;
      if (item.quantity == 0) {
        state.splice(getIndex(state, action.payload.id), 1);
      }
    },
    removeItem: (state, action) => {},
  },
});

export const { addItem, removeItem, subItem } = cartSlice.actions;
export default cartSlice.reducer;
