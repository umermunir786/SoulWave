import { useTheme, wp } from "@/services";
import React from "react";
import { Animated, View } from "react-native";

const PaginationDots = ({ length, current }) => {
  // Create an animated value for each dot's width.
  const { colors } = useTheme();
  const animatedWidths = Array.from({ length }, (_, index) => {
    const width = new Animated.Value(current === index ? 20 : 10); // Set active dot width to 20
    return width;
  });

  // Update animation whenever the current index changes
  React.useEffect(() => {
    animatedWidths.forEach((width, index) => {
      Animated.timing(width, {
        toValue: current === index ? wp(10) : 10,
        duration: 250, // Duration for smooth animation
        useNativeDriver: false, // Animated width changes should not be native-driven
      }).start();
    });
  }, [current]);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: wp(5),
      }}
    >
      {Array.from({ length }, (_, index) => (
        <Animated.View
          key={index}
          style={{
            height: 10,
            width: animatedWidths[index], // Use animated width for each dot
            borderRadius: 5,
            backgroundColor: current === index ? colors.primary : colors.white,
            marginHorizontal: 5,
          }}
        />
      ))}
    </View>
  );
};

export default PaginationDots;
