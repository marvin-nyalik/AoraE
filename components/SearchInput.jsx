import { View, Text, TextInput, Image } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import icons from "../constants/icons";

const SearchInput = ({
  title,
  value,
  placeholder,
  otherStyles,
  handleChangeText,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className="h-16 border-2 border-black-200 bg-black-100 rounded-2xl w-full focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        className="flex-1 text-white font-pregular mt-0.5 text-base"
        value={value}
        placeholder="Search a video topic"
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        secureTextEntry={title === "Password" && !showPassword}
      />
        <TouchableOpacity>
          <Image
            source={icons.search}
            className="w-6 h-6"
            resizeMode="contain"
          />
        </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
