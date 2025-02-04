import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "../../components/EmptyState";
import { SignOut } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { router } from "expo-router";
import { useGlobalContext } from "../../context/GlobalContext";
import { getUserPosts } from "../../lib/appwrite";
import { icons } from "../../constants";
import InfoBox from "../../components/InfoBox";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const logout = async () => {
    await SignOut();
    setUser(null)
    setIsLoggedIn(false)

    router.replace('/signin')
  };

  const { data: posts, refetch } = useAppwrite(() => getUserPosts(user.$id));

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mb-12 mt-6 px-4">
            <TouchableOpacity
              className="w-full items-end mb-10"
              onPress={logout}
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>

            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMethod="cover"
              />
            </View>
            <InfoBox
              title={user?.username}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />

            <View className="mt-5 flex-row">
            <InfoBox
              title={posts.length || 0}
              subtitle='Posts'
              containerStyles="mr-10"
              titleStyles="text-xl"
            />
            <InfoBox
              title='1.2k'
              subtitle='Followers'
              titleStyles="text-xl"
            />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
