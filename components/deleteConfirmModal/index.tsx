import { FontFamily } from "@/constants/Fonts";
import { useOrientation } from "@/services";
import React from "react";
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
  modalBackgroundColor: string;
}

interface DeleteConfirmModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  colors: ThemeColors;
  isLoading:boolean
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  visible,
  onCancel,
  onConfirm,
  colors,
  isLoading
}) => {
  const { windowWidth, windowHeight, isPortrait, wp, hp } = useOrientation();
  const styles = createStyles(colors, windowWidth, windowHeight, isPortrait, wp, hp);

  return (
    <Modal
      visible={visible}
      onRequestClose={onCancel}
      transparent
      animationType="fade"
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onCancel}
        style={styles.overlay}
      >
        <TouchableOpacity activeOpacity={0.8} style={styles.container}>
          <Text style={styles.title}>Delete Account</Text>
          <Text style={styles.message}>
            We’re sorry to see you go{"\n"}Are you sure you want to leave?
          </Text>

          <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.deleteBtn} activeOpacity={0.8} onPress={onConfirm}>
              <Text style={styles.deleteBtnText}>{isLoading?<ActivityIndicator size={"small"}/>:"Delete Account"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.stayBtn} activeOpacity={0.8} onPress={onCancel}>
              <Text style={styles.stayBtnText}>I'll Stay</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default DeleteConfirmModal;

const createStyles = (
  colors: ThemeColors,
  windowWidth: number,
  windowHeight: number,
  isPortrait: boolean,
  wp: (val: number) => number,
  hp: (val: number) => number
) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: colors.transparent,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: wp(2),
    },
    container: {
      backgroundColor: colors.inputFieldBackground,
      borderRadius: isPortrait ? wp(5) : hp(5),
    //   borderWidth: isPortrait ? wp(0.5) : hp(0.5),
    //   borderColor: colors.textGrey,
      paddingVertical: isPortrait ? wp(8) : hp(8),
      paddingHorizontal: isPortrait ? wp(5) : hp(5),
      alignItems: "center",
      width: "100%",
    },
    title: {
      fontSize: responsiveFontSize(2.5),
      fontFamily: FontFamily.appSemiBold,
      color: colors.text,
      marginBottom: isPortrait ? wp(4) : hp(4),
    },
    message: {
      fontSize: responsiveFontSize(2),
      fontFamily: FontFamily.appRegular,
      color: colors.text,
      textAlign: "center",
      lineHeight: wp(5),
      marginBottom: isPortrait ? wp(6) : hp(6),
    },
    buttonWrapper: {
      width: "100%",
      gap: wp(3),
    },
    deleteBtn: {
      borderWidth: 1,
      borderColor: colors.primaryThemeColor,
      borderRadius: wp(3),
      paddingVertical: wp(3),
      alignItems: "center",
    },
    deleteBtnText: {
      color: colors.text,
      fontFamily: FontFamily.appBold,
      fontSize: responsiveFontSize(2.2),
    },
    stayBtn: {
      backgroundColor: colors.primaryThemeColor,
      borderRadius: wp(3),
      paddingVertical: wp(3),
      alignItems: "center",
    },
    stayBtnText: {
      color: colors.text,
      fontFamily: FontFamily.appBold,
      fontSize: responsiveFontSize(2.2),
    },
  });
