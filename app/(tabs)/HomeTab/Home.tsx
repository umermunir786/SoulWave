import ImageCard from "@/components/ImageCard";
import MusicImageCard from "@/components/MusicImageCard";
import SubscriptionOverlay from "@/components/subscriptionOverlay";
import { Header, MainWrapper, ParentWrapper } from "../../../components";

import { FontFamily } from "@/constants/Fonts";
import { appImages, getGreeting, globalStyles, useTheme, wp } from "@/services";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { useSelector } from "react-redux";

const images = [
  { id: 0, icon: appImages.moon, title: "Sleep", category: "sleep" },
  { id: 1, icon: appImages.leaves, title: "Stress Relief", category: "stress-relief" },
  { id: 2, icon: appImages.mindfulness, title: "Mindfulness", category: "mindfulness" },
  { id: 3, icon: appImages.cloudSun, title: "Morning Boost", category: "morning-boost" },
  { id: 4, icon: appImages.yoga1, title: "Body Scan", category: "body-scan" },
  { id: 5, icon: appImages.hearts, title: "Loving-Kindnes", category: "loving-kindness" },
];

const { width } = Dimensions.get("window");
const itemWidth = wp(43);

const Home = () => {
  const { user } = useSelector((state: any) => state.userData);
  const [showSubscriptionOverlay, setShowSubscriptionOverlay] = useState(false);
  const { colors } = useTheme();
  
  const handleCloseOverlay = () => {
    setShowSubscriptionOverlay(false);
  };

  const handleSubscribe = (plan: string) => {
    // Handle subscription logic here
    console.log("Selected plan:", plan);
  };
  const onPressButton = () => {
    setShowSubscriptionOverlay(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        router.navigate({
          pathname: "/(tabs)/HomeTab/MeditationLibrary",
          params: { pickUp: "0", category: item?.category },
        })
      }
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.itemContainer,
          {
            width: itemWidth,
            height: itemWidth * 0.7,
            marginBottom: wp(4),
            marginRight: wp(4),
          },
        ]}
      >
        <BlurView
          intensity={12.156224250793457}
          tint="light"
          style={styles.blurView}
        >
          <LinearGradient
            colors={[
              "rgba(255, 255, 255, 0.2)",
              "rgba(255, 255, 255, 0.0447917)",
              "rgba(255, 255, 255, 0)",
            ]}
            start={{ x: 0.1532, y: 0.2104 }}
            end={{ x: 0.9016, y: 1.4301 }}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.itemContent}>
            <Image
              source={item.icon}
              style={styles.itemIcon}
              resizeMode="contain"
            />
            <Text style={styles.title}>{item.title}</Text>
          </View>
        </BlurView>
      </View>
    </TouchableOpacity>
  );

  const renderItemMusic = ({ item }) => <MusicImageCard />;

  return (
    <ParentWrapper colors={colors}>
      <Header
        hideHeader={false}
        inVisibleHeader={false}
        colors={colors}
        statusBarColor={colors.transparent}
        barStyleWhiteColor={true}
        leftSideIcons={false}
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={[styles.greeting, { color: colors.white }]} numberOfLines={1}>
                {getGreeting()}, {user?.name}
              </Text>
              <Text style={[styles.greeting1, { color: colors.white }]}>
                Find your calm today.
              </Text>
            </View>

            <BlurView

              intensity={8}
              style={{
                height: wp(12),
                width: wp(12),
                backgroundColor: "#FFFFFF40",

                borderRadius: wp(2),
                borderWidth: 1,
                borderColor: "#FFFFFF1A",
                overflow: "hidden",
                // backdropFilter: "blur(8px)",
                // shadowColor: "#0F172A0A",
                // shadowOffset: { width: 0, height: 4 },
                // shadowOpacity: 1,
                // shadowRadius: 20,
                // elevation: 5,
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
                  router.navigate({ pathname: "/(tabs)/HomeTab/HomeSearch" });
                }}
              >
                <Image
                  source={appImages.magnify}
                  style={{ height: wp(6), width: wp(6) }}
                  resizeMode="contain"
                />
              </Pressable>
            </BlurView>
          </View>

          <Text style={[globalStyles.title, {}]}>
            Today's Pick Just for You
          </Text>
          <ImageCard
            data={{ lock: true }}
            onPress={() => {
              setShowSubscriptionOverlay(true)
            }}
          />
          <Text style={[globalStyles.title, {}]}>
            Explore Guided Meditations
          </Text>
          <FlatList
            data={images}
            renderItem={renderItem}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={styles.listContent}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
          <Text style={[globalStyles.title, {}]}>Popular Right Now</Text>
          <FlatList
            data={images}
            renderItem={renderItemMusic}
            contentContainerStyle={styles.listContent}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </MainWrapper>

      {showSubscriptionOverlay && (
        <SubscriptionOverlay
          visible={showSubscriptionOverlay}
          onClose={handleCloseOverlay}
          onSubscribe={handleSubscribe}
        // onPressButton={onPressButton}
        />
      )}
    </ParentWrapper>
  );
};

const styles = StyleSheet.create({
  greeting: {
    fontFamily: FontFamily.appRegular,
    fontSize: responsiveFontSize(2.0),
    lineHeight: 30,
    width: wp(70),
  },
  greeting1: {
    fontFamily: FontFamily.appRegular,
    fontSize: responsiveFontSize(1.6),
  },
  subtitle: {
    fontFamily: FontFamily.appRegular,
    fontSize: responsiveFontSize(2.2),
    color: "white",
  },
  sectionTitle: {
    fontFamily: FontFamily.appRegular,
    fontSize: responsiveFontSize(2.2),
    color: "white",
    marginBottom: wp(4),
  },
  itemContainer: {
    overflow: "hidden",
    borderRadius: 10,
    borderWidth: wp(0.4),
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  blurView: {
    flex: 1,
    justifyContent: "center",
  },
  itemContent: {
    paddingHorizontal: wp(4),
  },
  itemIcon: {
    height: wp(13),
    width: wp(13),
  },
  title: {
    fontFamily: FontFamily.appRegular,
    fontSize: responsiveFontSize(2.0),
    color: "white",
    marginTop: wp(2),
  },
  columnWrapper: {},
  listContent: {},
});

export default Home;
