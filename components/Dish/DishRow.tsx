import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import CurrencyFormat from "react-currency-format";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  reduceFromBasket,
  removeFromBasket,
  selectBasketItemsWithItemId,
} from "../../features/basketSlice";
import { urlFor } from "../../sanity-deliveroo-clone/sanity";
import { DishProps } from "../../helper/types";

const DishRow = (props: DishProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const items = useSelector((state) =>
    selectBasketItemsWithItemId(state as any, props.id)
  );
  const dispatch = useDispatch();

  const handleAddToBasket = () => {
    dispatch(addToBasket({ ...props }));
  };

  const handleReduceFromBasket = () => {
    dispatch(reduceFromBasket({ ...props }));
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setIsPressed(!isPressed);
          if (!isPressed) dispatch(removeFromBasket({ ...props }));
        }}
        className={`bg-white py-2 px-4 border-y border-gray-200 ${
          isPressed && "border-b-0"
        }`}
      >
        <View className="flex-row items-center justify-between">
          <View className="space-y-1">
            <Text>{props.name}</Text>
            <Text className="text-sm text-gray-500 max-w-min">
              {props.short_description}
            </Text>
            <CurrencyFormat
              value={props.price}
              prefix="Rp."
              thousandSeparator=","
              displayType="text"
              renderText={(value) => (
                <Text className="text-sm text-gray-500 mt-1">{value}</Text>
              )}
            />
          </View>
          <Image
            source={{
              uri: urlFor(props?.image).url(),
            }}
            className="h-20 w-20 p-4 bg-gray-300 rounded"
            style={{
              borderWidth: 1,
              borderColor: "gray",
            }}
          />
        </View>
      </TouchableOpacity>

      {isPressed && (
        <View className="bg-white px-4">
          <View className="flex-row items-center space-x-2 pb-3">
            <TouchableOpacity onPress={handleReduceFromBasket}>
              <MinusCircleIcon
                size={40}
                color={items.length > 0 ? "#FFC529" : "gray"}
              />
            </TouchableOpacity>

            <Text>{items.length}</Text>

            <TouchableOpacity onPress={handleAddToBasket}>
              <PlusCircleIcon size={40} color={"#FFC529"} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;
