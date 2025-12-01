import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const CustomDrawerContent = () => {
  return (
    <View>
      <Text>Okay</Text>
      <Link href={"/appFlow/(commonScreensOutSide)/workOut"}>Hello</Link>
    </View>
  );
};

export default CustomDrawerContent;