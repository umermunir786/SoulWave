import { FontFamily } from "@/constants/Fonts";
import { StyleSheet } from "react-native";

import { responsiveFontSize } from "react-native-responsive-dimensions";
import { wp } from "../appFontSizes";

export const globalStyles = StyleSheet.create({
  title: {
    fontFamily: FontFamily?.appSemiBold,
    fontSize: responsiveFontSize(2.4),
    color: "white",
    marginVertical: wp(4),
  },
  subtitle: {
    fontFamily: FontFamily?.appSemiBold,
    fontSize: responsiveFontSize(1.6),
    color: "white",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontFamily: FontFamily?.appSemiBold,
    fontSize: responsiveFontSize(1.8),
    color: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
