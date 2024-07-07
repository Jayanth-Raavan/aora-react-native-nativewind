import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { Login } from "../../lib/appwrite";
const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setIsSubmitting(true);

    try {
      await Login(form.email, form.password);
      // const result = await getCurrentUser();
      // setUser(result);
      setIsLogged(true);

      Alert.alert("Success", "User signed in successfully");
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full justify-center px-4 my-6 
          min-h-[83vh]
        "
        >
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text
            className="text-2xl text-white 
          text-semibold mt-7 font-psemibold
          "
          >
            Log in to Aora
          </Text>
          <FormField
            title="Email"
            value={form?.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-t"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form?.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-t"
          />
          <CustomButton
            title="Sign In"
            containerStyle="mt-7"
            isLoading={isSubmitting}
            handlePress={submit}
          />
          <View
            className="justify-center pt-5 flex-row
          gap-2"
          >
            <Text
              className="text-lg text-gray-100 
            font-pregular"
            >
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg 
            font-psemibold text-secondary"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
