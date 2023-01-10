import { Nullable } from "..";

export interface RestaurantCardProps {
  id: number;
  image: Nullable<string>;
  title: Nullable<string>;
  rating: Nullable<number>;
  genre: Nullable<string>;
  address: Nullable<string>;
  short_description: Nullable<string>;
  dishes: Nullable<Array<string>>;
  long: Nullable<number>;
  lat: Nullable<number>;
}

export interface DishProps {
  key: React.Key;
  id: string;
  name: string;
  short_description: string;
  image: string;
  price: number;
}

export interface BasketState {
  items: Array<DishProps>;
}

export interface BasketType {
  [key: string]: any;
}
