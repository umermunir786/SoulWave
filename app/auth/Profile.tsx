import { FlashAlert, MainWrapper, ParentWrapper } from "@/components";
import ProgressBar from "@/components/LinearProgressBar";
import { FontFamily } from "@/constants/Fonts";
import { api } from "@/network/Environment";
import { callApi, Method } from "@/network/NetworkManger";
import { appImages, useOrientation, useTheme } from "@/services";
import { setLogin, setUser } from "@/store/reducers/userDataSlice";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DatePicker from "react-native-date-picker";
import { showMessage } from "react-native-flash-message";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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
  inputFieldBackground: string;
  placeholderTextColor: string;
}
const Profile = () => {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const { top } = useSafeAreaInsets();
  const { windowWidth, windowHeight, isPortrait, wp, hp } = useOrientation();
  const [step, setStep] = useState("0");
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [selectedNatureItem, setSelectedNatureItem] = useState<number | null>(
    null
  );
  const [experiencedItem, setSelectedExperiencedItem] = useState<number | null>(null);
  const [time, setTime] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const daysOfWeek = [
    { label: "SU", value: "sunday" },
    { label: "M", value: "monday" },
    { label: "T", value: "tuesday" },
    { label: "W", value: "wednesday" },
    { label: "TH", value: "thursday" },
    { label: "F", value: "friday" },
    { label: "S", value: "saturday" },
  ];

  const head =
    {
      "0": "Hi Maggie,",
      "1": "What brings you to SoulWave?",
      "2": "What time would you like to meditate?",
      "3": "What's your favorite background sound for meditation?",
      "4": "How experienced are you with meditation?",
    }[step] || "";

  const progress =
    {
      "0": wp(0),
      "1": wp(22),
      "2": wp(44),
      "3": wp(66),
      "4": wp(91),
    }[step] || "";

  const images = [
    { id: 0, icon: appImages.sleep, title: "Sleep better" },
    { id: 1, icon: appImages.stress, title: "Reduce Stress" },
    { id: 2, icon: appImages.focus, title: "Focus More" },
    { id: 3, icon: appImages.calm, title: "Feel Calm" },
    { id: 4, icon: appImages.yoga, title: "Build a daily mindfulness habit" },
    { id: 5, icon: appImages.anxiety, title: "Manage anxiety" },
    { id: 6, icon: appImages.emotion, title: "Emotional healing" },
    { id: 7, icon: appImages.growth, title: "Spiritual growth" },
  ];
  const nature = [
    { id: 0, icon: appImages.forest, title: "Nature sounds" },
    { id: 1, icon: appImages.sea, title: "White Noise" },
    { id: 2, icon: appImages.desert, title: "Silence" },
    { id: 3, icon: appImages.music, title: "Soft Music" },
  ];

  const experience = [
    { id: 0, icon: appImages.egg, title: "Newbie", value: "newbie" },
    { id: 1, icon: appImages.leaf, title: "Getting the hang of it", value: "getting-hang-it" },
    { id: 2, icon: appImages.flower, title: "Regular Practitioner", value: "regular-practitioner" },
  ];

  const handleButtonPress = () => {
    const nextStep = parseInt(step);
    if (nextStep >= 4) {
      if (experiencedItem) {
        handleCreateProfile();
      } else {
        showMessage({
          message: "Please select your experience level",
          type: "danger",
        });
      }
    } else {
      if (step === "0") {
        setStep((nextStep + 1).toString());
      }
      else if (step === "1" && selectedNatureItem) {
        setStep((nextStep + 1).toString());
      } else if (step === "2" && date && selectedDays.length > 0) {
        setStep((nextStep + 1).toString());
      } else if (step === "3" && selectedItem) {
        setStep((nextStep + 1).toString());
      } else {
        if (step === "1" || step === "2") {
          FlashAlert({
            type: "E",
            title: "Error",
            description: step === "1" ? "Please select a nature sound" : "Please select a days",
          });
        } else if (step === "3") {
          FlashAlert({
            type: "E",
            title: "Error",
            description: "Please select a background type",
          });
        }
      }
    }
  };

  const handleCreateProfile = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const body = {
        profileCompleted: 2,
        thingsTakeCloser: [selectedNatureItem],
        favBackgroundSound: selectedItem,
        meditationExperience: experiencedItem,
        timeToMeditate: date,
        weekDaysToMediate: selectedDays,
      };
      const onSuccess = (res: any) => {
        console.log("res----------------->>>>>>", res);
        setIsLoading(false);
        dispatch(setUser(res?.data?.user));
        dispatch(setLogin(true));
        router.replace({
          pathname: "/(tabs)/HomeTab/Home",
          params: { flow: "profile" },
        });
        FlashAlert({
          type: "S",
          title: "Profile Created Successfully",
          description: "Welcome to SoulWave!",
        });
      };
      const onError = (error: any) => {
        console.log("error------------------", error);
        setIsLoading(false);
        FlashAlert({
          type: "E",
          title: "Error",
          description: "Something went wrong",
        });
      };
      const endPoint = api.updateProfile;
      const method = Method.PATCH;

      callApi(method, endPoint, body, onSuccess, onError);
    } catch (error) {
      console.log("something went wrong", error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => setSelectedNatureItem(item.title)}
      activeOpacity={0.8}
    >
      <View
        style={{ overflow: "hidden", borderRadius: 10, marginBottom: wp(4) }}
      >
        <BlurView
          intensity={30}
          tint="light"
          style={{
            height: wp(16),
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: wp(4),
          }}
        >
          <LinearGradient
            colors={[
              "rgba(255, 255, 255, 0.2)",
              "rgba(255, 255, 255, 0.04)",
              "rgba(255, 255, 255, 0)",
            ]}
            start={{ x: 0.15, y: 0.2 }}
            end={{ x: 0.9, y: 1.4 }}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={item.icon}
              style={{ height: wp(6), width: wp(6), marginRight: wp(3) }}
            />
            <Text style={styles.title}>{item.title}</Text>
          </View>
          <View
            style={{
              height: wp(7),
              width: wp(7),
              borderRadius: wp(1.2),
              borderWidth: wp(0.3),
              borderColor:
                selectedNatureItem === item.title ? "transparent" : colors.white,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor:
                selectedNatureItem === item.title ? colors.white : "transparent",
            }}
          >
            {selectedNatureItem === item.title && (
              <Image
                source={appImages.blueTick}
                style={{ height: wp(3.3), width: wp(4.5) }}
              />
            )}
          </View>
        </BlurView>
      </View>
    </TouchableOpacity>
  );
  const renderItemExperience = ({ item }) => (
    <TouchableOpacity
      onPress={() => setSelectedExperiencedItem(item.value)}
      style={{ overflow: "hidden", borderRadius: 10, marginBottom: wp(4) }}
      activeOpacity={0.8} // Optional: Adds slight press feedback
    >
      <BlurView
        intensity={30}
        tint="light"
        style={{
          height: wp(16),
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: wp(4),
        }}
      >
        <LinearGradient
          colors={[
            "rgba(255, 255, 255, 0.2)",
            "rgba(255, 255, 255, 0.04)",
            "rgba(255, 255, 255, 0)",
          ]}
          start={{ x: 0.15, y: 0.2 }}
          end={{ x: 0.9, y: 1.4 }}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }}
        />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={item.icon}
            style={{ height: wp(6), width: wp(6), marginRight: wp(3) }}
          />
          <Text style={styles.title}>{item.title}</Text>
        </View>

        <View
          style={{
            height: wp(7),
            width: wp(7),
            borderRadius: wp(1.2),
            borderWidth: wp(0.3),
            borderColor: experiencedItem === item.value ? colors.white : colors.white,
            backgroundColor:
              experiencedItem === item.value ? colors.white : "transparent",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {experiencedItem === item.value && ( // Only show tick if selected
            <Image
              source={appImages.blueTick}
              style={{ height: wp(3.3), width: wp(4.5) }}
            />
          )}
        </View>
      </BlurView>
    </TouchableOpacity>
  );
  const handleItemPress = (item: any) => {
    setSelectedItem((prev) => (prev === item.title ? null : item.title));
  };
  const renderItemNature = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleItemPress(item)}
      style={{
        overflow: "hidden",
        borderRadius: wp(3),
        marginBottom: wp(4),
        height: wp(45),
        width: "48%",
        borderWidth: selectedItem === item.title ? wp(0.3) : 0, // Show border only if selected
        borderColor: colors.white,
        position: "relative", // Ensure overlay is above the image
      }}
      activeOpacity={0.8} // Optional: Adds slight press feedback
    >
      <Image
        source={item.icon}
        style={{
          width: "100%",
          height: "100%",
        }}
      />

      {/* Translucent layer on top of the image */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.2)", // 20% opacity black layer
        }}
      />

      <Text
        style={[
          {
            position: "absolute",
            bottom: wp(4),
            alignSelf: "center",
            fontFamily: FontFamily.appSemiBold,
            fontSize: responsiveFontSize(1.8),
            color: colors.white,
          },
        ]}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  const handleDaySelection = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
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

  const renderDayButton = (day: { label: string; value: string }) => {
    const isSelected = selectedDays.includes(day.value);

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => handleDaySelection(day.value)}
        style={[
          styles.dayButton,
          {
            backgroundColor: isSelected ? colors.primary : "transparent",
            borderColor: isSelected ? colors.primary : "white",
          },
        ]}
      >
        <Text
          style={[
            styles.dayText,
            { color: isSelected ? "white" : colors.text },
          ]}
        >
          {day.label}
        </Text>
      </TouchableOpacity>
    );
  };


  // const [text, setText] = React.useState("");
  // const hasUnsavedChanges = Boolean(text);
  // const navigation = useNavigation();

  // React.useEffect(
  //   () =>
  //     navigation.addListener("beforeRemove", (e) => {
  //       if (!hasUnsavedChanges) {
  //         // If we don't have unsaved changes, then we don't need to do anything
  //         return;
  //       }

  //       // Prevent default behavior of leaving the screen
  //       e.preventDefault();

  //       // Prompt the user before leaving the screen
  //       Alert.alert(
  //         "Discard changes?",
  //         "You have unsaved changes. Are you sure to discard them and leave the screen?",
  //         [
  //           { text: "Don't leave", style: "cancel", onPress: () => {} },
  //           {
  //             text: "Discard",
  //             style: "destructive",
  //             // If the user confirmed, then we dispatch the action we blocked earlier
  //             // This will continue the action that had triggered the removal of the screen
  //             onPress: () => navigation.dispatch(e.data.action),
  //           },
  //         ]
  //       );
  //     }),
  //   [navigation, hasUnsavedChanges]
  // );

  return (
    <ParentWrapper colors={colors}>
      <ImageBackground
        source={appImages.cloud}
        resizeMode="contain"
        style={{
          flex: 1,

          justifyContent: "center", // Add this to center vertically
          alignItems: "center", // Add this to center horizontally
        }}
      >
        <View style={styles.wrapper}>
          {step != "0" && (
            <ProgressBar
              containerStyle={{
                marginTop: wp(15) + top,
              }}
              progressValue={progress}
            />
          )}

          <Text
            style={[styles.heading, step == "0" && { marginTop: top + wp(18) }]}
          >
            {head}
          </Text>
          <MainWrapper
            colors={colors}
            showButton={true}
            buttonContainer={{ marginHorizontal: isPortrait ? wp(2) : hp(2) }}
            buttonTitle={step == "0" ? "Create Profile" : "Next"}
            isLoading={isLoading}
            disableButton={isLoading}
            onButtonPress={handleButtonPress}
          >
            {step == "0" && (
              <>
                <Text style={[styles.title1]}>Let's get to know you!</Text>
                <Text style={[styles.des]}>
                  We'll ask a few questions to personalize your SoulWave
                  experience, helping you find the calm and balance you deserve.
                </Text>
                <Image
                  source={appImages.yogaTeacher}
                  style={{
                    height: wp(60),
                    width: wp(60),
                    resizeMode: "contain",
                    alignSelf: "center",
                    marginTop: wp(40),
                  }}
                />
              </>
            )}
            {step == "1" && (
              <FlatList
                scrollEnabled
                data={images}
                renderItem={renderItem}
                style={{ flex: 1 }}
                // Ensure FlatList takes up available space
                contentContainerStyle={{ paddingBottom: wp(35) }}
                keyExtractor={(item) => item.id.toString()}
              />
            )}
            {/* Display time selection in step 2 */}
            {step == "2" && (
              <>
                <View style={styles.timePicker}>
                  <DatePicker
                    theme="dark"
                    style={{ height: wp(55) }}
                    date={date}
                    onDateChange={setDate}
                    mode="time"
                  // is24hourSource="device"
                  // androidVariant="nativeAndroidPicker"
                  />
                </View>
                <Text style={[styles.des1, {}]}>
                  Which day would you like to meditate?
                </Text>
                <View>
                  {/* Render the days of the week */}
                  <View style={styles.daysContainer}>
                    {daysOfWeek.map((day, index) => renderDayButton(day))}
                  </View>
                </View>
              </>
            )}
            {step == "3" && (
              <FlatList
                scrollEnabled
                data={nature}
                renderItem={renderItemNature}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: "space-between" }}
              />
            )}
            {step == "4" && (
              <FlatList
                scrollEnabled
                data={experience}
                renderItem={renderItemExperience}
                keyExtractor={(item) => item.id.toString()}
              />
            )}
          </MainWrapper>
        </View>
      </ImageBackground>
    </ParentWrapper>
  );
};

