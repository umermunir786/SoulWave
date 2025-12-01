import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useOrientation} from "@/services";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { FontFamily } from "@/constants/Fonts";
import { Image } from "expo-image";
import { appImages } from "@/services";

interface ThemeColors {
  primaryThemeColor: string;
  background: string;
  border: string;
  text: string;
};

interface ChekBoxWithTitleProps {
  colors: ThemeColors;
  item?: any;
  isChecked?: boolean;
  onPressChekBox?: () => void;
  title?: string;
  applyPadding?: boolean;
}

const ChekBoxWithTitle: React.FC<ChekBoxWithTitleProps> = ({
  colors,
  item,
  isChecked,
  onPressChekBox,
  title,
  applyPadding,
}) => {
  const {windowWidth, windowHeight, isPortrait, wp, hp } = useOrientation();
  const styles = createStyles(windowWidth, windowHeight, isPortrait, wp, hp, colors);
  console.log("isChecked", isChecked);

  return (
    <TouchableOpacity
      activeOpacity={onPressChekBox ? 0.8 : 1}
      onPress={onPressChekBox}
      style={[styles.mainView, applyPadding && styles.withPadding]}
    >
      <Text style={styles.label}>{item?.text}</Text>
      <Image
        source={isChecked ? appImages.filledChekboxIcon : appImages.emptyChekbocIcon}
        contentFit="contain"
        style={styles.checkboxIcon}
      />
    </TouchableOpacity>
  );
};

const createStyles = (
  windowWidth: number,
  windowHeight: number,
  isPortrait: boolean,
  wp: (value: number) => number,
  hp: (value: number) => number,
  colors: ThemeColors,
) =>
  StyleSheet.create({
    mainView: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent:'space-between',
      marginHorizontal: isPortrait ? wp(5) : hp(5),
      paddingHorizontal: isPortrait ? wp(4) : hp(4),
      paddingVertical: isPortrait ? wp(5) : hp(5),
      borderRadius:isPortrait ? wp(5) : hp(5),
      columnGap: isPortrait ? wp(2) : hp(2),
      backgroundColor:colors.border
    },
    withPadding: {
      paddingHorizontal: isPortrait ? wp(2) : hp(2),
    },
    label: {
      fontSize: responsiveFontSize(2),
      fontFamily: FontFamily.appSemiBold,
      color: colors.text,
    },
    checkboxIcon: {
      width: isPortrait ? wp(5) : hp(5),
      height: isPortrait ? wp(5) : hp(5),
    },
  });

export default ChekBoxWithTitle;
