import { appImages, useOrientation, useTheme } from "@/services";
import { Image } from "expo-image";
// import * as Notifications from "expo-notifications";
import { ParentWrapper } from "@/components";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { useSelector } from "react-redux";
import { FontFamily } from "../constants/Fonts";

interface ThemeColors {
  background: string;
  primaryThemeColor: string;
}

const Splash: React.FC = () => {
  const { windowWidth, windowHeight, isPortrait, wp, hp } = useOrientation();
  const { isOnboarding, login } = useSelector((state: any) => state.userData);
  const { colors } = useTheme();

  const styles = createStyles(
    colors,
    windowWidth,
    windowHeight,
    isPortrait,
    wp,
    hp
  );
  
  useEffect(() => {
    const timer = setTimeout(() => {
      isOnboarding ?
        login ?
          router.replace({ pathname: "/(tabs)/HomeTab/Home", }) :
          router.replace({ pathname: "/auth/SignIn" }) :
        router.replace({ pathname: "/OnBoarding" });
      // router.replace({ pathname: "/auth/Profile" });
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ParentWrapper colors={colors}>
      <Image
        source={appImages.splashIcon}
        contentFit="contain"
        style={styles.imageStyle}
      />
    </ParentWrapper>
  );
};

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
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      fontSize: responsiveFontSize(4),
      fontFamily: FontFamily.appBold,
      color: colors.primaryThemeColor,
    },
    imageStyle: {
      width: isPortrait ? wp(32) : hp(32),
      height: isPortrait ? wp(32) : hp(32),
      flex: 1,
      alignSelf: "center",
    },
  });

export default Splash;
