import { createSlice } from "@reduxjs/toolkit";
import { BasketState, DishProps } from "../helper/types";
import { RootState } from "../redux/store";

const initialState: BasketState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state: any, action) => {
      state.items = [...state.items, action.payload];
    },
    reduceFromBasket: (state: any, action) => {
      const index = state.items.findIndex(
        (item: DishProps) => item.id == action.payload.id
      );

      let newBasket = [...state.items];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product id: Rp.{action.payload.id} as its not in the basket`
        );
      }

      state.items = newBasket;
    },
    removeFromBasket: (state: any, action) => {
      state.items = state.items.filter(
        (item: DishProps) => item.id != action.payload.id
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToBasket, reduceFromBasket, removeFromBasket } =
  basketSlice.actions;

export const selectBasketItems = (state: RootState) => state.basket.items;

export const selectBasketItemsWithItemId = (state: RootState, id: string) =>
  state.basket.items.filter((basket) => basket.id == id);

export const selectBasketTotal = (state: RootState) =>
  state.basket.items.reduce(
    (total: number, item: DishProps) => (total += item.price),
    0
  );

export default basketSlice.reducer;
