import { MainWrapper, ParentWrapper } from "@/components";
import { FontFamily } from "@/constants/Fonts";
import { appImages, useOrientation, useTheme } from "@/services";
import { setOnboarding } from "@/store/reducers/userDataSlice";
import { ImageBackground } from "expo-image";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  BackHandler,
  FlatList,
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { useDispatch } from "react-redux";

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
}

interface OnboardingItem {
  id: number;
  titleParts: string;
  subheading: string;
  image: ImageSourcePropType;
}

interface OnboardingItem {
  id: number;
  titleParts: string;
  subheading: string;
  image: ImageSourcePropType;
}

const onboardingArray: OnboardingItem[] = [
  {
    id: 0,
    titleParts: "Find Your Calm",

    subheading:
      "Discover guided meditations and relaxing\nmusic designed to help you unwind and\nreconnect.",
    image: appImages.onboarding1,
  },
  {
    id: 1,
    titleParts: "Track Your Progress",
    subheading:
      "See your journey with mood tracking, streaks,\nand achievements to keep you\nmotivated.",
    image: appImages.onboarding2,
  },
  {
    id: 2,
    titleParts: "Personalize Your Experience",
    subheading:
      "Choose what you’d like to focus on and\ncreate a wellness journey tailored just for\nyou.",
    image: appImages.onboarding3,
  },
];

const OnBoarding = () => {
  const { windowWidth, windowHeight, isPortrait, wp, hp } = useOrientation();
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const styles = createStyles(
    colors,
    windowWidth,
    windowHeight,
    isPortrait,
    wp,
    hp
  );
  const [indicator, setIndicator] = useState<number>(0);
  const listRef = useRef<FlatList<OnboardingItem> | null>(null);

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        Alert.alert("Confirm Exit", "Do you want to exit?", [
          {
            text: "Cancel",
            onPress: () => {},
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => BackHandler.exitApp(),
          },
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
    }, [indicator])
  );

  const handleNextButton = () => {
    if (indicator < onboardingArray.length - 1) {
      setIndicator((prev) => prev + 1);
      listRef.current?.scrollToIndex({
        animated: true,
        index: indicator + 1,
        viewPosition: 0.5,
      });
    } else {
      //  dispatch(userSurveySave(true));
      router.replace({ pathname: "/auth/SignIn" });
    }
  };

  const onScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const currentIndex = Math.round(contentOffset.x / windowWidth);
    setIndicator(currentIndex);
  };
  useEffect(() => {
    dispatch(setOnboarding(true));
    // registerForPushNotificationsAsync();
  }, []);

  return (
    <ParentWrapper colors={colors}>
      <MainWrapper
        colors={colors}
        onButtonPress={handleNextButton}
        showButton={true}
        buttonTitle={
          indicator !== onboardingArray.length - 1 ? "Next" : "Get Started"
        }
        pagination={onboardingArray.length}
        indicator={indicator}
      >
        <FlatList
          ref={listRef}
          horizontal
          pagingEnabled
          data={onboardingArray}
          keyExtractor={(item) => item.id.toString()}
          scrollEventThrottle={16}
          onMomentumScrollEnd={onScrollEnd}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View
              style={{
                width: windowWidth,
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                marginTop: wp(5),
              }}
            >
              <Text style={styles.heading}>{item.titleParts}</Text>
              <Text style={styles.subheading}>{item.subheading}</Text>
              <ImageBackground
                source={item.image}
                // resizeMode="cover"
                contentFit="contain"
                // resizeMode="contain"
                style={[styles.imageBackgroundStyle]}
              ></ImageBackground>
            </View>
          )}
        />
      </MainWrapper>
    </ParentWrapper>
  );
};

const createStyles = (
  colors: ThemeColors,
  windowWidth: number,
  windowHeight: number,
  isPortrait: boolean,
  wp: (percentage: number) => number,
  hp: (percentage: number) => number
) =>
  StyleSheet.create({
    imageBackgroundStyle: {
      width: isPortrait ? wp(90) : hp(90),
      height: isPortrait ? wp(90) : hp(90),
    },

    heading: {
      textAlign: "center",
      fontSize: responsiveFontSize(2.8),
      fontFamily: FontFamily.appMedium,
      color: colors.white,
      marginBottom: isPortrait ? wp(6) : hp(6),
      paddingHorizontal: isPortrait ? wp(4) : hp(4),
    },

    subheading: {
      textAlign: "center",
      fontSize: responsiveFontSize(1.8),
      fontFamily: FontFamily.appRegular,
      color: colors.white,
      marginBottom: isPortrait ? wp(5) : hp(5),
      lineHeight: responsiveFontSize(2.7),
      paddingHorizontal: isPortrait ? wp(4) : hp(4),
    },
  });

export default OnBoarding;
