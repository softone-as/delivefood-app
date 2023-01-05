import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { selectRestaurantItems } from "../features/restaurantSlice";
import { XMarkIcon } from "react-native-heroicons/outline";
import * as Progress from "react-native-progress";
import MapView, { Marker } from "react-native-maps";

type deliveryScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  "Delivery"
>;

const DeliveryScreen = () => {
  const navigation = useNavigation<deliveryScreenProp>();
  const restaurant = useSelector(selectRestaurantItems);
  return (
    <View className="bg-[#FFC529] flex-1">
      <SafeAreaView className="z-50">
        <View className="flex-row justify-between items-center p-5">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <XMarkIcon color="white" size={30} />
          </TouchableOpacity>
          <Text className="font-light text-white text-lg">Order Help</Text>
        </View>

        <View className="bg-white mx-5 my-2 rounded-md shadow-md p-6 z-50">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-lg text-gray-400">Estimated Arrival</Text>
              <Text className="text-4xl font-bold">25-30 minute</Text>
            </View>
            <Image
              source={require("../assets/run-health.png")}
              className="h-20 w-20"
            />
          </View>

          <Progress.Bar indeterminate color="#FFC529" />
          <Text className="mt-3 text-gray-500">
            Your order at {restaurant?.title} is being prepared
          </Text>
        </View>
      </SafeAreaView>

      <MapView
        initialRegion={{
          latitude: restaurant?.lat as number,
          longitude: restaurant?.long as number,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        className="flex-1 mt-10 z-0"
        mapType="mutedStandard"
      >
        <Marker
          coordinate={{
            latitude: restaurant?.lat as number,
            longitude: restaurant?.long as number,
          }}
          title={restaurant?.title as string}
          description={restaurant?.short_description as string}
          identifier="origin"
          pinColor="#FFC529"
        />
      </MapView>

      <SafeAreaView className="bg-white flex-row items-center space-x-5 h-28">
        <Image
          source={require("../assets/rider.png")}
          className="h-12 w-12 bg-gray-300 p-4 rounded-full ml-5 "
        />
        <View className="flex-1">
          <Text className="text-lg">Tony Hawk</Text>
          <Text className="text-gray-400">Your rider</Text>
        </View>
        <Text className="text=[#FFC529] text-xl mr-5 ">Call</Text>
      </SafeAreaView>
    </View>
  );
};

export default DeliveryScreen;
