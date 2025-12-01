import {
  Button,
  FlashAlert,
  Header,
  InputField,
  MainWrapper,
  ParentWrapper,
} from "@/components";
import { FontFamily } from "@/constants/Fonts";
import { api, WEB_CLIENT_ID } from "@/network/Environment";
import { callApi, Method } from "@/network/NetworkManger";
import {
  appImages,
  handleApple,
  handleEmailCheck,
  handleGoogleLogin,
  handleNameCheck,
  handleSimplePasswordCheck,
  useOrientation,
  useTheme,
} from "@/services";
import { setLogin, setToken, setUser } from "@/store/reducers/userDataSlice";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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
  email?: string;
  name?: string;
  password?: string;
}
interface UserDataState {
  device: string;
}

interface RootState {
  userData: UserDataState;
  // other slices...
}
const signUp = () => {
  const { windowWidth, windowHeight, isPortrait, wp, hp } = useOrientation();
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { bottom } = useSafeAreaInsets();
  const { device } = useSelector((state: RootState) => state.userData);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    GoogleSignin?.configure({
      webClientId: WEB_CLIENT_ID,
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  }, []);

  const handleSignIN = async (): Promise<void> => {
    Keyboard.dismiss();

    if (!handleNameCheck(name, errors, setErrors, true)) return;
    if (!handleEmailCheck(email, errors, setErrors, true)) return;
    if (!handleSimplePasswordCheck(password, errors, setErrors, true)) return;

    try {
      setIsLoading(true);
      const body = {
        name: name,
        email: email.toLowerCase(),
        password: password,
        device: {
          deviceToken: "123456",
          id: "123456",
        },
      };
      const onSuccess = (res: any) => {
        console.log('res-----===----??>>>-------------[{()}]', res)
        setIsLoading(false);
        dispatch(setUser(res?.data?.user));
        dispatch(
          setToken({
            token: res?.data?.token,
            refreshToken: res?.data?.refreshToken,
          })
        );
        FlashAlert({
          type: "S",
          title: "Sign-Up Successful - OTP has been sent to your email",
          description: "Welcome to SoulWave!",
        });
        router.navigate({
          pathname: "/auth/OTP",
          params: { flow: "signUp", email: email.toLowerCase() },
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
      const endPoint = api.signup;
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

  const handleAppleSignUpAPI = async (
    appleSignData: any,
    signInMethod: string
  ) => {
    try {
      const body = {
        email: appleSignData.email,
        name: appleSignData?.name,
        device: {
          deviceToken: "123456",
          id: "123456",
        },
      };
      const onSuccess = (res: any) => {
        FlashAlert({
          type: "S",
          title:
            signInMethod === "Apple"
              ? "Apple Sign-Up Successful"
              : "Google Sign-Up Successful",
          description: "Welcome to SoulWave!",
        });
        dispatch(setUser(res?.data?.user));
        dispatch(
          setToken({
            token: res?.data?.token,
            refreshToken: res?.data?.refreshToken,
          })
        );
        if (res?.data?.user?.profileCompleted === "2") {
          dispatch(setLogin(true));
          router.replace({
            pathname: "/(tabs)/HomeTab/Home",
            params: { flow: "signIn" },
          });
        } else {
          router.replace({
            pathname: "/auth/Profile",
            params: { flow: "signIn" },
          });
        }
      };
      const onError = (error: any) => {
        console.log("error===>>>>>>>", error);
        FlashAlert({
          type: "E",
          title: "Error",
          description: error?.message ?? "Something went wrong",
        });
      };
      const endPoint = api.socialLogin;
      const method = Method.POST;

      callApi(method, endPoint, body, onSuccess, onError);
    } catch (error) {
      console.log("Error during apple sign in:", error);
    }
  };

  const socialLogin = [
    ...(Platform.OS === "ios"
      ? [
        {
          id: 0,
          icon: appImages.apple,
          onPress: async () => {
            //@ts-ignore
            const { userDataOutput, decodedToken } = await handleApple();
            if (userDataOutput) {
              try {
                await handleAppleSignUpAPI(decodedToken, "Apple");
              } catch (err) {
                console.log("Sign-up failed:", err);
              }
            }
          },
        },
      ]
      : []),
    {
      id: 2,
      icon: appImages.google,
      onPress: async () => {
        const response = await handleGoogleLogin();
        console.log("response--------<?>", response?.data?.user);
        if (response?.data?.user) {
          try {
            await handleAppleSignUpAPI(response?.data?.user, "Google");
          } catch (err) {
            console.log("Sign-up failed:", err);
          }
        }
      },
    },
    // Only include Apple sign-in if not on Android
  ];
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
      <MainWrapper colors={colors}>
        <View style={styles.wrapper}>
          <View style={styles.contentWrapper}>
            <Text style={styles.heading}>Sign Up</Text>
            <Text style={styles.description}>
              {
                "Join SoulWave and begin your journey to inner\npeace and emotional clarity."
              }
            </Text>
            <View style={styles.spaceBeweenInputs}>
              <InputField
                colors={colors}
                value={name}
                placeholder="Name"
                keyboardType="default"
                onChangeText={(text) => {
                  setName(text);
                  handleNameCheck(text, errors, setErrors);
                }}
                errorText={errors?.name}
              />
              <InputField
                colors={colors}
                value={email}
                placeholder="Email address"
                keyboardType="default"
                onChangeText={(text) => {
                  setEmail(text);
                  handleEmailCheck(text, errors, setErrors);
                }}
                errorText={errors?.email}
              />
              <InputField
                colors={colors}
                value={password}
                rightEyeIcon={true}
                showPassword={showPassword}
                hideValue={!showPassword}
                onPressEyeIcon={() => setShowPassword(!showPassword)}
                placeholder="Password"
                keyboardType="default"
                onChangeText={(text) => {
                  setPassword(text);
                  handleSimplePasswordCheck(text, errors, setErrors);
                }}
                errorText={errors?.password}
              />
            </View>
          </View>

          <Button
            isLoading={isLoading}
            disable={isLoading}
            colors={colors}
            onPress={handleSignIN}
            changeMainContainerStyle={{
              marginHorizontal: isPortrait ? wp(2) : hp(2),
              marginTop: isPortrait ? wp(10) : hp(10),
            }}
          >
            {"Sign Up"}
          </Button>

          <View style={styles.orView}>
            <Image
              source={appImages.leftArrowType}
              resizeMode="contain"
              style={styles.arrowType}
            />
            <Text style={[styles.orText, { color: colors.white }]}>
              Or sign up with
            </Text>
            <Image
              source={appImages.rightArrowType}
              resizeMode="contain"
              style={styles.arrowType}
            />
          </View>

          <View style={styles.socialLogoView}>
            {socialLogin.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={item?.onPress}
                  activeOpacity={0.7}
                >
                  <Image
                    source={item?.icon}
                    resizeMode="contain"
                    style={[
                      styles.socialLogo,
                      {
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent:
                          Platform.OS == "android" ? "center" : "space-around",
                        borderRadius: 5,
                        paddingBottom: isPortrait ? wp(4) : hp(4),
                      },
                    ]}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View
          style={{
            position: "absolute",
            bottom: bottom + wp(10),
            alignSelf: "center",
          }}
        >
          <Text
            style={[
              {
                color: colors.white,
                fontFamily: FontFamily?.appRegular,
                fontSize: responsiveFontSize(1.6),
              },
            ]}
          >
            {"Already have an account? "}
            <Text
              onPress={() => router.navigate({ pathname: "/auth/SignIn" })}
              style={[
                {
                  color: colors.white,
                  fontFamily: FontFamily?.appBold,
                  fontSize: responsiveFontSize(1.6),
                },
              ]}
            >
              Sign In
            </Text>
          </Text>
        </View>
      </MainWrapper>
    </ParentWrapper>
  );
};

export default signUp;

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

    contentWrapper: {
      flex: 1,
    },
    heading: {
      fontFamily: FontFamily.appMedium,
      fontSize: responsiveFontSize(3.2),
      color: colors.white,
      marginBottom: isPortrait ? wp(3) : hp(3),
      textAlign: "center",
    },
    description: {
      fontFamily: FontFamily.appRegular,
      fontSize: responsiveFontSize(1.6),
      lineHeight: responsiveFontSize(2.4),
      color: colors.white,
      marginBottom: isPortrait ? wp(10) : hp(10),
      textAlign: "center",
    },
    spaceBeweenInputs: {
      rowGap: isPortrait ? wp(4) : hp(4),
    },
    checkbox: {
      margin: 8,
      borderRadius: isPortrait ? wp(4) : hp(4),
    },
    orView: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      columnGap: isPortrait ? wp(1) : hp(1),
      paddingBottom: isPortrait ? wp(4) : hp(4),
    },
    orText: {
      fontFamily: FontFamily.appMedium,
      fontSize: responsiveFontSize(1.4),
      // lineHeight: isPortrait ? wp(4) : hp(4),
    },
    arrowType: {
      height: isPortrait ? wp(0.8) : hp(0.8),
      width: isPortrait ? wp(28) : hp(28),
      //  paddingHorizontal:isPortrait ? wp(8) : hp(8),
    },
    socialLogoView: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",

      paddingBottom: isPortrait ? wp(10) : hp(10),
    },
    socialLogo: {
      width: isPortrait ? wp(14.1) : hp(14.1),
      height: isPortrait ? wp(15.5) : hp(15.5),
      marginHorizontal: isPortrait ? wp(2) : hp(2),
    },
  });
