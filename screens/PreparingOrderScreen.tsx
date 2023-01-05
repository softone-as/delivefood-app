import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type preparingOrderScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  "PreparingOrder"
>;

const PreparingOrderScreen = () => {
  const navigation = useNavigation<preparingOrderScreenProp>();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 4000);
  }, []);

  return (
    <SafeAreaView className="bg-[#FFC529] flex-1 justify-center items-center">
      <Animatable.Image
        source={require("../assets/preparing-order.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="w-96 h-96"
      />

      <Animatable.Text
        animation="slideInUp"
        iterationCount={2}
        className="text-lg my-10 text-white font-bold text-center"
      >
        Waiting for restaurant to accept your order
      </Animatable.Text>

      <Progress.Circle size={60} indeterminate color="white" />
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;
