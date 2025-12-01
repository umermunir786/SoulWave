import { FlashAlert, Header, MainWrapper, ParentWrapper } from "@/components";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import { FontFamily } from "@/constants/Fonts";
import { api } from "@/network/Environment";
import { callApi, Method } from "@/network/NetworkManger";
import { hp, useTheme, wp } from "@/services";
import { setUser } from "@/store/reducers/userDataSlice";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import DatePicker from "react-native-date-picker";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { useDispatch, useSelector } from "react-redux";
import ToggleSwitch from "toggle-switch-react-native";

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
  primary: string; // Added missing primary color
}

const daysOfWeek = [
  { label: "SU", value: "sunday" },
  { label: "M", value: "monday" },
  { label: "T", value: "tuesday" },
  { label: "W", value: "wednesday" },
  { label: "TH", value: "thursday" },
  { label: "F", value: "friday" },
  { label: "S", value: "saturday" },
];

const Reminders = () => {
  const { colors } = useTheme();
  const { user } = useSelector((state: any) => state.userData);
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const isPortrait = windowHeight > windowWidth;
  console.log("user?.med :>> ", user?.meditationReminders);
  const [date, setDate] = useState(user?.meditationReminders?.time ? new Date(user?.meditationReminders?.time) : new Date());
  const [selectedDays, setSelectedDays] = useState<string[]>(user?.meditationReminders?.weekDays ?? []);
  const [isEnabled, setIsEnabled] = useState(user?.meditationReminders?.time && user?.meditationReminders?.weekDays?.length > 0);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const styles = createStyles(
    colors,
    windowWidth,
    windowHeight,
    isPortrait,
    wp,
    hp
  );

  const handleDaySelection = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

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

  const handleUpdateProfile = async () => {
    try {
      setIsLoading(true);
      const body = {
        meditationReminders: {
          time: isEnabled ? date : "",
          weekDays: isEnabled ? selectedDays : [],
        },
      };
      const onSuccess = (res: any) => {
        console.log("res :>> ", res?.data?.user?.meditationReminders);
        dispatch(setUser(res?.data?.user));
        FlashAlert({
          title: "Reminder set successfully",
          type: "I",
          position: "bottom",
        });
        router.back();
        setIsLoading(false);
      };
      const onError = (error: any) => {
        console.log("error :>> ", error);
        setIsLoading(false);
      };
      const endPoint = api.updateProfile;
      const method = Method.PATCH;

      callApi(method, endPoint, body, onSuccess, onError);
    } catch (error) {
      console.log("Error during image uploads:", error);
    }
  };

  return (
    <ParentWrapper colors={colors}>
      <Header
        hideHeader={false}
        inVisibleHeader={false}
        centerTitle={"Reminders"}
        colors={colors}
        statusBarColor={colors.transparent}
        barStyleWhiteColor={true}
        leftSideIcons={true}
        backIcon={true}
        extraMarginAtTop={true}
      />
      <MainWrapper
        showButton
        buttonTitle="Save"
        // disableButton={!isEnabled}
        onButtonPress={() => {
          handleUpdateProfile();
        }}
        colors={colors}
      >
        <View style={styles.wrapper}>
          <View
            style={{
              overflow: "hidden",
              borderRadius: 10,
              marginBottom: wp(4),
              borderWidth: wp(0.3),
              borderColor: "#FFFFFF4D",
              marginVertical: wp(8),
            }}
          >
            <BlurView
              intensity={30}
              tint="light"
              style={{
                height: wp(22),
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: wp(4),
                backgroundColor: "#D4D4D41A",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text
                    style={{
                      fontFamily: FontFamily.appRegular,
                      fontSize: responsiveFontSize(2.0),
                      color: "white",
                      lineHeight: 30,
                    }}
                  >
                    {"Meditation Reminders"}
                  </Text>
                  <Text
                    style={{
                      fontFamily: FontFamily.appRegular,
                      fontSize: responsiveFontSize(1.6),
                      color: "white",
                    }}
                  >
                    {"Daily Schedule Reminder"}
                  </Text>
                </View>
              </View>

              <ToggleSwitch
                isOn={isEnabled}
                onColor={colors.primary}
                offColor={colors.white}
                circleColor={colors.text}
                onToggle={() => setIsEnabled(!isEnabled)}
              />
            </BlurView>
          </View>
          {isEnabled && (
            <>
              <View style={styles.timePicker}>
                <DatePicker
                  theme="dark"
                  style={{ height: wp(55) }}
                  date={date}
                  onDateChange={setDate}
                  mode="time"
                  is24hourSource="device"
                  androidVariant="nativeAndroidPicker"
                />
              </View>

              <View style={styles.daysContainer}>
                {daysOfWeek.map((day) => renderDayButton(day))}
              </View>
            </>
          )}
        </View>
        {isLoading && (
          <LoadingOverlay
            visible={isLoading}
            message="Updating meditation reminder..."
          />
        )}
      </MainWrapper>
    </ParentWrapper>
  );
};

export default Reminders;

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
      marginHorizontal: wp(5),
      marginBottom: wp(35),
      marginTop: wp(6),
    },
    heading: {
      fontFamily: FontFamily.appMedium,
      fontSize: responsiveFontSize(3.2),
      color: colors.text,
      marginBottom: wp(8),
      textAlign: "center",
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
      marginTop: wp(8),
      marginBottom: wp(4),
      textAlign: "center",
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
      color: colors.text,
    },
    selectedTime: {
      fontSize: wp(4),
      marginTop: wp(3),
      color: colors.text,
    },
    timePicker: {
      alignItems: "center",
      marginBottom: wp(6),
    },
    week: {
      fontFamily: FontFamily.appRegular,
      fontSize: responsiveFontSize(1.4),
      color: colors.text,
    },
    daysContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      marginTop: wp(3),
      gap: wp(2),
    },
    dayButton: {
      height: wp(11),
      width: wp(11),
      borderRadius: wp(6),
      justifyContent: "center",
      alignItems: "center",
      borderWidth: wp(0.3),
    },
    dayText: {
      fontFamily: FontFamily.appRegular,
      fontSize: responsiveFontSize(1.4),
    },
  });
