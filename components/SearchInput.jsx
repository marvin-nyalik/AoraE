import { View, TextInput, Image, Alert } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import icons from "../constants/icons";
import { router, usePathname } from "expo-router";

const SearchInput = ({
  initialQuery
}) => {
  const [query, setQuery] = useState(initialQuery || "");
  const pathname = usePathname();
  return (
    <View className="h-16 border-2 border-black-200 bg-black-100 rounded-2xl w-full focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        className="flex-1 text-white font-pregular mt-0.5 text-base"
        value={query}
        placeholder="Search a video topic"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      />
      <TouchableOpacity
        onPress={() => {
          if (!query) {
            Alert.alert(
              "Missing Search Term",
              "Add a term to search across database"
            );
          }
          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image source={icons.search} className="w-6 h-6" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
