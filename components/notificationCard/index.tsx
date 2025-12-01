import { FontFamily } from "@/constants/Fonts";
import { useOrientation } from "@/services";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import ToggleSwitch from "toggle-switch-react-native";

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
  greyText2?: string;
}

interface Props {
  label: string;
  isOn: boolean;
  onToggle: (val: boolean) => void;
  colors: ThemeColors;
}

const NotificationCard: React.FC<Props> = ({
  label,
  isOn,
  onToggle,
  colors,
}) => {
  const { windowWidth, windowHeight, isPortrait, wp, hp } = useOrientation();
  const styles = createStyles(
    windowWidth,
    windowHeight,
    isPortrait,
    wp,
    hp,
    colors
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <ToggleSwitch
        isOn={isOn}
        onColor={"rgba(27, 188, 230, 1)"}
        offColor={"rgba(43, 43, 43, 1)"}
        size="medium"
        onToggle={onToggle}
      />
    </View>
  );
};

export default NotificationCard;

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
    },
    label: {
      color: colors.text,
      fontFamily: FontFamily.appRegular,
      fontSize: responsiveFontSize(2),
    },
  });
