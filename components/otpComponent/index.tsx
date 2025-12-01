import { FontFamily } from "@/constants/Fonts";
import { handleOTPCheck, useOrientation } from "@/services";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";
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

interface OTPComponentProps {
  colors: ThemeColors;
  OTP: string;
  setErrors?: (errors: any) => void;
  errors?: any;
  setOTP: (otp: string) => void;
  isFocused?: boolean;
}

const OTPComponent: React.FC<OTPComponentProps> = ({
  colors,
  OTP,
  setOTP,
  setErrors,
  errors,
  isFocused,
}) => {
  const { windowWidth, windowHeight, isPortrait, wp, hp } = useOrientation();
  const styles = createStyles(
    windowWidth,
    windowHeight,
    isPortrait,
    wp,
    hp,
    colors,
    errors?.otp
  );

  return (
    <View style={styles.mainView}>
      <OtpInput
        focusColor={colors.white}
        autoFocus={true}
        focusStickBlinkingDuration={500}
        numberOfDigits={4}
        placeholder="-------"
        // value={OTP}
        onTextChange={(text) => {
          handleOTPCheck(text, errors, setErrors, false);
          setOTP(text);
        }}
        onFilled={(text) => {}}
        theme={{
          containerStyle: styles.container,
          pinCodeContainerStyle: styles.pinCodeContainer,
          pinCodeTextStyle: styles.pinCodeText,
        }}
      />
      {errors?.otp && OTP != "" && (
        <Text style={styles.errorText}>{errors?.otp}</Text>
      )}
    </View>
  );
};

const createStyles = (
  windowWidth: number,
  windowHeight: number,
  isPortrait: boolean,
  wp: (value: number) => number,
  hp: (value: number) => number,
  colors: ThemeColors,
  errors?: any
) =>
  StyleSheet.create({
    mainView: {
      paddingHorizontal: isPortrait ? wp(11) : hp(11),
      paddingVertical: isPortrait ? wp(10) : hp(10),
    },
    container: {},
    pinCodeContainer: {
      borderColor:
        errors ==
        "You have put something wrong inside otp, You can just use numbers here from 0 to 9"
          ? colors.redColor
          : colors.white,
      backgroundColor: colors.transparent,
      height: isPortrait ? wp(15) : hp(15),
      width: isPortrait ? wp(15) : hp(15),
      borderRadius: isPortrait ? wp(3) : hp(3),
    },
    pinCodeText: {
      fontSize: responsiveFontSize(2),
      fontFamily: FontFamily.appRegular,
      color: colors.white,
      // lineHeight: widthPixel(24),
    },
    errorText: {
      fontSize: responsiveFontSize(1.6),
      fontFamily: FontFamily.appRegular,
      marginTop: isPortrait ? wp(8) : hp(8),
      color: colors.redColor,
      textAlign: "center",
      // paddingHorizontal: isPortrait ? wp(5) :hp(5),
    },
  });

export default OTPComponent;
