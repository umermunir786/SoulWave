import { FlashAlert, Header, MainWrapper, OTPComponent, ParentWrapper } from "@/components";
import { FontFamily } from "@/constants/Fonts";
import { api } from "@/network/Environment";
import { callApi, Method } from "@/network/NetworkManger";
import { handleOTPCheck, useOrientation, useTheme } from "@/services";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
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
  code?: string;
}
interface UserDataState {
  device: string;
}

interface RootState {
  userData: UserDataState;
  // other slices...
}
const OTP = () => {
  const { flow = "", email } = useLocalSearchParams();
  const { windowWidth, windowHeight, isPortrait, wp, hp } = useOrientation();
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [code, setCode] = useState<string>("");
  const [time, setTime] = useState<number>(60);
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { device } = useSelector((state: RootState) => state.userData);
  
  const handleVerifyOTp = async () => {
    Keyboard.dismiss();
    if (!handleOTPCheck(code, errors, setErrors, true)) return;

    try {
      setIsLoading(true);
      const body = {
        email: email,
        otp: code,
      };
      const onSuccess = (res: any) => {
        console.log("res-------------------", res);
        setIsLoading(false);
         FlashAlert({
          type: "S",
          title: res?.message ?? "Email verified successfully",
          description: "Welcome to SoulWave!",
        });
        router.replace({
          pathname: flow == "signUp" ? "/auth/Profile" : "/auth/ResetPassword",
          params: { flow: flow, email: email },
        });
      };
      const onError = (error: any) => {
        console.log("error------------------", error);
        setIsLoading(false);
        FlashAlert({
          type: "E",
          title: "Error",
          description: error?.message ?? "Something went wrong",
        });
      };
      const endPoint = flow == "signUp" ? api.verifyotp : api.verifyOtpResetPassword;
      const method = Method.POST;

      callApi(method, endPoint, body, onSuccess, onError);
    } catch (error) {
      console.log("something went wrong", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime == 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [time]);

  const handleResendOTp = async () => {
    try {
      setTime(60);
      setCode("");
      const body = {email: email};
      const onSuccess = (res: any) => {
        console.log("res-------------------", res);
      };
      const onError = (error: any) => {
        console.log("error------------------", error);
      };
      const endPoint = api.resendOtp;
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
        isLoading={isLoading}
        colors={colors}
        showButton={true}
        disableButton={isLoading}
        buttonTitle={"Verify"}
        onButtonPress={handleVerifyOTp}
      >
        <View style={styles.wrapper}>
          <Text style={styles.heading}>Verify Code</Text>
          <Text style={styles.description}>
            {`We’ve sent a code to ${email ?? "johndoe@gmail.com"}`}
          </Text>

          <OTPComponent
            colors={colors}
            OTP={code}
            setOTP={setCode}
            setErrors={setErrors}
            errors={errors}
          />

          <View style={styles.flexRow}>
            <Text
              onPress={() => {
                time == 0 ? handleResendOTp() : null;
              }}
              style={styles.sendAgain}
            >
              {`Send code again ${time != 0 ? "in" : ""}`}
            </Text>
            <Text style={styles.time}>
              {time == 0
                ? ``
                : time < 10
                ? `0${time} Seconds`
                : `${time} Seconds`}
            </Text>
          </View>
        </View>
      </MainWrapper>
    </ParentWrapper>
  );
};

export default OTP;

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
      marginHorizontal: isPortrait ? wp(4) : hp(4),
      marginTop: isPortrait ? wp(18) : hp(18),
    },
    cardGradient: {
      borderRadius: isPortrait ? wp(5) : hp(5),
      overflow: "hidden",
      paddingVertical: isPortrait ? wp(8) : hp(8),
      paddingHorizontal: isPortrait ? wp(5) : hp(5),
      marginHorizontal: isPortrait ? wp(6) : hp(6),
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
    flexRow: {
      flexDirection: "row",
      alignItems: "center",
      columnGap: isPortrait ? wp(2) : hp(2),
      alignSelf: "center",
    },
    sendAgain: {
      fontFamily: FontFamily.appRegular,
      fontSize: responsiveFontSize(2),
      color: colors.white,
    },
    time: {
      fontFamily: FontFamily.appBold,
      fontSize: responsiveFontSize(1.8),
      color: colors.white,
    },
  });
