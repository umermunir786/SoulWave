import { useOrientation } from "@/services";
import { usePathname } from "expo-router";
import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LinearGradientBackground from "../linearGradientBackground";

interface ThemeColors {
  background: string;
  linearGradientBlackColor: string;
  linearGradientOrangeColor: string;
}

interface ParentWrapperProps {
  colors: ThemeColors;
  children: ReactNode;
  dontShowGradientBackground?: boolean;
  container?: any;
}

const ParentWrapper: React.FC<ParentWrapperProps> = ({
  colors,
  children,
  dontShowGradientBackground = false,
  container,
}) => {
  const insets = useSafeAreaInsets();
  const { windowWidth, windowHeight, isPortrait, wp, hp } = useOrientation();
  const styles = createStyles(
    windowWidth,
    windowHeight,
    isPortrait,
    wp,
    hp,
    colors,
    insets
  );
  const pathname = usePathname();
  // console.log("pathname", pathname);
  // const isWithOutTabsScreen =   pathname?.includes("hometab")

  return (
    <View style={[styles.mainView, container]}>
      {dontShowGradientBackground ? (
        children
      ) : (
        <LinearGradientBackground colors={colors}>
          {children}
        </LinearGradientBackground>
      )}
    </View>
  );
};

const createStyles = (
  windowWidth: number,
  windowHeight: number,
  isPortrait: boolean,
  wp: (value: number) => number,
  hp: (value: number) => number,
  colors: ThemeColors,
  insets: any
) =>
  StyleSheet.create({
    mainView: {
      flex: 1,
    },
  });

export default ParentWrapper;
