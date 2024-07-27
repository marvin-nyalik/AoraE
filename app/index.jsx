import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../constants/images";
import CustomButton from "../components/CustomButton";
import { Redirect, router } from "expo-router";
import { useGlobalContext } from "../context/GlobalContext";

export default function App() {
  const {isLoggedIn, isLoading} = useGlobalContext();
  if(!isLoading && isLoggedIn) return <Redirect href='/home'/>
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full h-screen justify-center items-center px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="w-full h-[300px] max-w-[380px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-white text-3xl font-bold text-center">
              Discover Endless Possibilities with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
          </View>

          <Image
            source={images.path}
            className="absolute-bottom-2 w-[136px] h-[15px]"
            resizeMode="contain"
          />
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where creativity meets innovation: Embark on a journey of limitless
            exploration
          </Text>

          <CustomButton
            title="Continue with Email"
            handlePress={() => { router.push('/signin')}}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light"/>
    </SafeAreaView>
  )
}
