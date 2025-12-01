import { FontFamily } from "@/constants/Fonts";
import { appImages, useOrientation } from "@/services";
import React from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
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

interface AppModalProps {
  visible: boolean;
  onClose: () => void;
  message: string;
  title: string;
  colors: ThemeColors;
}

const AppModal: React.FC<AppModalProps> = ({ visible, onClose,title, message, colors }) => {
  const { windowWidth, windowHeight, isPortrait, wp, hp } = useOrientation();
  const styles = createStyles(colors, windowWidth, windowHeight, isPortrait, wp, hp);

  return (
    <Modal 
      visible={visible} 
      onRequestClose={onClose}
      transparent 
      animationType="fade"
      >
      <TouchableOpacity activeOpacity={0.8} onPress={onClose} style={styles.overlay}>
        <View style={styles.container}>
          <Image
            source={appImages.modalTick}
            style={styles.icon}
            resizeMode="contain"
          />

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
        </View>
      </TouchableOpacity>
    </Modal>
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
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      // width: isPortrait ? wp(80) : hp(80),
      marginHorizontal: isPortrait ? wp(5) : hp(5),
      backgroundColor: colors.modalBackgroundColor,
      borderRadius: isPortrait ? wp(5) : hp(5),
      borderWidth: isPortrait ? wp(0.5) : hp(0.5),
      borderColor: colors.textGrey,
      paddingHorizontal: isPortrait ? wp(5) : hp(5),
      paddingVertical: isPortrait ? wp(8) : hp(8),
      alignItems: 'center',
      position: 'relative',
    },
    closeBtn: {
      position: 'absolute',
      top: isPortrait ? wp(4) : hp(4),
      right: isPortrait ? wp(5) : hp(5),
      zIndex: 1,
    },
    crossIcon: {
      width: isPortrait ? wp(5) : hp(5),
      height: isPortrait ? wp(5) : hp(5),
    },
    icon: {
      width: isPortrait ? wp(12) : hp(12),
      height: isPortrait ? wp(12) : hp(12),
      marginBottom: isPortrait ? wp(4) : hp(4),
    },
    title: {
      fontSize: responsiveFontSize(2.5),
      fontFamily: FontFamily.appSemiBold,
      color: colors.text,
      marginBottom: isPortrait ? wp(5) : hp(5),
    },
    message: {
      fontSize: responsiveFontSize(2),
      fontFamily: FontFamily.appRegular,
      color: colors.textGrey,
      textAlign: 'center',
    },
  });

export default AppModal;
