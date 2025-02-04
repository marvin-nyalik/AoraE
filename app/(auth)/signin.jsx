import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constants/images";
import FormField from "../../components/FormField";
import CustomButton from '../../components/CustomButton';
import { getCurrentUser, signIn } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalContext";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [isSubmitting, setisSubmitting] = useState(false)

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Invalid Login Data", "Email and Password required");
    }
    setisSubmitting(true);
    try {
      await signIn(form.email, form.password);
      // set it to global state
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);
      router.replace('/home');
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setisSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView>
        <View className="min-h-[85vh] w-full justify-center px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-semibold text-white text-2xl mt-10 font-psemibold">
            Log in to Aora
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton title='Sign In' containerStyles='mt-7' isLoading={isSubmitting} handlePress={submit}/>
          <View className='justify-center mt-4 pt-5 flex-row gap-2'>
            <Text className='text-white font-pregular text-lg'>Dont have An Account?</Text>
            <Link className='text-secondary text-lg font-psemibold' href='/signup'>Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
