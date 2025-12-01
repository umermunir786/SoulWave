import {
  FlashAlert,
  Header,
  InputField,
  MainWrapper,
  ParentWrapper,
} from "@/components";
import { FontFamily } from "@/constants/Fonts";
import { api } from "@/network/Environment";
import { callApi, Method } from "@/network/NetworkManger";
import {
  handleConfirmPasswordCheck,
  handleSimplePasswordCheck,
  useOrientation,
  useTheme,
} from "@/services";
import { router } from "expo-router";
import React, { useState } from "react";
import { Keyboard, StyleSheet, View } from "react-native";
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

interface Errors {
  password?: string;
  confirmPassword?: string;
}

interface UserDataState {
  device: string;
}

interface RootState {
  userData: UserDataState;
  // other slices...
}

const changePassword = () => {
  const { colors } = useTheme();
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { windowWidth, windowHeight, isPortrait, wp, hp } = useOrientation();
  const [showCurrentPassword, setShowCurrentPassword] =
    useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePasswordChange = async (): Promise<void> => {
    Keyboard.dismiss();
    if (!handleSimplePasswordCheck(password, errors, setErrors, true)) return;

    if (
      !handleConfirmPasswordCheck(
        confirmPassword,
        errors,
        setErrors,
        true,
        password
      )
    )
      return;
    try {
      setIsLoading(true);
      const body = {
        currentPassword: currentPassword,
        password: password,
      };
      const onSuccess = (res: any) => {
        setIsLoading(false);
        FlashAlert({
          title: "Password Updated",
          type: "I",
        });
        console.log("res-------", res);
        router.back();
      };
      const onError = (error: any) => {
        setIsLoading(false);
        FlashAlert({
          title: "Error",
          description: error.message,
          type: "E",
        });
        console.log("error------------------", error);
      };
      const endPoint = api.updatePassword;
      const method = Method.PATCH;

      callApi(method, endPoint, body, onSuccess, onError);
    } catch (error) {
      setIsLoading(false);
      console.log("something went wrong", error);
    }
  };

  const styles = createStyles(
    colors,
    windowWidth,
    windowHeight,
    isPortrait,
    wp,
    hp
  );

  return (
    <ParentWrapper colors={colors}>
      <Header
        hideHeader={false}
        inVisibleHeader={false}
        centerTitle={"Change Password"}
        colors={colors}
        statusBarColor={colors.transparent}
        barStyleWhiteColor={true}
        leftSideIcons={true}
        backIcon={true}
        extraMarginAtTop={true}
      />
      <MainWrapper
        showButton
        buttonTitle="Update Password"
        onButtonPress={() => {
          handlePasswordChange();
        }}
        isLoading={isLoading}
        disableButton={isLoading}
        colors={colors}
      >
        <View
          style={{
            marginHorizontal: wp(5),
            marginBottom: wp(35),
            marginTop: wp(6),
          }}
        >
          <View style={styles.spaceBeweenInputs}>
            <InputField
              colors={colors}
              title={"Current Password"}
              value={currentPassword}
              //   leftIcon={appImages.passwordIcon}
              placeholder="*******"
              keyboardType="default"
              onChangeText={(text) => {
                setCurrentPassword(text);
                handleSimplePasswordCheck(text, errors, setErrors, false);
              }}
              rightEyeIcon={true}
              showPassword={showCurrentPassword}
              hideValue={!showCurrentPassword}
              onPressEyeIcon={() =>
                setShowCurrentPassword(!showCurrentPassword)
              }
              errorText={errors?.password}
            />
            <InputField
              colors={colors}
              title={"New Password"}
              value={password}
              //   leftIcon={appImages.passwordIcon}
              placeholder="*******"
              keyboardType="default"
              onChangeText={(text) => {
                setPassword(text);
                handleSimplePasswordCheck(text, errors, setErrors, false);
              }}
              rightEyeIcon={true}
              showPassword={showPassword}
              hideValue={!showPassword}
              onPressEyeIcon={() => setShowPassword(!showPassword)}
              errorText={errors?.password}
            />

            <InputField
              colors={colors}
              title={"Confirm Password"}
              value={confirmPassword}
              //   leftIcon={appImages.passwordIcon}
              placeholder={"*******"}
              keyboardType={"default"}
              onChangeText={(text) => {
                setConfirmPassword(text);
                handleConfirmPasswordCheck(
                  text,
                  errors,
                  setErrors,
                  false,
                  password
                );
              }}
              showPassword={showConfirmPassword}
              hideValue={!showConfirmPassword}
              rightEyeIcon={true}
              onPressEyeIcon={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              errorText={errors?.confirmPassword}
            />
          </View>
        </View>
      </MainWrapper>
    </ParentWrapper>
  );
};

export default changePassword;

const createStyles = (
  colors: ThemeColors,
  windowWidth: number,
  windowHeight: number,
  isPortrait: boolean,
  wp: (percentage: number) => number,
  hp: (percentage: number) => number
) =>
  StyleSheet.create({
    wrapper: {
      // flexGrow:1,
      marginHorizontal: isPortrait ? wp(4) : hp(4),
      marginTop: isPortrait ? wp(18) : hp(18),
    },
    cardGradient: {
      borderRadius: isPortrait ? wp(5) : hp(5),
      overflow: "hidden",
      paddingVertical: isPortrait ? wp(8) : hp(8),
      paddingHorizontal: isPortrait ? wp(5) : hp(5),

      // borderColor: colors.text,
      // borderWidth: 0.08,
    },
    heading: {
      fontFamily: FontFamily.appMedium,
      fontSize: responsiveFontSize(3.2),
      color: colors.text,
      marginBottom: isPortrait ? wp(3) : hp(3),
      alignSelf: "center",
    },
    description: {
      fontFamily: FontFamily.appRegular,
      fontSize: responsiveFontSize(1.6),
      color: colors.text,
      marginBottom: isPortrait ? wp(5) : hp(5),
      textAlign: "center",
    },
    spaceBeweenInputs: {
      rowGap: isPortrait ? wp(4) : hp(4),
      marginTop: isPortrait ? wp(8) : hp(8),
    },
  });
