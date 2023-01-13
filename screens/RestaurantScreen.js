import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
  StarIcon,
} from "react-native-heroicons/solid";
import { QuestionMarkCircleIcon } from "react-native-heroicons/outline";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BusketIcon";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../features/restaurantSlice";
import { darkOrchid } from "../colors/Orchid";

const RestaurantScreen = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const {
    params: {
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      shortDescription,
      dishes,
      long,
      lat,
    },
  } = useRoute();

  useEffect(() => {
    dispatch(
      setRestaurant({
        id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        shortDescription,
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
      <ScrollView>
        <View className="relative">
          <Image
            source={{
              uri: urlFor(imgUrl).url(),
            }}
            className="h-56 w-full bg-gray-300 p-4"
          />
          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute top-14 left-5 bg-gray-100 p-2 rounded-full"
          >
            <ArrowLeftIcon size={20} color="#9B26AF" />
          </TouchableOpacity>
        </View>

        <View className="bg-white">
          <View className="px-4 pt-4">
            <Text className="text-3xl font-bold">{title}</Text>
            <View className="flex-row my-1 space-x-2">
              <View className="flex-row items-center space-x-1">
                <StarIcon color="#9B26AF" opacity={0.5} size={15} />
                <Text className="text-xs text-[#9B26AF]">
                  <Text className="text-[#9B26AF]">{rating}</Text> · {genre}
                </Text>
              </View>

              <View className="flex-row items-center space-x-1">
                <MapPinIcon color="gray" opacity={0.4} size={15} />
                <Text className="text-xs text-gray-500">
                  Nearby · {address}
                </Text>
              </View>
            </View>

            <Text className="text-gray-500 mt-2 pb-4">{shortDescription}</Text>
          </View>
          <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-50">
            <QuestionMarkCircleIcon color="gray" opacity={0.6} size={18} />
            <Text className="pl-2 flex-1 text-sm font-bold">
              Have a food allergy?
            </Text>
            <ChevronRightIcon color="#9B26AF" />
          </TouchableOpacity>
        </View>

        <View className="pb-36">
          <Text className="px-4 pt-6 mb-3 font-bold text-xl">Menu</Text>

          {/* Dishrows */}
          {dishes?.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.short_description}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default RestaurantScreen;
