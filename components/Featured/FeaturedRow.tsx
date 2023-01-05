import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCard from "../Restaurant/RestaurantCard";
import sanityClient from "../../sanity-deliveroo-clone/sanity";

interface FeaturedRowProps {
  id: number;
  title: string;
  description: string;
}

const FeaturedRow = ({ id, title, description }: FeaturedRowProps) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
        *[_type == "featured" && _id == $id]{
          ...,
          restaurants[]-> {
            ...,
            dishes[]->,
            type -> {
              name
            }
          }
        }[0]
    `,
        { id }
      )
      .then((data) => setRestaurants(data?.restaurants));
  }, [id]);

  return (
    <View>
      <View className="flex-row mt-4 items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color={"#FFC529"} />
      </View>

      <Text className="text-xs text-gray-500 px-4">{description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {/* RestaurantsCard */}
        {restaurants?.map((restaurant: any) => (
          <RestaurantCard
            key={restaurant._id}
            id={restaurant._id}
            image={restaurant?.image}
            title={restaurant.name}
            rating={restaurant.rating}
            genre={restaurant.type?.name}
            address={restaurant.address}
            short_description={restaurant.short_description}
            dishes={restaurant.dishes}
            long={restaurant.long}
            lat={restaurant.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
