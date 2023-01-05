import { createSlice } from "@reduxjs/toolkit";
import { DishProps } from "../components/Dish/DishRow";
import { RestaurantCardProps } from "../components/Restaurant/RestaurantCard";
import { Nullable } from "../helper";
import { RootState } from "../redux/store";

export interface RestaurantState {
  restaurant: Nullable<Partial<RestaurantCardProps>>;
}

const initialState: RestaurantState = {
  restaurant: {
    image: null,
    title: null,
    rating: null,
    genre: null,
    address: null,
    short_description: null,
    dishes: null,
    long: null,
    lat: null,
  },
};

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setRestaurant: (state: any, action) => {
      state.restaurant = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRestaurant } = restaurantSlice.actions;

export const selectRestaurantItems = (state: RootState) =>
  state.restaurant.restaurant;

export default restaurantSlice.reducer;
