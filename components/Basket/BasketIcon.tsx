import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import {
  selectBasketItems,
  selectBasketTotal,
} from "../../features/basketSlice";
import { useNavigation } from "@react-navigation/native";
import CurrencyFormat from "react-currency-format";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type restaurantScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  "Restaurant"
>;

const BasketIcon = () => {
  const items = useSelector(selectBasketItems);
  const navigation = useNavigation<restaurantScreenProp>();
  const basketTotal = useSelector(selectBasketTotal);

  if (items.length == 0) return null;

  return (
    <View className="absolute bottom-10 w-full z-50">
      <TouchableOpacity
        onPress={() => navigation.navigate("Basket")}
        className="bg-[#FFC529] rounded-lg p-4 mx-5 flex-row items-center justify-between space-x-1"
      >
        <Text className="text-white font-extrabold text-lg bg-[#D09C10] py-1 px-2">
          {items.length}
        </Text>
        <Text className="text-white font-extrabold text-lg text-center">
          View Basket
        </Text>
        <CurrencyFormat
          value={basketTotal}
          prefix="Rp."
          thousandSeparator=","
          displayType="text"
          renderText={(value) => (
            <Text className="text-lg text-white font-extrabold">{value}</Text>
          )}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;
