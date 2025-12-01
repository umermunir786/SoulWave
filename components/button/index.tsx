import { FontFamily } from "@/constants/Fonts";
import { useOrientation } from "@/services";
import * as Haptics from "expo-haptics";
import React, { ReactNode } from "react";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";

interface ButtonProps {
  colors: {
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
  };
  changeMainContainerStyle?: ViewStyle;
  lablelStyle?: TextStyle;
  disable?: boolean;
  showBorder?: boolean;
  isLoading?: boolean;
  changeContainerStyle?: ViewStyle;
  onPress?: () => void;
  themeColor?: string;
  children: ReactNode;
  type?: "default" | "delete";
  absolutePosition?: boolean;
  transparentWithJustBorder?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  colors,
  changeMainContainerStyle,
  lablelStyle,
  disable = false,
  showBorder,
  isLoading = false,
  changeContainerStyle,
  onPress,
  themeColor,
  children,
  type = "default",
  absolutePosition = false,
  transparentWithJustBorder = false,
}) => {
  const { windowWidth, windowHeight, isPortrait, wp, hp } = useOrientation();
  const styles = createStyles(
    // colors,
    windowWidth,
    windowHeight,
    isPortrait,
    wp,
    hp
  );

  const handlePress = () => {
    if (Platform.OS != "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    if (onPress) {
      onPress();
    }
  };

  return (
    <View
      style={[
        absolutePosition ? styles.position : {},
        styles.mainContainer,
        changeMainContainerStyle,
        {
          paddingBottom: isPortrait ? wp(10) : hp(10),
          paddingTop: isPortrait ? wp(4) : hp(4),
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={isLoading ? true : disable}
        style={[
          styles.container,
          {
            backgroundColor: disable
              ? colors.icon
              : transparentWithJustBorder
              ? colors.transparent
              : type === "delete"
              ? colors.redColor
              : colors.primary,
            borderWidth: showBorder ? (isPortrait ? wp(0.5) : hp(0.5)) : 0,
            borderColor: colors.primary,
          },
          changeContainerStyle,
        ]}
        onPress={handlePress}
      >
        <Text
          style={[
            styles.label,
            {
              color: transparentWithJustBorder ? colors.text : colors.white,
            },
            lablelStyle,
          ]}
        >
          {isLoading ? (
            <ActivityIndicator color={"white"} size={"small"} />
          ) : (
            children
          )}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (
  windowWidth: number,
  windowHeight: number,
  isPortrait: boolean,
  wp: any,
  hp: any
) =>
  StyleSheet.create({
    mainContainer: {
      // width: "100%",
      marginHorizontal: isPortrait ? wp(6) : hp(6),
    },
    position: {
      position: "absolute",
      bottom: 0,
    },
    container: {
      width: "100%",
      height: isPortrait ? wp(14) : hp(14),
      alignItems: "center",
      alignSelf: "center",
      flexDirection: "row",
      justifyContent: "center",
      borderRadius: isPortrait ? wp(7) : hp(7),
    },
    label: {
      fontFamily: FontFamily.appSemiBold,
      fontSize: responsiveFontSize(1.8),
      // lineHeight: wp(28),
    },
  });

export default Button;
