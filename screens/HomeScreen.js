import { Image, TextInput, View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  UserIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import { darkOrchid } from "../colors/Orchid";
import sanityClient from "../sanity";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "featured"] {..., restaurants[]->{..., dishes[]->}}`)
      .then((data) => {
        setFeaturedCategories(data);
      })
      .catch((err) => {
        console.log("Err at Home Page:", err);
      });
  }, []);
  return (
    <SafeAreaView className="bg-white pt-5">
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image
          source={require("../images/Orchid.jpg")}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
          <Text className="font-bold text-xl">
            Current Location
            <ChevronDownIcon size={15} color={darkOrchid} />
          </Text>
        </View>

        <UserIcon size={30} color={darkOrchid} />
      </View>

      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row rounded space-x-2 flex-1 p-3">
          <MagnifyingGlassIcon color="gray" size={24} />
          <TextInput
            placeholder="Restaurants and cuisine"
            keyboardType="default"
          />
        </View>

        <AdjustmentsVerticalIcon color={darkOrchid} />
      </View>

      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        <Categories />

        {featuredCategories?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
