import { FlashAlert, Header, InputField, MainWrapper, ParentWrapper } from "@/components";
import { FontFamily } from "@/constants/Fonts";
import { api } from "@/network/Environment";
import { callApi, Method } from "@/network/NetworkManger";
import {
  handleConfirmPasswordCheck,
  handleSimplePasswordCheck,
  useOrientation,
  useTheme,
} from "@/services";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Keyboard, StyleSheet, Text, View } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { useDispatch, useSelector } from "react-redux";

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

const ResetPassword = () => {
  const { device } = useSelector((state: RootState) => state.userData);
  const { flow = "", email } = useLocalSearchParams();
  const { windowWidth, windowHeight, isPortrait, wp, hp } = useOrientation();
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const dispatch = useDispatch();
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [errors, setErrors] = useState<Errors>({});

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
    ) return;

    try {
      setIsLoading(true);
      const body = {
        email: email,
        password: password,
      };
      const onSuccess = (res: any) => {
        setIsLoading(false);
        console.log("res-------------------", res);
        FlashAlert({
          type: "S",
          title: "Success",
          description: "Password reset successfully",
        });
        router.replace("/auth/SignIn");
      };
      const onError = (error: any) => {
        setIsLoading(false);
        console.log("error------------------", error);
      };
      const endPoint = api.resetPassword;
      const method = Method.PATCH;

      callApi(method, endPoint, body, onSuccess, onError);
    } catch (error) {
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
        colors={colors}
        statusBarColor={colors.transparent}
        barStyleWhiteColor={true}
        leftSideIcons={true}
        backIcon={true}
        extraMarginAtTop={true}
      />
      <MainWrapper
        isLoading={isLoading}
        disableButton={isLoading}
        colors={colors}
        showButton={true}
        buttonTitle={"Next"}
        onButtonPress={handlePasswordChange}
      >
        <View style={styles.wrapper}>
          <Text style={styles.heading}>Reset Password</Text>
          <Text style={styles.description}>
            {`Please type something you will remember`}
          </Text>
          <View style={styles.spaceBeweenInputs}>
            <InputField
              colors={colors}
              //   title={"Create Password"}
              value={password}
              //   leftIcon={appImages.passwordIcon}
              placeholder="New Password"
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
              //   title={"Confirm Password"}
              value={confirmPassword}
              hideValue={!confirmPassword}
              rightEyeIcon={true}
              //   leftIcon={appImages.passwordIcon}
              placeholder={"Confirm New Password"}
              onPressEyeIcon={() => setConfirmPassword(!confirmPassword)}
              keyboardType={"default"}
              onChangeText={(text) => (
                setConfirmPassword(text),
                handleConfirmPasswordCheck(
                  text,
                  errors,
                  setErrors,
                  false,
                  password
                )
              )}
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

export default ResetPassword;

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
    },
  });
