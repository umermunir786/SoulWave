import { Header, MainWrapper, ParentWrapper } from "@/components";
import { FontFamily } from "@/constants/Fonts";
import { appImages, useTheme, wp } from "@/services";
import BottomSheet from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import React, { useRef } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const features = [
  "Unlimited access to all meditation types",
  "Download for offline access",
  "Progress tracking and daily streaks",
];

const plans = [
  {
    id: "monthly",
    title: "MONTHLY",
    subtitle: "$x.xx /month",
    price: "$9.99",
    period: "Monthly",
    selected: true,
  },
  {
    id: "yearly",
    title: "YEARLY",
    subtitle: "$x.xx /year",
    price: "$59.99",
    period: "Monthly",
    badge: "Save 33%",
    selected: false,
  },
];
const UpgradePlan = () => {
  const { colors } = useTheme();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { bottom } = useSafeAreaInsets();
  return (
    <ParentWrapper colors={colors}>
      <Header
        hideHeader={false}
        inVisibleHeader={false}
        centerTitle={"Upgrade Plan"}
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
            marginTop: wp(6),
          }}
        >
          <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Unlock your calm.</Text>
              <Text style={styles.subtitle}>
                {
                  "Enjoy unlimited access to guided\nmeditations, sleep sounds, and personalized\nprogress tracking."
                }
              </Text>
            </View>

            {/* Features */}
            <View style={styles.featuresContainer}>
              {features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Image
                    source={appImages.greenTick}
                    style={{ height: wp(5), width: wp(5), marginRight: wp(2) }}
                  />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </MainWrapper>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={["35%"]}
        index={0} // Start completely closed
        enablePanDownToClose={true}
        backgroundStyle={{
          backgroundColor: "transparent",
        }}
        handleStyle={{ display: "none" }} // Hide the handle bar
        enableDynamicSizing={false}
        enableOverDrag={false}
      >
        <BlurView
          intensity={30}
          tint="light"
          style={[styles.bottomSheetContainer, { paddingBottom: bottom }]}
        >
          <Text style={styles.title}>Pick your plan</Text>
          {/* Pricing Plans */}
          <View style={styles.plansContainer}>
            {plans.map((plan) => (
              <TouchableOpacity
                key={plan.id}
                style={[
                  styles.planItem,
                  plan.selected && styles.selectedPlan,
                  plan.id === "yearly" && styles.yearlyPlan,
                ]}
                activeOpacity={0.8}
                onPress={() => {}}
              >
                <View style={styles.planContent}>
                  <View style={styles.planInfo}>
                    <Text style={styles.planTitle}>{plan.title}</Text>
                    <Text style={styles.planSubtitle}>{plan.subtitle}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <View style={{ marginHorizontal: wp(4), marginTop: wp(2) }}>
            <TouchableOpacity
              style={[
                styles.button,
                styles.cancelButton,
                { backgroundColor: colors.primary },
              ]}
              activeOpacity={0.8}
              onPress={() => {
                router.back();
              }}
            >
              <Text style={styles.buttonText}>Subscribe Now</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </BottomSheet>
    </ParentWrapper>
  );
};

export default UpgradePlan;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  container: {
    backgroundColor: "transparent",
    borderRadius: wp(4),

    alignItems: "center",
    paddingTop: wp(1),
  },
  closeButton: {
    position: "absolute",
    top: wp(10),
    right: wp(4),
    width: wp(8),
    height: wp(8),
    borderRadius: wp(2),
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  closeButtonText: {
    color: "white",
    fontSize: responsiveFontSize(2.5),
    fontWeight: "bold",
  },
  header: {
    marginBottom: wp(8),
    marginTop: wp(6),
  },
  title: {
    fontSize: responsiveFontSize(2.8),
    fontFamily: FontFamily.appRegular,
    color: "white",

    marginBottom: wp(3),
    lineHeight: responsiveFontSize(4.2),
  },
  subtitle: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: FontFamily.appRegular,
    color: "white",
    textAlign: "left",
  },
  featuresContainer: {
    width: "100%",
    marginBottom: wp(8),
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: wp(3),
    backgroundColor: "#FFFFFF1A",
    borderRadius: wp(5),
    paddingHorizontal: wp(1),
    paddingVertical: wp(0.5),
  },
  checkIcon: {
    width: wp(6),
    height: wp(6),
    borderRadius: wp(3),
    backgroundColor: "rgba(34, 197, 94, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: wp(3),
  },
  checkText: {
    color: "white",

    fontSize: responsiveFontSize(1.8),
    fontFamily: FontFamily.appRegular,
  },
  featureText: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: FontFamily.appRegular,
    color: "white",
    flex: 1,
  },
  plansContainer: {
    // width: "100%",

    flexDirection: "row",

    paddingHorizontal: wp(8),
    marginTop: wp(2),
  },
  planItem: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: wp(1),
    width: wp(38),
    height: wp(24),
    alignItems: "center",
    justifyContent: "center",
    // padding: wp(4),
    marginHorizontal: wp(3),
    marginBottom: wp(3),
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  selectedPlan: {
    borderColor: "rgba(255, 193, 7, 0.8)",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  yearlyPlan: {
    borderColor: "rgba(255, 193, 7, 0.8)",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  planContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  radioButton: {
    width: wp(5),
    height: wp(5),
    borderRadius: wp(2.5),
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: wp(4),
  },
  radioInner: {
    width: wp(2.5),
    height: wp(2.5),
    borderRadius: wp(1.25),
    backgroundColor: "transparent",
  },
  radioSelected: {
    backgroundColor: "white",
    width: wp(5),
    height: wp(5),
    borderRadius: wp(2.5),
    justifyContent: "center",
    alignItems: "center",
  },

  planTitle: {
    fontSize: responsiveFontSize(2.0),
    fontFamily: FontFamily.appMedium,
    color: "white",

    lineHeight: 30,
  },
  planSubtitle: {
    fontSize: responsiveFontSize(1.6),
    fontFamily: FontFamily.appRegular,
    color: "white",
  },
  badge: {
    backgroundColor: "rgba(255, 193, 7, 0.9)",
    paddingHorizontal: wp(2),
    paddingVertical: wp(1),
    borderRadius: wp(1),
  },
  badgeText: {
    fontSize: responsiveFontSize(1.4),
    fontFamily: FontFamily.appRegular,
    color: "white",
    fontWeight: "bold",
  },
  subscribeButton: {
    backgroundColor: "rgba(59, 130, 246, 0.9)",
    paddingVertical: wp(4),
    paddingHorizontal: wp(8),
    borderRadius: wp(3),
    width: "100%",
    alignItems: "center",
  },
  subscribeButtonText: {
    fontSize: responsiveFontSize(2.0),
    fontFamily: FontFamily.appRegular,
    color: "white",
    fontWeight: "bold",
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

  button: {
    padding: 15,

    width: wp(92),
    borderRadius: wp(6),
    alignItems: "center",
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
