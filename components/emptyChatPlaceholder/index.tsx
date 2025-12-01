import { FontFamily } from "@/constants/Fonts";
import { appImages, useOrientation } from "@/services";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";

interface ThemeColors {
  text: string;
  textGrey: string;
  primaryThemeColor: string;
  inputFieldBackground: string;
}

const EmptyChatPlaceholder = ({ colors }: { colors: ThemeColors }) => {
  const { isPortrait, wp, hp } = useOrientation();
  const styles = createStyles(colors, isPortrait, wp, hp);

  return (
    <View style={styles.wrapper}>
      <Image
        source={appImages.splashLogo}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.label}>Chat with Circle Assistant</Text>

      <TouchableOpacity style={styles.quickBtn} activeOpacity={0.8}>
        <Text style={styles.quickText}>Request help at my location</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.quickBtn} activeOpacity={0.8}>
        <Text style={styles.quickText}>
          There’s suspicious activity around me, please check now. I feel unsafe
          at this moment, {"\n"}need assistance urgently
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.quickBtn} activeOpacity={0.8}>
        <Text style={styles.quickText}>
          Please show crime stats for my exact location immediately. Are there
          any severe {"\n"}weather
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyChatPlaceholder;

const createStyles = (
  colors: ThemeColors,
  isPortrait: boolean,
  wp: (val: number) => number,
  hp: (val: number) => number
) =>
  StyleSheet.create({
    wrapper: {
      alignItems: "center",
      justifyContent: "center",
      paddingTop: isPortrait ? wp(8) : hp(8),
      paddingHorizontal: isPortrait ? wp(5) : hp(5),
    },
    logo: {
      width: isPortrait ? wp(40) : hp(40),
      height: isPortrait ? wp(12) : hp(12),
      marginBottom: isPortrait ? wp(2) : hp(2),
    },
    label: {
      fontFamily: FontFamily.appBold,
      fontSize: responsiveFontSize(3),
      color: colors.text,
      marginBottom: isPortrait ? wp(50) : hp(50),
    },
    quickBtn: {
      backgroundColor: colors.inputFieldBackground,
      paddingVertical: isPortrait ? wp(3) : hp(3),
      paddingHorizontal: isPortrait ? wp(4) : hp(4),
      marginBottom: isPortrait ? wp(3) : hp(3),
      borderRadius: isPortrait ? wp(2.5) : hp(2.5),
      width: "100%",
    },
    quickText: {
      fontFamily: FontFamily.appRegular,
      fontSize: responsiveFontSize(2),
      color: colors.text,
      textAlign: "center",
    },
  });
