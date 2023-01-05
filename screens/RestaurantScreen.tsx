import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  ChevronRightIcon,
  MapPinIcon,
  QuestionMarkCircleIcon,
} from "react-native-heroicons/outline";
import { ArrowLeftIcon, StarIcon } from "react-native-heroicons/solid";
import { useDispatch } from "react-redux";
import { RootStackParamList } from "../App";
import BasketIcon from "../components/Basket/BasketIcon";
import DishRow from "../components/Dish/DishRow";
import { setRestaurant } from "../features/restaurantSlice";
import { urlFor } from "../sanity-deliveroo-clone/sanity";

type RouteRestaurantProps = RouteProp<RootStackParamList, "Restaurant">;

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteRestaurantProps>();
  const {
    id,
    image,
    title,
    rating,
    genre,
    address,
    short_description,
    dishes,
    long,
    lat,
  } = route.params.props;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setRestaurant({
        id,
        image,
        title,
        rating,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat,
      })
    );
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <>
      <BasketIcon />

      <View className="relative">
        <Image
          source={{
            uri: urlFor(image).url(),
          }}
          className="h-56 w-screen bg-gray-300 p-4"
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute top-12 left-5 p-2 bg-gray-100 rounded-full"
        >
          <ArrowLeftIcon size={20} color="#FFC529" />
        </TouchableOpacity>

        <View className="pt-4 bg-white">
          <Text className="text-3xl font-bold px-4">{title}</Text>
          <View className="flex-row items-center space-x-2 my-2 px-4">
            <View className="flex-row items-center space-x-1">
              <StarIcon color="#FFC529" size={22} opacity={0.5} />
              <Text className="text-sm text-gray-500">
                <Text className="text-yellow-500">{rating}</Text> • {genre}
              </Text>
            </View>
            <View className="flex-row items-center space-x-1 ">
              <MapPinIcon color="gray" size={22} opacity={0.4} />
              <Text className="text-xs text-gray-500 ">Nearby • {address}</Text>
            </View>
          </View>

          <Text className="text-sm text-gray-500 mt-2 pb-4 px-4">
            {short_description}
          </Text>

          <TouchableOpacity className="flex-row items-center p-4 space-x-2 border-y border-gray-200">
            <QuestionMarkCircleIcon size={20} opacity={0.6} color="gray" />
            <Text className="flex-1 font-medium">Have a food allergy?</Text>
            <ChevronRightIcon color="#FFC529" />
          </TouchableOpacity>
        </View>

        <View className="mt-6">
          <Text className="font-bold text-lg px-4 pb-2">
            {title} recommends
          </Text>

          <ScrollView
            className="bg-gray-100"
            contentContainerStyle={{
              paddingBottom: 100,
            }}
          >
            {dishes?.map((dish: any) => (
              <DishRow key={dish._id} id={dish._id} {...dish} />
            ))}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default RestaurantScreen;
