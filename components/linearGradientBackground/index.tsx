import { useOrientation } from "@/services";
import { LinearGradient } from "expo-linear-gradient";
import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

interface ThemeColors {
  linearGradientBlackColor: string;
  linearGradientOrangeColor: string;
}
interface Props {
  colors: ThemeColors;
  children: ReactNode;
}

const LinearGradientBackground: React.FC<Props> = ({ colors, children }) => {
  const { windowWidth, windowHeight, isPortrait, wp, hp } = useOrientation();
  // const { colors } = useTheme();
  const styles = createStyles(
    colors,
    windowWidth,
    windowHeight,
    isPortrait,
    wp,
    hp
  );
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#31AAF9", "#203199"]}
        locations={[0, 0.8332]} // This maps to 0% and 83.32%
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      >
        {/* <BlurView intensity={80} tint="dark" style={StyleSheet.absoluteFill} /> */}
        {children}
      </LinearGradient>
    </View>
  );
};

export default LinearGradientBackground;

const createStyles = (
  colors: ThemeColors,
  windowWidth: number,
  windowHeight: number,
  isPortrait: boolean,
  wp: (percentage: number) => number,
  hp: (percentage: number) => number
) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
  });
