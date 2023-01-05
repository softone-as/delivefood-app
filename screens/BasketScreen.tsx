import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RocketLaunchIcon, XCircleIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import { RootStackParamList } from "../App";
import { DishProps } from "../components/Dish/DishRow";
import {
  reduceFromBasket,
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../features/basketSlice";
import { selectRestaurantItems } from "../features/restaurantSlice";
import sanityClient, { urlFor } from "../sanity-deliveroo-clone/sanity";

type basketScreenProp = NativeStackNavigationProp<RootStackParamList, "Basket">;

const BasketScreen = () => {
  const navigation = useNavigation<basketScreenProp>();
  const restaurant = useSelector(selectRestaurantItems);
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    const groupedItems = items.reduce((results: any, item: DishProps) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#FFC529] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">
              {restaurant?.title}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute top-3 right-5 rounded-full bg-gray-100"
          >
            <XCircleIcon color="#FFC529" size={50} />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <RocketLaunchIcon
            color={"#FFC529"}
            className="w-7 h-7 bg-gray-300 p-4 rounded-full"
          />

          <Text className="flex-1">Deliver in 50-70 min</Text>

          <TouchableOpacity>
            <Text className="text-[#FFC529]">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-white py-2 px-5"
            >
              <Text className="text-[#FFC529]">{items?.length} x</Text>
              <Image
                source={{
                  uri: urlFor(items[0]?.image).url(),
                }}
                className="w-12 h-12 rounded-full"
              />

              <Text className="flex-1">{items[0]?.name}</Text>
              <CurrencyFormat
                value={items[0]?.price}
                thousandSeparator=","
                prefix="Rp."
                displayType="text"
                renderText={(value) => (
                  <Text className="text-gray-600">{value}</Text>
                )}
              />

              <TouchableOpacity>
                <Text
                  className="text-[#FFC529] text-xs"
                  onPress={() => dispatch(reduceFromBasket({ id: key }))}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View className="p-5 bg-white mt-5 space-y-4">
          {/* <ReceiptItem title="Subtotal" price={basketTotal} />
          <ReceiptItem title="Delivery Fee" price={5.99} />
          <ReceiptItem title="Order Total" price={basketTotal + 5.99} isBold /> */}
          <View className="flex-row items-center justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <CurrencyFormat
              value={basketTotal}
              thousandSeparator=","
              prefix="Rp."
              displayType="text"
              renderText={(value) => (
                <Text className="text-gray-400">{value}</Text>
              )}
            />
          </View>

          <View className="flex-row items-center justify-between">
            <Text className="text-gray-400">Delivery Fee</Text>
            <CurrencyFormat
              value={5.99}
              thousandSeparator=","
              prefix="Rp."
              displayType="text"
              renderText={(value) => (
                <Text className="text-gray-400">{value}</Text>
              )}
            />
          </View>

          <View className="flex-row items-center justify-between">
            <Text>Order Total</Text>
            <CurrencyFormat
              value={basketTotal + 5.99}
              thousandSeparator=","
              prefix="Rp."
              displayType="text"
              renderText={(value) => (
                <Text className="font-extrabold">{value}</Text>
              )}
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              dispatch(removeFromBasket);
              navigation.navigate("PreparingOrder");
            }}
            className="rounded-lg bg-[#FFC529] p-3"
          >
            <Text className="text-center text-white font-bold text-lg">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
