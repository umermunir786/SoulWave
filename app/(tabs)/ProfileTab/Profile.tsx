import { Header, MainWrapper, ParentWrapper } from "@/components";
import { FontFamily } from "@/constants/Fonts";
import { appImages, useTheme, wp } from "@/services";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { useSelector } from "react-redux";

const images = [
  { icon: appImages.emoji1, name: "  24" },
  { icon: appImages.emoji2, name: "  25" },
  { icon: appImages.emoji3, name: "  26" },
  { icon: appImages.emoji4, name: "  27" },
  { icon: appImages.emoji5, name: "  28" },
  { icon: appImages.emoji5, name: "  29" },
  { icon: appImages.emoji5, name: "  30" },
];
const Profile = () => {
  const { user } = useSelector((state: any) => state.userData);
  const { colors } = useTheme();
  const renderItem = ({ item }: { item: any }) => (
    <View
      style={{
        alignItems: "center",
        marginRight: wp(3.2),
        marginVertical: wp(8),
      }}
    >
      <BlurView
        intensity={16}
        style={{
          height: wp(14),
          width: wp(14),
          backgroundColor: "#FFFFFF33",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: wp(2),
          borderWidth: 1,
          borderColor: "rgba(255, 255, 255, 0.1)",
          overflow: "hidden",
          marginBottom: wp(1),
        }}
      >
        <Pressable
          onPress={() => {
            // router.navigate({ pathname: "/(tabs)/ProfileTab/Settings" });
          }}
        >
          <Image
            source={appImages.laugh}
            style={{ height: wp(6), width: wp(6) }}
            resizeMode="contain"
          />
        </Pressable>
      </BlurView>
      <Text
        style={{
          color: colors.white,
          fontFamily: FontFamily.appRegular,
          fontSize: responsiveFontSize(1.2),
        }}
      >
        May
        <Text
          style={{
            color: colors.white,
            fontFamily: FontFamily.appMedium,
            fontSize: responsiveFontSize(1.4),
          }}
        >
          {item?.name}
        </Text>
      </Text>
    </View>
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
        backIcon={false}
        extraMarginAtTop={true}
      />
      <MainWrapper
        colors={colors}
      // showButton={true}
      // isLoading={isLoading}
      // buttonTitle={"Send Code"}
      // onButtonPress={handleForgetPassword}
      >
        <View
          style={{
            marginHorizontal: wp(5),
            marginBottom: wp(35),
            marginTop: wp(6),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={appImages.profilePic}
                style={{ height: wp(18), width: wp(18), marginRight: wp(3) }}
              />
              <Text
                numberOfLines={1}
                style={[
                  {
                    color: colors.white,
                    fontFamily: FontFamily.appMedium,
                    fontSize: responsiveFontSize(2.0),
                    lineHeight: 30,
                  },
                ]}
              >
                {user?.name ?? "User"}
              </Text>
            </View>

            <BlurView
              intensity={10}
              style={{
                height: wp(12),
                width: wp(12),
                backgroundColor: "#FFFFFF4D",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: wp(2),
                borderWidth: 1,
                borderColor: "rgba(255, 255, 255, 0.1)",
                overflow: "hidden",
              }}
            >
              <Pressable
                style={{
                  height: wp(12),
                  width: wp(12),

                  alignItems: "center",
                  justifyContent: "center",

                }}
                onPress={() => {
                  router.navigate({ pathname: "/(tabs)/ProfileTab/Settings" });
                }}
              >
                <Image
                  source={appImages.gear}
                  style={{ height: wp(8), width: wp(8) }}
                  resizeMode="contain"
                />
              </Pressable>
            </BlurView>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: wp(6),
            }}
          >
            <Text
              style={[
                {
                  color: colors.white,
                  fontFamily: FontFamily.appRegular,
                  fontSize: responsiveFontSize(2.8),
                },
              ]}
            >
              Streak Days
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                // justifyContent: "space-between",

              }}
            >
              <Image
                source={appImages.fire}
                style={{ height: wp(10), width: wp(10), marginRight: wp(1) }}
              />
              <Text
                style={[
                  {
                    color: colors.white,
                    fontFamily: FontFamily.appBold,
                    fontSize: responsiveFontSize(4.5),

                  },
                ]}
              >
                4
              </Text>
            </View>
          </View>

          <Text
            style={[
              {
                color: colors.white,
                fontFamily: FontFamily.appRegular,
                fontSize: responsiveFontSize(2.8),
                marginTop: wp(6),
              },
            ]}
          >
            Mood Tracker
          </Text>
          <LinearGradient
            colors={["#22186199", "#22186199"]} // Gradient background with opacity
            style={[
              styles.moodTrackerContainer,
              {
                borderWidth: 1,
                borderColor: "transparent", // Make border transparent initially
                marginTop: wp(5),
              },
            ]}
          >
            <View>
              <Text
                style={[
                  {
                    color: colors.white,
                    fontFamily: FontFamily.appRegular,
                    fontSize: responsiveFontSize(1.6),
                  },
                ]}
              >
                {"Your mood on "}
                <Text
                  style={[
                    {
                      color: colors.white,
                      fontFamily: FontFamily.appRegular,
                      fontSize: responsiveFontSize(1.8),
                    },
                  ]}
                >
                  May 28, 2024
                </Text>
              </Text>
              <Text
                style={[
                  {
                    color: colors.white,
                    fontFamily: FontFamily.appRegular,
                    fontSize: responsiveFontSize(1.6),
                    marginTop: wp(1),
                  },
                ]}
              >
                Happy
              </Text>
            </View>
            <Image
              style={{ height: wp(6), width: wp(6), marginRight: wp(5) }}
              source={appImages.smile}
            />
          </LinearGradient>
          <FlatList
            data={images}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            keyExtractor={(item, index) => index}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </MainWrapper>
    </ParentWrapper>
  );
};

export default Profile;

const styles = StyleSheet.create({
  greeting: {
    fontFamily: FontFamily.appRegular,
    fontSize: responsiveFontSize(2.0),
    lineHeight: 30,
  },
  greeting1: {},
  moodTrackerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: wp(20),
    alignItems: "center",
    borderRadius: wp(3),
    paddingHorizontal: wp(4),
    marginTop: wp(3),
  },
});
