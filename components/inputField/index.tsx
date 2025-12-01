import { FontFamily } from "@/constants/Fonts";
import { appImages, useOrientation } from "@/services";
import { Image } from "expo-image";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
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
}

type InputFieldProps = {
  onPressInputField?: () => void;
  colors: ThemeColors;
  placeholder: string;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
  hideValue?: boolean;
  multiLineStatus?: boolean;
  numberOfLinesToShow?: number;
  isEditable?: boolean;
  textAlign?: "auto" | "top" | "bottom" | "center";
  value: string;
  onChangeText: (text: string) => void;
  changeInputStyle?: object;
  title?: string;
  leftIcon?: any;
  rightEyeIcon?: any;
  onPressEyeIcon?: () => void;
  errorText?: string;
  showPassword?: boolean;
  changeContainer?: object;
  onFocus?: () => void;
  onBlur?: () => void;
  changeMainContainer?: object;
  maxLength?: number;
  secondTypeInput?: boolean;
  rightIcon?: any;
};

const InputField: React.FC<InputFieldProps> = ({
  onPressInputField,
  colors,
  placeholder,
  keyboardType,
  hideValue,
  multiLineStatus,
  numberOfLinesToShow,
  isEditable,
  textAlign,
  value,
  onChangeText,
  changeInputStyle,
  title,
  leftIcon,
  rightEyeIcon,
  onPressEyeIcon,
  errorText,
  showPassword,
  changeContainer,
  onFocus,
  onBlur,
  changeMainContainer,
  maxLength,
  secondTypeInput,
  rightIcon,
}) => {
  const { windowWidth, windowHeight, isPortrait, wp, hp } = useOrientation();
  const styles = createStyles(windowWidth, windowHeight, isPortrait, wp, hp);

  return (
    <View style={[styles.mainContainer, changeMainContainer]}>
      {title && (
        <Text style={[styles.titleStyle, { color: colors.text }]}>{title}</Text>
      )}

      <TouchableOpacity
        activeOpacity={onPressInputField ? 0.8 : 1}
        onPress={onPressInputField}
        // style={[styles.mainContainer, changeMainContainer]}
      >
        <View
          style={[
            styles.Container,
            {
              backgroundColor: secondTypeInput ? colors.white : colors.white,
              // borderColor: secondTypeInput
              //   ? colors.background
              //   : colors.inputFieldBackground,
              ...changeContainer,
            },
          ]}
        >
          {leftIcon && (
            <Image
              source={leftIcon}
              contentFit="contain"
              style={[
                styles.leftIconStyle,
                // { tintColor: colors.placeholderTextColor }
              ]}
            />
          )}

          <TextInput
            placeholderTextColor={colors.grey}
            selectionColor={colors.black}
            secureTextEntry={hideValue}
            keyboardType={keyboardType}
            style={[
              styles.inputFieldStyle,
              { color: colors.darkGrey, ...changeInputStyle },
            ]}
            cursorColor={colors.darkGrey}
            multiline={multiLineStatus}
            numberOfLines={numberOfLinesToShow}
            placeholder={placeholder}
            onChangeText={onChangeText}
            value={value}
            editable={isEditable}
            textAlignVertical={textAlign}
            onFocus={onFocus}
            onBlur={onBlur}
            maxLength={maxLength}
          />

          {rightIcon && (
            <Image
              source={rightIcon}
              contentFit="contain"
              style={[styles.rightIconStyle]}
            />
          )}

          {rightEyeIcon && (
            <TouchableOpacity activeOpacity={0.8} onPress={onPressEyeIcon}>
              <Image
                source={
                  showPassword
                    ? appImages.hideEyeRightIcon
                    : appImages.eyeRightIcon
                }
                contentFit="contain"
                style={[
                  styles.rightIconStyle,
                  { tintColor: colors.placeholderTextColor },
                ]}
              />
            </TouchableOpacity>
          )}
        </View>

        {errorText && (
          <View style={styles.pt5}>
            <Text style={[styles.errorText, { color: colors.redColor }]}>
              {errorText}
            </Text>
          </View>
        )}
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
      paddingBottom: 0,
      // marginHorizontal: isPortrait ? wp(5) : hp(5),
      // rowGap: wp(5),
    },
    Container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      columnGap: isPortrait ? wp(2) : hp(2),
      borderRadius: isPortrait ? wp(3) : hp(3),
      textAlign: "center",
      paddingHorizontal: isPortrait ? wp(4) : hp(4),

      width: "100%",

      // borderWidth: isPortrait ? wp(0.3) : hp(0.3),
    },
    inputFieldStyle: {
      width: "100%",
      flex: 1,
      fontFamily: FontFamily.appRegular,
      fontSize: responsiveFontSize(2),
      height: isPortrait ? wp(13) : hp(13),
    },
    leftIconStyle: {
      width: isPortrait ? wp(6) : hp(6),
      height: isPortrait ? wp(6) : hp(6),
    },
    rightIconStyle: {
      width: isPortrait ? wp(6) : hp(6),
      height: isPortrait ? wp(6) : hp(6),
    },
    filterIconStyle: {
      width: isPortrait ? wp(6) : hp(6),
      height: isPortrait ? wp(6) : hp(6),
    },
    calenderIconStyle: {
      width: isPortrait ? wp(6) : hp(6),
      height: isPortrait ? wp(6) : hp(6),
    },
    titleStyle: {
      fontFamily: FontFamily.appRegular,
      fontSize: responsiveFontSize(2),
      marginBottom: isPortrait ? wp(2.5) : hp(2.5),
      // lineHeight: wp(4),
    },
    pt5: {
      paddingTop: isPortrait ? wp(2) : hp(2),
    },
    errorText: {
      fontSize: responsiveFontSize(1.6),
      fontFamily: FontFamily.appRegular,
      // paddingHorizontal: wp(5),
    },
  });

export default InputField;
