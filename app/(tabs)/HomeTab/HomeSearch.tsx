
import ImageCard from "@/components/ImageCard";
import SubscriptionOverlay from "@/components/subscriptionOverlay";
import { FontFamily } from "@/constants/Fonts";
import { appImages, hp, useTheme, wp } from "@/services";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { Header, MainWrapper, ParentWrapper } from "../../../components";

const { width } = Dimensions.get("window");

const HomeSearch = () => {
  const { colors } = useTheme();
  const [searchText, setSearchText] = useState("");
  const [showSubscriptionOverlay, setShowSubscriptionOverlay] = useState(false); // Add this state
  const recentSearches = [
    "Sleep",
    "Anxiety",
    "Mindfulness",
    "Body Scan",
    "Morning Boost",
    "Calming Music",
    "Gratitude",
  ];

  const allTrendingItems = [
    {
      id: 1,
      title: "Deep Sleep",
      discription: "Calm your mind and drift off easily",
      time: "8 min",
      image: appImages.background,
      gradient: ["rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 0.8)"],
      lock: true,
      category: "sleep",
      keywords: ["sleep", "deep", "calm", "rest", "night", "bedtime"],
    },
    {
      id: 2,
      title: "Nighttime Tranquility",
      discription: "Let go of the day's worries and find peaceful rest",
      time: "20 min",
      image: appImages.cardImage1,
      gradient: ["rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 0.8)"],
      lock: false,
      category: "sleep",
      keywords: [
        "nighttime",
        "tranquility",
        "peaceful",
        "rest",
        "sleep",
        "calm",
      ],
    },
    {
      id: 3,
      title: "Morning Meditation",
      discription: "Start your day with clarity and focus",
      time: "15 min",
      image: appImages.fullMoon,
      gradient: ["rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 0.8)"],
      lock: false,
      category: "morning",
      keywords: ["morning", "meditation", "clarity", "focus", "start", "day"],
    },
    {
      id: 4,
      title: "Anxiety Relief",
      discription: "Reduce stress and find inner peace",
      time: "12 min",
      image: appImages.cardImage1,
      gradient: ["rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 0.8)"],
      lock: true,
      category: "anxiety",
      keywords: ["anxiety", "stress", "relief", "peace", "calm", "relaxation"],
    },
    {
      id: 5,
      title: "Mindfulness Practice",
      discription: "Be present in the moment",
      time: "10 min",
      image: appImages.background,
      gradient: ["rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 0.8)"],
      lock: false,
      category: "mindfulness",
      keywords: ["mindfulness", "present", "moment", "awareness", "meditation"],
    },
    {
      id: 6,
      title: "Body Scan Meditation",
      discription: "Release tension throughout your body",
      time: "25 min",
      image: appImages.cardImage1,
      gradient: ["rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 0.8)"],
      lock: true,
      category: "body scan",
      keywords: [
        "body",
        "scan",
        "tension",
        "release",
        "relaxation",
        "physical",
      ],
    },
    {
      id: 7,
      title: "Gratitude Meditation",
      discription: "Cultivate appreciation and positive thinking",
      time: "8 min",
      image: appImages.background,
      gradient: ["rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 0.8)"],
      lock: false,
      category: "gratitude",
      keywords: [
        "gratitude",
        "appreciation",
        "positive",
        "thankful",
        "blessed",
      ],
    },
    {
      id: 8,
      title: "Calming Music",
      discription: "Soothing sounds for relaxation",
      time: "30 min",
      image: appImages.cardImage1,
      gradient: ["rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 0.8)"],
      lock: false,
      category: "music",
      keywords: [
        "music",
        "calming",
        "soothing",
        "sounds",
        "relaxation",
        "peaceful",
      ],
    },
  ];

  // Filter items based on search text
  const filteredItems = useMemo(() => {
    if (!searchText.trim()) {
      return allTrendingItems.slice(0, 2); // Show only first 2 items when no search
    }

    const searchLower = searchText.toLowerCase().trim();
    return allTrendingItems.filter(
      (item) =>
        item.title.toLowerCase().includes(searchLower) ||
        item.discription.toLowerCase().includes(searchLower) ||
        item.category.toLowerCase().includes(searchLower) ||
        item.keywords.some((keyword) =>
          keyword.toLowerCase().includes(searchLower)
        )
    );
  }, [searchText]);

  // Filter recent searches based on search text
  const filteredRecentSearches = useMemo(() => {
    if (!searchText.trim()) {
      return recentSearches;
    }

    const searchLower = searchText.toLowerCase().trim();
    return recentSearches.filter((item) =>
      item.toLowerCase().includes(searchLower)
    );
  }, [searchText]);

  const handleRecentSearchPress = (searchTerm: string) => {
    setSearchText(searchTerm);
  };

  const handleClearSearch = () => {
    setSearchText("");
  };

  const renderRecentSearchItem = (item: string, index: number) => (
    <TouchableOpacity
      key={index}
      style={styles.recentSearchItem}
      activeOpacity={0.8}
      onPress={() => handleRecentSearchPress(item)}
    >
      <Text style={styles.recentSearchText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderTrendingItem = (item: any) => (
    <ImageCard
      onPress={() => {
        item?.lock
          ? setShowSubscriptionOverlay(true)
          : router.navigate({ pathname: "/(tabs)/HomeTab/HomeMusicPlayer" });
      }}
      data={item}
    />
  );

  const handleCloseOverlay = () => {
    setShowSubscriptionOverlay(false);
  };

  const handleSubscribe = (plan: string) => {
    // Handle subscription logic here
    console.log("Selected plan:", plan);
    // setShowSubscriptionOverlay(false);
  };
  return (
    <ParentWrapper colors={colors}>
      <Header
        hideHeader={false}
        inVisibleHeader={false}
        colors={colors}
        statusBarColor={colors.transparent}
        barStyleWhiteColor={true}
        leftSideIcons={true}
        backIcon={true}
        extraMarginAtTop={true}
      />
      <MainWrapper colors={colors}>
        <View style={styles.container}>
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <BlurView intensity={10} tint="light" style={styles.searchBlurView}>
              <LinearGradient
                colors={[
                  "rgba(255, 255, 255, 0.2)",
                  "rgba(255, 255, 255, 0.1)",
                ]}
                style={styles.searchGradient}
              >
                <View style={styles.searchInputContainer}>
                  <Image
                    source={appImages.magnify}
                    style={styles.searchIcon}
                    resizeMode="contain"
                  />
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search..."
                    placeholderTextColor="white"
                    value={searchText}
                    onChangeText={setSearchText}
                  />
                  {searchText.length > 0 && (
                    <TouchableOpacity
                      onPress={handleClearSearch}
                      style={styles.clearButton}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.clearButtonText}>×</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </LinearGradient>
            </BlurView>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Recent Searches */}
            {filteredRecentSearches.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  {searchText.trim()
                    ? "Matching Recent Searches"
                    : "Recent Searches"}
                </Text>
                <View style={styles.recentSearchesContainer}>
                  {filteredRecentSearches.map((item, index) =>
                    renderRecentSearchItem(item, index)
                  )}
                </View>
              </View>
            )}

            {/* Trending Searches */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {searchText.trim()
                  ? `Recommended For You (${filteredItems.length})`
                  : "Trending Searches"}
              </Text>
              <View style={styles.trendingContainer}>
                {filteredItems.length > 0 ? (
                  filteredItems.map(renderTrendingItem)
                ) : (
                  <View style={styles.noResultsContainer}>
                    <Text style={styles.noResultsText}>
                      No results found for "{searchText}"
                    </Text>
                    <Text style={styles.noResultsSubtext}>
                      Try searching for sleep, anxiety, mindfulness, or other
                      meditation topics
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        </View>
      </MainWrapper>
      {/* Add the Subscription Overlay */}
      <SubscriptionOverlay
        visible={showSubscriptionOverlay}
        onClose={handleCloseOverlay}
        onSubscribe={handleSubscribe}
      />
    </ParentWrapper>
  );
};

export default HomeSearch;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(5),
    marginBottom: wp(35),
    marginTop: wp(6),
  },
  searchContainer: {
    marginBottom: wp(5),
  },
  searchBlurView: {
    borderRadius: wp(10),
    overflow: "hidden",
    height: wp(12),
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
   
  },
  searchGradient: {
    paddingHorizontal: wp(4),
    paddingVertical: wp(1.5),
       flex:1,
       alignItems:"center",justifyContent:"center"
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchIcon: {
    width: wp(5),
    height: wp(5),
    marginRight: wp(3),
    tintColor: "rgba(255, 255, 255, 0.6)",
  },
  searchInput: {
    flex: 1,
    fontSize: responsiveFontSize(1.8),
    fontFamily: FontFamily.appRegular,
    color: "white",
  },
  clearButton: {
    padding: wp(1),
    marginLeft: wp(2),
  },
  clearButtonText: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: responsiveFontSize(2.5),
    fontWeight: "bold",
  },
  section: {
    marginBottom: wp(8),
  },
  sectionTitle: {
    fontSize: responsiveFontSize(2.4),
    fontFamily: FontFamily.appMedium,
    color: "white",
    marginBottom: wp(4),
  },
  recentSearchesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: wp(3),
  },
  recentSearchItem: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: wp(4),
    paddingVertical: wp(2),
    borderRadius: wp(5),
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  recentSearchText: {
    fontSize: responsiveFontSize(1.6),
    fontFamily: FontFamily.appRegular,
    color: "white",
  },
  trendingContainer: {
    gap: wp(4),
  },
  noResultsContainer: {
    alignItems: "center",
    paddingVertical: wp(8),
  },
  noResultsText: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: FontFamily.appRegular,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    marginBottom: wp(2),
  },
  noResultsSubtext: {
    fontSize: responsiveFontSize(1.4),
    fontFamily: FontFamily.appRegular,
    color: "rgba(255, 255, 255, 0.6)",
    textAlign: "center",
  },
  trendingItem: {
    height: hp(20),
    borderRadius: wp(3),
    overflow: "hidden",
    position: "relative",
  },
  trendingImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  trendingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
  },
  trendingContent: {
    padding: wp(4),
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  trendingInfo: {
    flex: 1,
  },
  trendingTitle: {
    fontSize: responsiveFontSize(2.2),
    fontFamily: FontFamily.appRegular,
    color: "white",
    marginBottom: wp(1),
  },
  trendingSubtitle: {
    fontSize: responsiveFontSize(1.6),
    fontFamily: FontFamily.appRegular,
    color: "rgba(255, 255, 255, 0.8)",
  },
  durationContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: wp(2),
    paddingVertical: wp(1),
    borderRadius: wp(1),
    marginLeft: wp(3),
  },
  durationText: {
    fontSize: responsiveFontSize(1.4),
    fontFamily: FontFamily.appRegular,
    color: "white",
  },
});
