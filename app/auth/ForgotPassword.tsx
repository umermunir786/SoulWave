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
import { handleEmailCheck, useOrientation, useTheme } from "@/services";
import { router } from "expo-router";
import React, { useState } from "react";
import { Keyboard, StyleSheet, Text, View } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { useSelector } from "react-redux";

interface ThemeColors {
  background: string;
  backgroundInverse: string;
  primaryThemeColor: string;
  secondaryThemeColor: string;
  linearGradientOrangeColor: string;
  linearGradientBlackColor: string;
  text: string;
  white: string;
  textGrey: string;
  redColor: string;
  transparent: string;
  disabled: string;
  onBoardingButton: string;
  inputFieldBackground: string;
  placeholderTextColor: string;
}

interface Errors {
  email?: string;
}
interface UserDataState {
  device: string;
}

interface RootState {
  userData: UserDataState;
  // other slices...
}
const ForgotPassword = () => {
  const { windowWidth, windowHeight, isPortrait, wp, hp } = useOrientation();
  const { colors } = useTheme();
  const { device } = useSelector((state: RootState) => state.userData);
  const [email, setEmail] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleForgetPassword = async (): Promise<void> => {
    Keyboard.dismiss();
    if (!handleEmailCheck(email, errors, setErrors, true)) return;

    try {
      setIsLoading(true);
      const body = {
        email: email.toLowerCase(),
        device: {
          deviceToken: "123456",
          id: "123456",
        },
      };
      const onSuccess = (res: any) => {
        console.log("res----------------->>>>>>", res);
        setIsLoading(false);
        FlashAlert({
          type: "S",
          title: "Reset OTP has been sent to your email",
          description: "Please check your email to verify your account.",
        });
        router.navigate({
          pathname: "/auth/OTP",
          params: { flow: "forgot", email: email.toLocaleLowerCase() },
        });
      };
      const onError = (error: any) => {
        console.log("error------------------", error);
        setIsLoading(false);
      };
      const endPoint = api.forgotPassword;
      const method = Method.POST;

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
        colors={colors}
        showButton={true}
        isLoading={isLoading}
        disableButton={isLoading}
        buttonTitle={"Send Code"}
        onButtonPress={handleForgetPassword}
      >
        <View style={styles.wrapper}>
          <Text style={styles.heading}>Forgot Password</Text>
          <Text style={styles.description}>
            Please enter the email associated with your account.
          </Text>
          <View style={styles.spaceBeweenInputs}>
            <InputField
              colors={colors}
              // title={"Enter Email"}
              value={email}
              // leftIcon={appImages?.apple}
              placeholder="Email address"
              keyboardType="default"
              onChangeText={(text) => {
                setEmail(text);
                handleEmailCheck(text, errors, setErrors);
              }}
              errorText={errors?.email}
            />
          </View>
          <Text
            onPress={() => {
              // router.navigate({
              //   pathname: "/auth/SignIn",
              //   params: {},
              // });
              router.back();
            }}
            style={[
              styles.remember,
              { color: colors.white, marginTop: isPortrait ? wp(4) : hp(4) },
            ]}
          >
            Remember Password?
          </Text>
        </View>
      </MainWrapper>
    </ParentWrapper>
  );
};

export default ForgotPassword;

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
      color: colors.white,
      marginBottom: isPortrait ? wp(3) : hp(3),
      alignSelf: "center",
    },
    description: {
      fontFamily: FontFamily.appRegular,
      fontSize: responsiveFontSize(1.6),
      color: colors.white,
      marginBottom: isPortrait ? wp(5) : hp(5),
      textAlign: "center",
    },
    forgotPassword: {
      fontFamily: FontFamily.appLight,
      fontSize: responsiveFontSize(1.8),
      color: colors.white,
      marginTop: isPortrait ? wp(2) : hp(2),
      alignSelf: "center",
    },
    spaceBeweenInputs: {
      rowGap: isPortrait ? wp(4) : hp(4),
    },
    remember: {
      fontFamily: FontFamily.appMedium,
      fontSize: responsiveFontSize(1.4),
      textAlign: "right",
    },
  });
