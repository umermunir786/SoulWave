import { FontFamily } from "@/constants/Fonts";
import { appImages, useOrientation } from "@/services";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
}

interface Props {
  label: string;
  icon: string;
  onPress?: () => void;
  colors: ThemeColors;
}

const SettingOptionCard: React.FC<Props> = ({ label, icon, onPress, colors }) => {
  const { windowWidth, windowHeight, isPortrait, wp, hp } = useOrientation();
  const styles = createStyles(windowWidth, windowHeight, isPortrait, wp, hp, colors);

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={onPress}>
      <View style={styles.leftSection}>
        <Image source={icon} style={styles.icon} contentFit="contain" />
        <Text style={[styles.label,{color:label=="Delete Account"?"red":"white"}]}>{label}</Text>
      </View>
        <Image source={appImages.backArrow} style={styles.icon2} contentFit="contain" />
    </TouchableOpacity>
  );
};

export default SettingOptionCard;

export const createStyles = (
  windowWidth: number,
  windowHeight: number,
  isPortrait: boolean,
  wp: (val: number) => number,
  hp: (val: number) => number,
  colors: ThemeColors
) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: colors.inputFieldBackground,
      borderRadius: wp(3),
      padding: wp(4),
      marginBottom: wp(3),
      marginHorizontal: wp(5),
    },
    leftSection: {
      flexDirection: "row",
      alignItems: "center",
    },
    icon: {
      width: wp(6),
      height: wp(6),
      marginRight: wp(3),
      // transform: [{ rotateY: "90deg" }],
    },
    icon2: {
      width: wp(6),
      height: wp(6),
      marginRight: wp(3),
      transform: [{ rotateY: "90deg" }],
    },
    label: {
      color: colors.text,
      fontFamily: FontFamily.appMedium,
      fontSize: responsiveFontSize(1.9),
    },
  });


