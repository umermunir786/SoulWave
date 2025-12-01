import { Header, MainWrapper, ParentWrapper } from "@/components";
import { FontFamily } from "@/constants/Fonts";
import { appImages, useTheme, wp } from "@/services";
import { logout } from "@/store/reducers/userDataSlice";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

const experience = [
  { id: 0, icon: appImages.bell, title: "Reminders" },
  { id: 1, icon: appImages.WhiteLock, title: "Change Password" },
  { id: 2, icon: appImages.questionMark, title: "Help & Support" },
  { id: 2, icon: appImages.bin, title: "Deactivate Account" },
  { id: 2, icon: appImages.logout, title: "Logout" },
];

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

const Settings = () => {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const { user } = useSelector((state: any) => state.userData);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handlePasswordChange = async (): Promise<void> => {
    console.log("Attempting to expand bottom sheet");
    bottomSheetRef.current?.expand();
    setIsSheetOpen(true);
  };

  const handleConfirmDelete = () => {
    bottomSheetRef.current?.close();

    setTimeout(() => {
      router.replace({ pathname: "/auth/SignIn" });
      dispatch(logout());
    }, 200);
  };

  const handleCancel = () => {
    bottomSheetRef.current?.close();
  };

  const handleSheetChanges = (index: number) => {
    // When sheet closes (index -1), hide overlay
    if (index === -1) {
      setIsSheetOpen(false);
    }
  };
  const renderBackdrop = useCallback(
    (props: import("@gorhom/bottom-sheet").BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.5}
        {...props}
      />
    ),
    []
  );
  const { bottom } = useSafeAreaInsets();
  const handlePress = (title: string) => {
    switch (title) {
      case "Reminders":
        // Handle Reminders press
        router.navigate({ pathname: "/(tabs)/ProfileTab/Reminders" });
        break;
      case "Change Password":
        // Handle Change Password press
        router.navigate({ pathname: "/(tabs)/ProfileTab/changePassword" });
        break;
      case "Help & Support":
        // Handle Help & Support press
        router.navigate({ pathname: "/(tabs)/ProfileTab/Support" });
        break;
      case "Deactivate Account":
        // Handle Deactivate Account press
        router.navigate({ pathname: "/(tabs)/ProfileTab/DeleteAccount" });
        break;
      case "Logout":
        handlePasswordChange();
        break;
      default:
        break;
    }
  };

  const renderItemExperience = ({ item }: { item: (typeof experience)[0] }) => (
    <TouchableOpacity
      onPress={() => handlePress(item.title)}
      style={{ overflow: "hidden", borderRadius: 10, marginBottom: wp(4) }}
      activeOpacity={0.8}
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
          <Text
            style={{
              fontFamily: FontFamily.appRegular,
              fontSize: responsiveFontSize(2.0),
              color: "white",
            }}
          >
            {item.title}
          </Text>
        </View>

        <Image
          source={appImages.chevronRight}
          style={{ height: wp(7), width: wp(7) }}
        />
      </BlurView>
    </TouchableOpacity>
  );
  return (
    <ParentWrapper colors={colors}>
      <Header
        hideHeader={false}
        inVisibleHeader={false}
        centerTitle={"Settings"}
        colors={colors}
        statusBarColor={colors.transparent}
        barStyleWhiteColor={true}
        leftSideIcons={true}
        backIcon={true}
        extraMarginAtTop={true}
      />
      <MainWrapper colors={colors}>
        <View
          style={{
            marginHorizontal: wp(5),
            marginBottom: wp(35),
            marginTop: wp(2),
          }}
        >
          <LinearGradient
            locations={[0.1298, 0.415, 0.8721]}
            colors={["#FFD166", "#97771A", "rgba(249,168,37,0.8)"]}
            start={{ x: 0.13, y: 0 }}
            end={{ x: 0.87, y: 1 }}
            style={styles.gradient}
          >
            <View style={styles.row}>
              <View>
                <Text
                  style={[
                    {
                      color: colors.text,
                      fontSize: responsiveFontSize(1.8),
                      fontFamily: FontFamily?.appRegular,
                    },
                  ]}
                >
                  Subscription
                </Text>
                <Text
                  style={[
                    {
                      color: colors.text,
                      fontSize: responsiveFontSize(2.4),
                      fontFamily: FontFamily?.appMedium,
                      lineHeight: 36,
                    },
                  ]}
                >
                  Free
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  router.navigate({
                    pathname: "/(tabs)/ProfileTab/UpgradePlan",
                  });
                }}
                activeOpacity={0.8}
                style={{
                  backgroundColor: "#101010CC",
                  height: wp(10),
                  justifyContent: "center",
                  alignItems: "center",
                  paddingHorizontal: wp(4),
                  borderRadius: wp(3),
                }}
              >
                <Text style={[styles.text, { color: colors.text }]}>
                  UPGRADE
                </Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>

          <TouchableOpacity
            onPress={() => {
              router.navigate({ pathname: "/(tabs)/ProfileTab/EditProfile" });
            }}
            style={{
              overflow: "hidden",
              borderRadius: 10,
              marginBottom: wp(4),
            }}
            activeOpacity={0.8}
          >
            <BlurView
              intensity={30}
              tint="light"
              style={{
                height: wp(26),
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
                  source={appImages.profilePic}
                  style={{ height: wp(20), width: wp(20), marginRight: wp(4) }}
                />
                <View>
                  <Text
                    style={{
                      fontFamily: FontFamily.appRegular,
                      fontSize: responsiveFontSize(2.0),
                      color: "white",
                      lineHeight: 30,
                    }}
                  >
                    {user?.name ?? "User"}
                  </Text>
                  <Text
                    style={{
                      fontFamily: FontFamily.appRegular,
                      fontSize: responsiveFontSize(1.6),
                      color: "white",
                    }}
                  >
                    {"Edit Profile"}
                  </Text>
                </View>
              </View>

              <Image
                source={appImages.chevronRight}
                style={{ height: wp(8), width: wp(8) }}
              />
            </BlurView>
          </TouchableOpacity>
          <FlatList
            scrollEnabled
            data={experience}
            renderItem={renderItemExperience}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </MainWrapper>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={["28%"]}
        index={-1} // Start completely closed
        enablePanDownToClose={true}
        backgroundStyle={{
          backgroundColor: "transparent",
        }}
        backdropComponent={renderBackdrop}
        handleStyle={{ display: "none" }} // Hide the handle bar
        enableDynamicSizing={false}
        enableOverDrag={false}
        onChange={handleSheetChanges} // Track sheet state changes
      >
        <BlurView
          intensity={30}
          tint="light"
          style={[styles.bottomSheetContainer, { paddingBottom: bottom }]}
        >
          <Text style={styles.title}>Log out</Text>
          <Text style={styles.confirmText}>
            Are you sure you want to log out?
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                styles.deleteButton,
                { borderColor: colors.primary },
              ]}
              activeOpacity={0.8}
              onPress={handleCancel}
            >
              <Text style={[styles.buttonText, styles.deleteButtonText]}>
                Stay
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                styles.cancelButton,
                { backgroundColor: colors.primary },
              ]}
              activeOpacity={0.8}
              onPress={handleConfirmDelete}
            >
              <Text style={styles.buttonText}>Log out</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </BottomSheet>
    </ParentWrapper>
  );
};

