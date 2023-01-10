import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { MapPinIcon } from "react-native-heroicons/outline";
import { StarIcon } from "react-native-heroicons/solid";
import { RootStackParamList } from "../../App";
import { RestaurantCardProps } from "../../helper/types";
import { urlFor } from "../../sanity-deliveroo-clone/sanity";

type homeScreenProp = NativeStackNavigationProp<RootStackParamList, "Home">;

const RestaurantCard = (props: RestaurantCardProps) => {
  const navigation = useNavigation<homeScreenProp>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Restaurant", { props })}
      className="bg-white mr-3 shadow"
    >
      <Image
        source={{
          uri: urlFor(props.image).url(),
        }}
        className="h-36 w-64 rounded-sm"
      />

      <View className="px-3 pb-4">
        <Text className="font-bold text-lg pt-2">{props.title}</Text>
        <View className="flex-row items-center space-x-1">
          <StarIcon color="#FFC529" size={22} opacity={0.5} />
          <Text className="text-xs text-gray-500">
            <Text className="text-yellow-500">{props.rating}</Text> •{" "}
            {props.genre}
          </Text>
        </View>

        <View className="flex-row items-center space-x-1">
          <MapPinIcon color="gray" size={22} opacity={0.4} />
          <Text className="text-xs text-gray-500 ">
            Nearby • {props.address}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
