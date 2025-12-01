import ImageCard from "@/components/ImageCard";
import MusicImageCard from "@/components/MusicImageCard";
import SubscriptionOverlay from "@/components/subscriptionOverlay";
import { FontFamily } from "@/constants/Fonts";
import { appImages, globalStyles, hp, useTheme, wp } from "@/services";
import { BlurView } from "expo-blur";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Button,
  Header,
  MainWrapper,
  ParentWrapper,
} from "../../../components";
import { api } from "@/network/Environment";
import { callApi, Method } from "@/network/NetworkManger";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";

interface MusicItem {
  id?: string;
}
interface MusicIndex {
  index?: string;
}

const images = [
  { icon: appImages.emoji1, name: "Happy" },
  { icon: appImages.emoji2, name: "Neutral" },
  { icon: appImages.emoji3, name: "stressed" },
  { icon: appImages.emoji4, name: "Sad" },
  { icon: appImages.emoji5, name: "Frustated" },
];
const MeditationLibrary = () => {
  const { colors } = useTheme();
  const { pickUp, category } = useLocalSearchParams();
  const { bottom } = useSafeAreaInsets();
  const [meditationData, setMeditationData] = useState([]);
  const [showSubscriptionOverlay, setShowSubscriptionOverlay] = useState(false); // Add this state
  const [feelings, setFeelings] = useState(pickUp == "0" ? false : true); // Add this state
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseOverlay = () => {
    setShowSubscriptionOverlay(false);
  };

  const handleSubscribe = (plan: string) => {
    console.log("Selected plan:", plan);
  };

  const getMeditations = async () => {
    try {
      setIsLoading(true);
      const body = {};
      const onSuccess = (res: any) => {
        setMeditationData(res?.data?.meditations);
        setIsLoading(false);
      };
      const onError = (error: any) => {
        console.log("==============", error);
        setIsLoading(false);
      };
      const endPoint = `${api.getMeditations}?category=${category}`;
      const method = Method.GET;

      callApi(method, endPoint, body, onSuccess, onError);
    } catch (error) {
      console.log("Error during image uploads:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMeditations();
  }, []);

  interface MusicItem {
    id?: string;
    lock?: boolean;
  }

  const renderItemMusic = ({ item }: { item: MusicItem }) => <MusicImageCard />;
  const renderItemRecommended = ({
    item,
    index,
  }: {
    item: MusicItem;
    index: MusicIndex;
  }) => (
    <Pressable style={{ marginBottom: wp(4) }}>
      <ImageCard
        onPress={() => {
          // setFeelings(true);
          router.navigate({
            pathname: "/HomeTab/HomeMusicPlayer",
            params: { data: JSON.stringify(item) },
          });
        }}
        data={item}
      />
    </Pressable>
  );

  const renderItem = ({ item }) => (
    <View style={{ alignItems: "center", marginVertical: wp(3) }}>
      <Image
        style={{
          height: wp(12),
          width: wp(12.1),
          marginBottom: wp(2),
        }}
        source={item?.icon}
      />
      <Text
        style={{
          color: colors.white,
          fontFamily: FontFamily.appMedium,
          fontSize: responsiveFontSize(1.4),
        }}
      >
        {item?.name}
      </Text>
    </View>
  );

  return (
    <ParentWrapper colors={colors}>
      <Header
        hideHeader={false}
        inVisibleHeader={false}
        centerTitle={"Sleep Meditation"}
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
          {/* <Text style={[globalStyles.title]}>Recently Played</Text>
          <FlatList
            data={[{}, {}, {}, {}, {}, {}, {}]}
            renderItem={renderItemMusic}
            contentContainerStyle={styles.listContent}
            keyExtractor={(item: MusicItem, index: number) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          /> */}
          <Text style={[globalStyles.title]}>Recommended For You</Text>
          <FlatList
            scrollEnabled
            data={meditationData}
            renderItem={renderItemRecommended}
            contentContainerStyle={styles.listContentRecommended}
            keyExtractor={(item: MusicItem, index: number) => index.toString()}
            ListEmptyComponent={() =>
              !isLoading && (
                <View
                  style={{
                    flex: 1,
                    height: hp(65),
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={appImages.whitelogo}
                    style={{
                      height: wp(30),
                      width: wp(30),
                    }}
                  />
                  <Text
                    style={{
                      color: colors.white,
                      fontSize: responsiveFontSize(2.0),
                    }}
                  >
                    No {category} meditations found.
                  </Text>
                </View>
              )
            }
          />
        </View>
      </MainWrapper>
      {feelings && (
        <BlurView
          intensity={30}
          tint="dark"
          style={[
            {
              backgroundColor: "#1010104D",
              // borderRadius: wp(6),
              overflow: "hidden",
              height: hp(40) + bottom,
              width: wp(100),
              position: "absolute",

              bottom: 0,
              paddingBottom: bottom,
              flex: 1,
            },
          ]}
        >
          <View style={styles.contentContainer}>
            {/* Track Info */}
            <Pressable
              onPress={() => {
                setFeelings(false);
                router.navigate({ pathname: "/HomeTab/HomeMusicPlayer" });
              }}
              style={{
                position: "absolute",
                top: wp(5),
                right: wp(5),
              }}
            >
              <Image
                source={appImages.crossSquare}
                style={{
                  height: wp(10),
                  width: wp(10),
                }}
              />
            </Pressable>
            <Text
              style={[
                {
                  color: colors.white,
                  fontFamily: FontFamily.appMedium,
                  fontSize: responsiveFontSize(2.0),
                  marginTop: wp(16),
                  textAlign: "center",
                },
              ]}
            >
              How are you feeling right now?
            </Text>

            <FlatList
              data={images}
              renderItem={renderItem}
              style={{}}
              scrollEnabled={false}
              contentContainerStyle={[
                styles.listContent,
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  // marginBottom: wp(2),
                },
              ]}
              keyExtractor={(item, index) => index}
              showsHorizontalScrollIndicator={false}
            />
            <View
              style={{ position: "absolute", bottom: 0, right: 0, left: 0 }}
            >
              <Button
                changeMainContainerStyle={{}}
                colors={colors}
                children={"Continue"}
                onPress={() => {
                  setFeelings(false);
                  router.navigate({ pathname: "/HomeTab/HomeMusicPlayer" });
                }}
              />
            </View>
          </View>
        </BlurView>
      )}

      {/* Add the Subscription Overlay */}
      {/* <SubscriptionOverlay
        visible={showSubscriptionOverlay}
        onClose={handleCloseOverlay}
        onSubscribe={handleSubscribe}
      /> */}
      {isLoading && (
        <LoadingOverlay
          visible={isLoading}
          message={`Getting ${category} meditations...`}
        />
      )}
    </ParentWrapper>
  );
};

export default MeditationLibrary;

const styles = StyleSheet.create({
  listContent: {
    marginVertical: wp(2),
  },
  listContentRecommended: {
    marginTop: wp(2),
    paddingBottom: wp(20),
  },

  contentContainer: {
    flex: 1,
    padding: wp(5),
    paddingTop: hp(2),
  },
  trackInfo: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: hp(2),
  },
  trackTitle: {
    color: "white",
    fontSize: wp(6),
    fontWeight: "bold",
    marginBottom: hp(0.5),
  },
  trackSubtitle: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: wp(4),
  },
  progressContainer: {
    width: "100%",
    marginBottom: hp(2),
  },
  progressBar: {
    width: "100%",
    height: wp(10),
  },
  sliderThumb: {
    backgroundColor: "white",
    width: wp(5),
    height: wp(5),
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: wp(2),
  },
  timeText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: wp(3),
    fontWeight: "400",
  },
  audioControlsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingHorizontal: wp(10),
  },
  audioControlButton: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  audioControlIcon: {
    width: wp(4),
    height: wp(3.5),
    tintColor: "white",
  },
  skipText: {
    color: "white",
    fontSize: wp(2.5),
    fontWeight: "bold",
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: hp(3),
  },
  controlButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  controlIcon: {
    width: wp(6),
    height: wp(6),
    tintColor: "white",
  },
  controlText: {
    color: "white",
    fontSize: wp(3.5),
    fontWeight: "500",
  },
  playButton: {
    width: wp(20),
    height: wp(20),
    borderRadius: wp(10),
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  replayContainer: {
    alignItems: "center",
    marginBottom: hp(3),
  },
  replayButton: {
    padding: wp(3),
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: wp(2),
  },
  playIcon: {
    width: wp(8),
    height: wp(8),
  },
  artistInfo: {
    alignItems: "center",
  },
  artistText: {
    color: "white",
    fontSize: wp(4),
    fontWeight: "bold",
  },
});
