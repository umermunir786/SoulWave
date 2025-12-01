import { FontFamily } from "@/constants/Fonts";
import { useCallback } from "react";
import { StatusBar, StyleSheet } from "react-native";
import { showMessage } from "react-native-flash-message";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface FlashAlertProps {
  type: "S" | "E" | "I"; // Define allowed types
  title?: string;
  description?: string;
  onclick?: () => void;
  duration?: number;
  position?: "top" | "bottom"; // Add position prop
}

// Custom hook that returns a flash alert function
export const useFlashAlert = () => {
  const insets = useSafeAreaInsets();

  const showFlashAlert = useCallback(
    ({
      type,
      title = "Provide Title",
      description = type === "I" ? "" : "Provide description",
      onclick = undefined,
      duration = 3000,
      position = "top",
    }: FlashAlertProps) => {
      showMessage({
        message: title,
        description: description,
        type: type === "S" ? "success" : type === "E" ? "danger" : "info",
        onPress: onclick,
        duration: duration,
        position: position,
        textStyle: styles.descriptionStyle,
        titleStyle: styles.titleStyle,
        style: [
          position === "top"
            ? styles.containerStyleTop
            : [
                styles.containerStyleBottom,
                {
                  marginBottom: insets.bottom + 20,
                  marginHorizontal: 20,
                  borderRadius: 8,
                },
              ],
          {
            backgroundColor:
              type === "S" ? "green" : type === "E" ? "#DC3545" : "#101010CC",
          },
        ],
      });
    },
    [insets.bottom]
  );

  return showFlashAlert;
};

// Keep the original function for backward compatibility (without safe area)
export const FlashAlert = ({
  type,
  title = "Provide Title",
  description = type === "I" ? "" : "Provide description",
  onclick = undefined,
  duration = 3000,
  position = "top",
}: FlashAlertProps) => {
  showMessage({
    message: title,
    description: description,
    type: type === "S" ? "success" : type === "E" ? "danger" : "info",
    onPress: onclick,
    duration: duration,
    position: position,
    textStyle: styles.descriptionStyle,
    titleStyle: styles.titleStyle,
    style: [
      position === "top"
        ? styles.containerStyleTop
        : [
            styles.containerStyleBottom,
            { marginBottom: 30, marginHorizontal: 20 },
          ],
      {
        backgroundColor:
          type === "S" ? "green" : type === "E" ? "#DC3545" : "#101010CC",
      },
    ],
  });
};

const styles = StyleSheet.create({
  containerStyleTop: {
    marginTop: StatusBar.currentHeight,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 5,
    borderRadius: 8,
  },
  containerStyleBottom: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 5,
    borderRadius: 8,
  },
  titleStyle: {
    fontFamily: FontFamily.appRegular,
    color: "white",
    fontSize: responsiveFontSize(2),
  },
  descriptionStyle: {
    fontFamily: FontFamily.appRegular,
    color: "white",
    fontSize: responsiveFontSize(1.5),
  },
});
