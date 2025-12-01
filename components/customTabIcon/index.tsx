import { Image } from "expo-image";
import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

// Define your custom icons here
const CUSTOM_ICONS: Record<string, any> = {
  home: require("../../assets/images/homeTabIcon.png"),
  alerts: require("@/assets/images/alertsTabIcon.png"),
  news: require("@/assets/images/newsTabIcon.png"),
  settings: require("@/assets/images/settingsTabIcon.png"),
};

export type CustomIconName = keyof typeof CUSTOM_ICONS;

/**
 * A standalone component for rendering custom image icons using expo-image.
 */
export function CustomIcon({
  name,
  size = 2,
  color, // Optional: Apply tintColor
  style,
}: {
  name: CustomIconName;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[{ width: size, height: size }, style]}>
      <Image
        tintColor={"white"}
        source={CUSTOM_ICONS[name]}
        style={{ width: size, height: size, tintColor: color }} // Supports color tinting
        contentFit="contain"
        transition={200} // Smooth transition effect
      />
    </View>
  );
}
