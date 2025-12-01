import { Header, MainWrapper, ParentWrapper } from "@/components";
import ImageCard from "@/components/ImageCard";
import SubscriptionOverlay from "@/components/subscriptionOverlay";
import { appImages, globalStyles, useTheme, wp } from "@/services";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

interface MusicItem {
  id?: string;
}
interface MusicIndex {
  index?: string;
}

const allTrendingItems = [
  {
    id: 1,
    title: "Nighttime Tranquility",
    description: "Let go of the day’s worries and find peaceful rest.",
    time: "8 min",
    image: appImages.cardImage1,
    gradient: ["rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 0.8)"],
    lock: false,
    category: "sleep",
    keywords: ["sleep", "deep", "calm", "rest", "night", "bedtime"],
  },
  {
    id: 2,
    title: "Nighttime Tranquility",
    description: "Let go of the day’s worries and find peaceful rest.",
    time: "20 min",
    image: appImages.cardImage1,
    gradient: ["rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 0.8)"],
    lock: false,
    category: "sleep",
    keywords: ["nighttime", "tranquility", "peaceful", "rest", "sleep", "calm"],
  },
  {
    id: 3,
    title: "Morning Meditation",
    description: "Start your day with clarity and focus",
    time: "15 min",
    image: appImages.fullMoon,
    gradient: ["rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 0.8)"],
    lock: true,
    category: "morning",
    keywords: ["morning", "meditation", "clarity", "focus", "start", "day"],
  },
  {
    id: 4,
    title: "Anxiety Relief",
    description: "Reduce stress and find inner peace",
    time: "12 min",
    image: appImages.background,
    gradient: ["rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 0.8)"],
    lock: false,
    category: "anxiety",
    keywords: ["anxiety", "stress", "relief", "peace", "calm", "relaxation"],
  },
];
const SoundLibrary = () => {
  const { colors } = useTheme();
  const params = useLocalSearchParams();

  const [showSubscriptionOverlay, setShowSubscriptionOverlay] = useState(false); // Add this state
  const renderItemRecommended = ({
    item,
    index,
  }: {
    item: MusicItem;
    index: number;
  }) => (
    <Pressable style={{ marginBottom: wp(4) }}>
      <ImageCard
        // onPress={() => {
        //   item?.lock
        //     ? setShowSubscriptionOverlay(true)
        //     : router.navigate({
        //         pathname: "/(tabs)/SoundTab/SoundMusicPlayer",
        //       });
        // }}
        data={item}
      />
    </Pressable>
  );

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
  return (
    <ParentWrapper colors={colors}>
      <Header
        hideHeader={false}
        inVisibleHeader={false}
        centerTitle={params.title}
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          ></View>

          <Text style={[globalStyles.title, {}]}>Continue Listening</Text>
          <ImageCard
          pause
            onPress={() => {
              // router.navigate({
              //   pathname: "/SoundTab/SoundMusicPlayer",
              //   params: {},
              // });
            }}
          />
          <Text style={[globalStyles.title, {}]}>Recommended For You</Text>
          <FlatList
            data={allTrendingItems}
            renderItem={renderItemRecommended}
            contentContainerStyle={styles.listContentRecommended}
            keyExtractor={(item: MusicItem, index: number) => index.toString()}
          />
        </View>
      </MainWrapper>
      <SubscriptionOverlay
        visible={showSubscriptionOverlay}
        onClose={handleCloseOverlay}
        onSubscribe={handleSubscribe}
        onPressButton={onPressButton}
      />
    </ParentWrapper>
  );
};

export default SoundLibrary;

const styles = StyleSheet.create({
  listContentRecommended: {
    marginTop: wp(2),
  },
});
