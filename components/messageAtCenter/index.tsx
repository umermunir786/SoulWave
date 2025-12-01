import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useOrientation } from "@/services";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { Image } from "expo-image";
import { FontFamily } from "@/constants/Fonts";

interface MessageAtCenterProps {
  colors: {
    text: string;
    text2: string;
    greyText2: string;
    lineColor: string;
    primaryThemeColor: string;
  };
  imageSource: string;
  title: string;
  description?: string;
}

const MessageAtCenter: React.FC<MessageAtCenterProps> = ({ colors, imageSource, title, description }) => {
  const { windowWidth, windowHeight, isPortrait, wp, hp } = useOrientation();
  const styles = createStyles(windowWidth, windowHeight, isPortrait, wp, hp, colors);

  return (
    <View style={styles.mainView}>
      <Image source={imageSource} contentFit="contain" style={styles.imageStyle} />
      <Text style={[styles.title, { color: colors.primaryThemeColor }]}>{title}</Text>
      {/* {description && <Text style={[styles.description, { color: colors.text2 }]}>{description}</Text>} */}
    </View>
  );
};

const createStyles = (
  windowWidth: number,
  windowHeight: number,
  isPortrait: boolean,
  wp: (value: number) => number,
  hp: (value: number) => number,
  colors: { text: string; text2: string; greyText2: string; lineColor: string }
) =>
  StyleSheet.create({
    mainView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    imageStyle: {
      width: isPortrait ? wp(40) : hp(30),
      height: isPortrait ? wp(40) : hp(30),
    },
    title: {
      fontFamily: FontFamily.appBold,
      fontSize: responsiveFontSize(3),
      marginTop: isPortrait ? wp(5) : hp(5),
      marginBottom: isPortrait ? wp(5) : hp(5),
    },
    description: {
      fontFamily: FontFamily.appRegular,
      fontSize: responsiveFontSize(1.8),
    },
  });

export default MessageAtCenter;