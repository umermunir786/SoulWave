import { wp } from "@/services";
import React, { useEffect, useState } from "react";
import { Animated, StyleSheet, View, ViewStyle } from "react-native";

interface ProgressBarProps {
  duration?: number;
  progressValue?: number;
  containerStyle?: ViewStyle;
  barStyle?: ViewStyle;
}

const ProgressBar = ({
  duration = 1000,
  progressValue = 100,
  containerStyle = {},
  barStyle = {},
}: ProgressBarProps) => {
  const [progress] = useState(new Animated.Value(0));

  useEffect(() => {
    // Animate the width of the progress bar based on the progressValue
    Animated.timing(progress, {
      toValue: (progressValue * 100) / 100, // This ensures the bar width is proportional to progressValue
      duration: duration,
      useNativeDriver: false,
    }).start();
  }, [progressValue, duration]);

  return (
    <View style={[styles.container, containerStyle]}>
      <Animated.View style={[styles.bar, { width: progress }, barStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: wp(0.8),
    backgroundColor: "#4E89D3",
    borderRadius: wp(2),
    marginVertical: wp(2),
    width: wp(92),
  },
  bar: {
    height: wp(0.8),
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: wp(2),
    borderTopLeftRadius: wp(2),
  },
});

export default ProgressBar;
