import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import Currency from "react-currency-formatter";
import { selectBasketItems, selectBasketTotal } from "../features/basketSlice";
import { useNavigation } from "@react-navigation/native";

const BusketIcon = () => {
  const navigation = useNavigation();

  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);

  if (items.length === 0) return null;

  return (
    <View className="absolute bottom-10 w-full z-50">
      <TouchableOpacity
        onPress={() => navigation.navigate("Basket")}
        className="bg-[#9B26AF] mx-5 p-4 rounded-lg items-center space-x-1 flex-row"
      >
        <Text className="text-white font-extrabold text-lg bg-[#BA55D3] py-1 px-2 rounded">
          {items.length}
        </Text>
        <Text className="flex-1 text-white font-extrabold text-lg text-center">
          View Basket
        </Text>
        <Text className="text-lg text-white font-extrabold">
          <Currency quantity={basketTotal} currency="NGN" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BusketIcon;