export default Settings;

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: wp(4),
    marginTop: wp(3),
  },
  heading: {
    fontFamily: FontFamily.appMedium,
    fontSize: responsiveFontSize(3.2),
    color: "white",
    marginBottom: wp(8),
  },
  title: {
    fontFamily: FontFamily.appRegular,
    fontSize: responsiveFontSize(2.0),
    color: "white",
  },
  title1: {
    fontFamily: FontFamily.appMedium,
    fontSize: responsiveFontSize(2.4),
    color: "white",
  },
  des1: {
    fontFamily: FontFamily.appBold,
    fontSize: responsiveFontSize(3.2),
    color: "white",
    marginTop: wp(10),
    marginHorizontal: wp(4),
  },
  des: {
    fontFamily: FontFamily.appRegular,
    fontSize: responsiveFontSize(2.0),
    color: "white",
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
  blurContainer: {
    borderRadius: wp(2),
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    overflow: "hidden",
    marginVertical: wp(4),
  },
  gradient: {
    borderRadius: wp(2),
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    overflow: "hidden",
    marginVertical: wp(4),
    padding: wp(3.5),
    paddingHorizontal: wp(4),
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: FontFamily?.appRegular,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 0, // Below bottom sheet but above main content
  },
  bottomSheetContainer: {
    flex: 1,

    borderRadius: wp(5),
    overflow: "hidden",
    borderColor: "#FFFFFF4D",
    borderWidth: wp(0.3),

    justifyContent: "center",
    alignItems: "center",
  },
  confirmText: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: FontFamily.appRegular,
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
  title: {
    fontSize: responsiveFontSize(2.6),
    fontFamily: FontFamily.appMedium,
    color: "white",
    marginBottom: 20,
    textAlign: "center",
    lineHeight: 36,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    padding: 15,
    borderRadius: 8,
    width: "45%",
    alignItems: "center",
  },
  cancelButton: {
    borderRadius: wp(6),
  },
  deleteButton: {
    backgroundColor: "transparent",
    borderRadius: wp(6),

    borderWidth: wp(0.3),
  },
  buttonText: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: FontFamily.appMedium,
    color: "white",
  },
  deleteButtonText: {
    color: "white",
  },
});
