import { Header, MainWrapper, ParentWrapper } from "@/components";
import SoundCard from "@/components/SoundCard";
import { FontFamily } from "@/constants/Fonts";
import { appImages, useTheme, wp } from "@/services";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";

const experience = [
  { id: 0, icon: appImages.sound, title: "Focus", session: "20 Sessions" },
  { id: 1, icon: appImages.sound, title: "Sleep", session: "20 Sessions" },
  {
    id: 2,
    icon: appImages.sound,
    title: "Stress Relief",
    session: "20 Sessions",
  },
  {
    id: 3,
    icon: appImages.sound,
    title: "Emotional Healing",
    session: "20 Sessions",
  },
];
const Sounds = () => {
  const { colors } = useTheme();

  const renderItemExperience = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: "/(tabs)/SoundTab/SoundLibrary",
          params: { title: item.title },
        });
      }} // Update selected item on press
      style={{ overflow: "hidden", borderRadius: 10, marginBottom: wp(4) }}
      activeOpacity={0.8} // Optional: Adds slight press feedback
    >
      <BlurView
        intensity={30}
        tint="light"
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: wp(4),
          paddingVertical: wp(3),
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
            style={{ height: wp(16), width: wp(16), marginRight: wp(3) }}
          />
          <View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.session}</Text>
          </View>
        </View>
        {/* Toggle tick icon background based on selection */}
        <Image
          style={{
            height: wp(7),
            width: wp(7),
          }}
          source={appImages.chevronRight}
        />
      </BlurView>
    </TouchableOpacity>
  );
  return (
    <ParentWrapper colors={colors}>
      <Header
        hideHeader={false}
        inVisibleHeader={false}
        colors={colors}
        leftSideIcons={false}
        centerTitle={"Sounds"}
        backIcon={false}
        extraMarginAtTop={true}
        noIconSpaceFillRightSide={10}
        
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
          <SoundCard />
          <FlatList
            scrollEnabled
            data={experience}
            renderItem={renderItemExperience}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </MainWrapper>
    </ParentWrapper>
  );
};

export default Sounds;

const styles = StyleSheet.create({
  title: {
    fontFamily: FontFamily.appRegular,
    fontSize: responsiveFontSize(2.0),
    color: "white",
    lineHeight: 30,
  },
  desc: {
    fontFamily: FontFamily.appLight,
    fontSize: responsiveFontSize(1.2),
    color: "white",
  },
});
