import { FontFamily } from "@/constants/Fonts";
import { appImages, useOrientation } from "@/services";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";

interface ThemeColors {
  background: string;
  backgroundInverse: string;
  primaryThemeColor: string;
  secondaryThemeColor: string;
  linearGradientOrangeColor: string;
  linearGradientBlackColor: string;
  text: string;
  textGrey: string;
  redColor: string;
  transparent: string;
  disabled: string;
  onBoardingButton: string;
  inputFieldBackground: string;
  placeholderTextColor: string;
  graphBackground: string;
  darkBlue: string;
}

interface PromoBannerProps {
  colors: ThemeColors;
}

const PromoBannerWithLayeredCircles: React.FC<PromoBannerProps> = ({
  colors,
}) => {
  const { isPortrait, windowWidth, windowHeight, wp, hp } = useOrientation();
  const styles = createStyles(
    colors,
    windowWidth,
    windowHeight,
    isPortrait,
    wp,
    hp
  );

  return (
    <LinearGradient
      colors={["rgba(0, 23, 45, 1)", "rgb(15, 14, 14)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.row}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Get <Text style={styles.bold}>10% off</Text> Circle AlarmBox{"\n"}
            when ordered through the{"\n"}
            app by <Text style={styles.highlight}>30 April</Text>
          </Text>
          <TouchableOpacity style={styles.button} activeOpacity={0.8}>
            <Text style={styles.buttonText}>Get Now</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.circleWrapper}>
          <View style={styles.outerCircle}>
            <View style={styles.innerCircle}>
              <Image
                source={appImages.alarmbox}
                style={styles.product}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const createStyles = (
  colors: ThemeColors,
  windowWidth: number,
  windowHeight: number,
  isPortrait: boolean,
  wp: (val: number) => number,
  hp: (val: number) => number
) =>
  StyleSheet.create({
    container: {
      borderRadius: isPortrait ? wp(5) : hp(5),
      padding: isPortrait ? wp(4) : hp(4),
      marginHorizontal: isPortrait ? wp(5) : hp(5),
      marginTop: isPortrait ? wp(1) : hp(1),
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
    },
    textContainer: {
      flex: 1,
    },
    text: {
      fontFamily: FontFamily.appRegular,
      color: colors.text,
      fontSize: responsiveFontSize(1.9),
    },
    bold: {
      fontFamily: FontFamily.appBold,
    },
    highlight: {
      fontFamily: FontFamily.appBlack,
      fontSize: responsiveFontSize(2),
      color: colors.primaryThemeColor,
    },
    button: {
      backgroundColor: colors.darkBlue,
      paddingHorizontal: isPortrait ? wp(5) : hp(5),
      paddingVertical: isPortrait ? wp(2) : hp(2),
      borderRadius: isPortrait ? wp(6) : hp(6),
      marginTop: isPortrait ? wp(4) : hp(4),
      alignSelf: "flex-start",
    },
    buttonText: {
      fontFamily: FontFamily.appSemiBold,
      color: "white",
      fontSize: responsiveFontSize(1.8),
    },
    circleWrapper: {
      justifyContent: "center",
      alignItems: "center",
      width: isPortrait ? wp(26) : hp(26),
      height: isPortrait ? wp(26) : hp(26),
      marginLeft: wp(4),
    },
    outerCircle: {
      width: "130%",
      height: "130%",
      borderRadius: 999,
      backgroundColor: colors.onBoardingButton, // gray outer ring
      justifyContent: "center",
      alignItems: "center",
    },
    innerCircle: {
      width: "80%",
      height: "80%",
      borderRadius: 999,
      backgroundColor: "#000", // black inner ring
      justifyContent: "center",
      alignItems: "center",
    },
    product: {
      width: "90%",
      height: "90%",
    },
  });

export default PromoBannerWithLayeredCircles;