export default Profile;
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
      marginTop: isPortrait ? wp(3) : hp(3),
    },
    heading: {
      fontFamily: FontFamily.appMedium,
      fontSize: responsiveFontSize(3.2),
      color: colors.text,
      marginBottom: isPortrait ? wp(8) : hp(8),
    },
    title: {
      fontFamily: FontFamily.appRegular,
      fontSize: responsiveFontSize(1.8),
      color: colors.text,
    },
    title1: {
      fontFamily: FontFamily.appMedium,
      fontSize: responsiveFontSize(2.4),
      color: colors.text,
    },
    des1: {
      fontFamily: FontFamily.appBold,
      fontSize: responsiveFontSize(3.2),
      color: colors.text,
      marginTop: wp(10),
      marginHorizontal: wp(4),
    },
    des: {
      fontFamily: FontFamily.appRegular,
      fontSize: responsiveFontSize(2.0),
      color: colors.text,
      marginVertical: wp(5),
    },
    subtitle: {
      fontSize: wp(4),
      marginVertical: wp(3),
      color: "#333",
    },
    selectedTime: {
      fontSize: wp(4),
      marginTop: wp(3),
      color: "#555",
    },
    timePicker: {
      alignItems: "center",
    },
    week: {
      fontFamily: FontFamily.appRegular,
      fontSize: responsiveFontSize(1.4),
      color: "white",
    },
    daysContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      marginTop: wp(3),
    },
    dayButton: {
      height: wp(11),
      width: wp(11),
      borderRadius: wp(6),
      justifyContent: "center",
      alignItems: "center",
      marginLeft: wp(2),
      borderWidth: wp(0.3),
      marginTop: wp(8),
    },
    dayText: {
      fontFamily: FontFamily.appRegular,
      fontSize: responsiveFontSize(1.4),
    },
  });
