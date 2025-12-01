import { wp } from "@/services";
import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Chase
} from "react-native-animated-spinkit";

const Spinner = ({ color = 'rgba(238, 130, 27, 1)', style, size = wp(10) }) => {
  return (
    <View style={[styles.container, style]}>
      <Chase color={color} size={size} animating={true} />
    </View>
  );
};

export default Spinner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
