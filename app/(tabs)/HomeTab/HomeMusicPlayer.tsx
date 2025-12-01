import MusicPlayerBottomSheet from "@/components/BottomSheet";
import PlaylistModal from "@/components/PlaylistModal";
import { FontFamily } from "@/constants/Fonts";
import { appImages, globalStyles, hp, useTheme, wp } from "@/services";
import BottomSheet from "@gorhom/bottom-sheet";
import Slider from "@react-native-community/slider";
import { useAudioPlayerStatus } from "expo-audio";
import { BlurView } from "expo-blur";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, FlashAlert, Header } from "../../../components";
import { useLocalSearchParams } from "expo-router";
import { useAudio } from "@/contexts/AudioContext";

const experience = [
  {
    id: 0,
    icon: appImages.playlistImage,
    title: "Sleep Meditation",
    session: "8 Sessions",
  },
  {
    id: 1,
    icon: appImages.playlistImage,
    title: "Sleep Meditation",
    session: "8 Sessions",
  },
  {
    id: 2,
    icon: appImages.playlistImage,
    title: "Sleep Meditation",
    session: "8 Sessions",
  },
];

const images = [
  { icon: appImages.emoji1, name: "Happy" },
  { icon: appImages.emoji2, name: "Neutral" },
  { icon: appImages.emoji3, name: "stressed" },
  { icon: appImages.emoji4, name: "Sad" },
  { icon: appImages.emoji5, name: "Frustated" },
];

const HomeMusicPlayer = () => {
  const { data } = useLocalSearchParams();
  const parsedData = data ? JSON.parse(data as string) : null;

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [playlistName, setPlaylistName] = useState("");

  const { player, initializePlayer, setCurrentTrack, currentTrack, setIsVisible } = useAudio();
  const playerStatus = useAudioPlayerStatus(player);

  useEffect(() => {
    if (!playerStatus?.playing) {
      setIsVisible(false);
    }
    if (parsedData?.audioFile) {
      initializePlayer(parsedData.audioFile);
    } else {
      initializePlayer(require("@/assets/audio/naseed.mp3"));
    }
    if (parsedData) {
      setCurrentTrack({
        title: parsedData?.title ?? "Lion's Breath",
        artist: parsedData?.description ?? "Sleep meditation",
        artwork: parsedData?.image ?? appImages.musicImage,
      });
    }
  }, []);

  const handleSave = () => {
    console.log("Playlist saved: ", playlistName);
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    if (playerStatus && !isSliding) {
      setCurrentTime(playerStatus.currentTime || 0);
      setDuration(playerStatus.duration || 0);
    }
  }, [playerStatus, isSliding]);

  const togglePlayback = async () => {
    if (!player) return;

    if (playerStatus?.playing) {
      player.pause();
      setIsVisible(false);
    } else {
      player.play();
      setIsVisible(true);
    }
  };

  const replaySound = async () => {
    if (!player) return;
    player.seekTo(0);
    player.play();
  };

  const skipForward = async () => {
    if (!player) return;
    const newTime = Math.min(currentTime + 15, duration);
    player.seekTo(newTime);
  };

  const skipBackward = async () => {
    if (!player) return;
    const newTime = Math.max(currentTime - 15, 0);
    player.seekTo(newTime);
  };

  const onSliderValueChange = (value: number) => {
    setCurrentTime(value);
  };

  const onSliderSlidingStart = () => {
    setIsSliding(true);
  };

  const onSliderSlidingComplete = async (value: number) => {
    setIsSliding(false);
    if (player) {
      player.seekTo(value);
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const { bottom } = useSafeAreaInsets();
  const [isCreated, setIsCreated] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isBottomSheetOpen1, setIsBottomSheetOpen1] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const bottomSheetRef1 = useRef<BottomSheet>(null);
  const [playlistModal, setPlaylistModal] = useState(false);
  const [playlistModal1, setPlaylistModal1] = useState(false);
  const [feelings, setFeelings] = useState(false);

  const openBottomSheet = () => {
    setIsBottomSheetOpen(true);
    bottomSheetRef.current?.expand();
  };

  const closeBottomSheet = () => {
    setIsBottomSheetOpen(false);
    bottomSheetRef.current?.close();
  };

  const openBottomSheet1 = () => {
    setIsBottomSheetOpen1(true);
    bottomSheetRef1.current?.expand();
  };

  const closeBottomSheet1 = () => {
    setIsBottomSheetOpen1(false);
    bottomSheetRef1.current?.close();
  };

  const renderItemExperience = ({
    item,
    index,
  }: {
    item: (typeof experience)[0];
    index: number;
  }) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: wp(4),
      }}
    >
      <TouchableOpacity
        onPress={() => bottomSheetRef1.current?.close()}
        style={{
          flexDirection: "row",
          alignItems: "center",
          flex: 1,
          overflow: "hidden",
          borderRadius: 10,
        }}
        activeOpacity={0.8}
      >
        <Image
          source={item.icon}
          style={{ height: wp(12), width: wp(12), marginRight: wp(5) }}
        />
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.desc}>{item.session}</Text>
        </View>
      </TouchableOpacity>

      {index === experience.length - 1 && (
        <TouchableOpacity
          onPress={() => {
            bottomSheetRef1.current?.close();
            setPlaylistModal(true);
          }}
          activeOpacity={0.8}
        >
          <Image
            source={appImages.newPlaylist}
            style={{ height: wp(9.2), width: wp(35.8) }}
          />
        </TouchableOpacity>
      )}
    </View>
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

  useEffect(() => {
    if (
      playerStatus?.duration &&
      playerStatus?.currentTime &&
      playerStatus.currentTime >= playerStatus.duration - 0.5 &&
      !playerStatus.playing
    ) {
      setFeelings(true);
    }
  }, [playerStatus]);

  return (
    <ImageBackground
      style={{
        flex: 1,
        width: wp(100),
        justifyContent: "flex-end",
      }}
      source={appImages.musicImage}
      resizeMode="cover"
    >
      {feelings && (
        <BlurView tint="dark" intensity={50} style={styles.darkOverlay}>
          <Text
            style={[
              {
                marginVertical: 2,
                marginBottom: wp(30),
                color: "white",
                fontFamily: FontFamily?.appRegular,
                fontSize: responsiveFontSize(2.0),
                lineHeight: 30,
              },
            ]}
          >
            Session Completed
          </Text>
          <Image
            source={appImages.musicImage}
            resizeMode="contain"
            style={{ height: wp(40), width: wp(40), marginBottom: wp(8) }}
          />
          <Text style={[globalStyles.title, { marginVertical: 2 }]}>
            {parsedData?.title ?? "Lion's Breath"}
          </Text>
          <Text style={[globalStyles.subtitle, { marginTop: 0 }]}>
            Sleep meditation
          </Text>
        </BlurView>
      )}
      {!feelings && (
        <Header
          changeHeaderView={{ position: "absolute", top: wp(4) }}
          hideHeader={false}
          inVisibleHeader={false}
          colors={colors}
          leftSideIcons={true}
          backIcon={true}
          extraMarginAtTop={true}
        />
      )}
      {!feelings && (
        <BlurView
          intensity={30}
          tint="dark"
          style={[
            {
              borderRadius: wp(6),
              overflow: "hidden",
              height: hp(45),
              backgroundColor: "#0F172A4D",
              paddingBottom: bottom,
            },
          ]}
        >
          <View style={styles.contentContainer}>
            {/* Track Info */}
            <View style={styles.trackInfo}>
              <View style={{}}>
                <Text style={[globalStyles.title, { marginVertical: 0 }]}>
                  {parsedData?.title ?? currentTrack?.title ?? "Lion's Breath"}
                </Text>
                <View style={{ width: wp(75) }}>
                  <Text style={[globalStyles.subtitle, { marginTop: 0 }]}>
                    {parsedData?.description ?? currentTrack?.artist ?? "Sleep meditation"}
                  </Text>
                </View>
              </View>
              <Image
                source={appImages.share}
                style={{ height: wp(11.1), width: wp(11) }}
              />
            </View>

            {/* Controls */}
            <View style={styles.controlsContainer}>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={() => {
                  console.log("Save pressed");
                  setModalVisible(true);
                  bottomSheetRef1.current?.expand();
                }}
              >
                <Image
                  source={appImages.save}
                  style={{ height: wp(8.1), width: wp(36.35) }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={() => {
                  FlashAlert({
                    title: "Downloading...",
                    type: "I",
                    position: "bottom",
                  });
                  console.log("Download pressed");
                }}
              >
                <Image
                  source={appImages.download}
                  style={{ height: wp(8.15), width: wp(27.5) }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={() => {
                  FlashAlert({
                    title: "Liked",
                    type: "I",
                    position: "bottom",
                  });
                  console.log("Like pressed");
                }}
              >
                <Image
                  source={appImages.like}
                  style={{ height: wp(8.1), width: wp(16.9) }}
                />
              </TouchableOpacity>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressContainer}>
              <Slider
                style={styles.progressBar}
                minimumValue={0}
                maximumValue={duration}
                value={currentTime}
                onValueChange={onSliderValueChange}
                onSlidingStart={onSliderSlidingStart}
                onSlidingComplete={onSliderSlidingComplete}
                minimumTrackTintColor={colors.primary}
                maximumTrackTintColor="#A4A4A4"
                thumbTintColor={colors.primary}
              />
              <View style={styles.timeContainer}>
                <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
                <Text style={styles.timeText}>{formatTime(duration)}</Text>
              </View>
            </View>

            {/* Audio Controls */}
            <View style={styles.audioControlsContainer}>
              <TouchableOpacity
                style={styles.audioControlButton}
                onPress={() => {}}
              >
                <Image
                  source={appImages.timer}
                  style={styles.audioControlIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.audioControlButton}
                onPress={skipBackward}
              >
                <Image
                  source={appImages.backward}
                  style={styles.audioControlIcon}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.playButton}
                onPress={togglePlayback}
              >
                <Image
                  source={
                    playerStatus.playing ? appImages.pause : appImages.play
                  }
                  style={[
                    styles.playIcon,
                    { marginLeft: playerStatus.playing ? wp(0) : wp(1.2) },
                  ]}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.audioControlButton}
                onPress={skipForward}
              >
                <Image
                  source={appImages.forward}
                  style={styles.audioControlIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.audioControlButton}
                onPress={() => {
                  bottomSheetRef.current?.expand();
                }}
              >
                <Image
                  source={appImages.loop}
                  style={[
                    styles.audioControlIcon,
                    { width: wp(4), height: wp(4), tintColor: "white" },
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      )}
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
              How are you feeling after the session?
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
                colors={colors}
                children={"Continue"}
                onPress={() => {
                  setFeelings(false);
                  player.seekTo(0);
                  setIsVisible(true);
                }}
              />
            </View>
          </View>
        </BlurView>
      )}
      <MusicPlayerBottomSheet
        isOpen={isBottomSheetOpen1}
        onClose={closeBottomSheet1}
        bottomSheetRef={bottomSheetRef1}
        snapPoints={!isCreated ? [hp(40)] : [hp(45)]}
      >
        <Pressable
          onPress={() => {
            bottomSheetRef1.current?.close();
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
        <View style={{ marginTop: wp(10) }}>
          <Text
            onPress={() => {
              bottomSheetRef.current?.close();
              setPlaylistModal(true);
            }}
            style={[
              {
                color: colors.white,
                fontFamily: FontFamily.appMedium,
                fontSize: responsiveFontSize(2.0),
                marginTop: wp(3),
                marginBottom: isCreated ? wp(5) : wp(2),
              },
            ]}
          >
            Add to playlist
          </Text>
          {isCreated ? (
            <>
              <FlatList
                scrollEnabled
                data={experience}
                renderItem={renderItemExperience}
                keyExtractor={(item) => item.id.toString()}
              />
            </>
          ) : (
            <>
              <Image
                source={appImages.tunes}
                style={{
                  height: wp(10),
                  width: wp(10),
                  alignSelf: "center",
                  marginTop: wp(5),
                }}
              />
              <Text
                onPress={() => {
                  bottomSheetRef.current?.close();
                  setTimeout(() => {
                    setPlaylistModal1(true);
                  }, 200);
                }}
                style={[
                  {
                    color: colors.white,
                    fontFamily: FontFamily.appMedium,
                    fontSize: responsiveFontSize(2.0),
                    marginTop: wp(3),
                    textAlign: "center",
                  },
                ]}
              >
                You haven't created any playlists
              </Text>
              <Pressable
                onPress={() => {
                  setPlaylistModal(true);
                }}
              >
                <Image
                  source={appImages.newPlaylist}
                  style={{
                    height: wp(10.35),
                    width: wp(40.2),
                    alignSelf: "center",
                    marginTop: wp(5),
                  }}
                />
              </Pressable>
            </>
          )}
        </View>
      </MusicPlayerBottomSheet>
      <MusicPlayerBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={closeBottomSheet}
        bottomSheetRef={bottomSheetRef}
        snapPoints={[hp(50)]}
      >
        {/* Your music player content goes here */}

        <Pressable
          onPress={() => {
            bottomSheetRef.current?.close();
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

        <View style={{ marginTop: wp(10) }}>
          <Text
            onPress={() => {
              // bottomSheetRef.current?.close();
            }}
            style={[
              {
                color: colors.white,
                fontFamily: FontFamily.appMedium,
                fontSize: responsiveFontSize(2.0),
                marginTop: wp(3),
                lineHeight: 30,
              },
            ]}
          >
            Set Timer
          </Text>
          {[
            "5 min",
            "10 min",
            "15 min",
            "30 min",
            "45 min",
            "1 hour",
            "Until Stopped",
          ].map((time, index) => (
            <Text
              key={index}
              onPress={() => {
                bottomSheetRef.current?.close();
              }}
              style={[
                {
                  color: colors.white,
                  fontFamily: FontFamily.appRegular,
                  fontSize: responsiveFontSize(1.6),
                  marginTop: wp(3),
                },
              ]}
            >
              {time}
            </Text>
          ))}
        </View>
      </MusicPlayerBottomSheet>
      <PlaylistModal
        title="New Playlist"
        placeholder="Give your playlist a title "
        setModalVisible={() => {
          setPlaylistModal(!playlistModal);
        }}
        handleSave={() => {
          setIsCreated(true);
          setPlaylistModal(false);
        }}
        modalVisible={playlistModal}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  listContent: {
    marginVertical: wp(2),
  },
  listContentRecommended: {
    marginTop: wp(2),
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
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "transparent", // Fixed typo: "trnaparent" -> "transparent"
    width: "80%",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: responsiveFontSize(2.0),
    fontFamily: FontFamily?.appMedium,
    color: "white",
    marginBottom: 10,
    textAlign: "left",
  },
  input: {
    width: "100%",
    borderColor: "#8A9A9D",
    borderBottomWidth: wp(0.3),
    padding: wp(4),
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    justifyContent: "center",
    height: wp(14),
    borderRadius: wp(7),
    borderWidth: wp(0.3),
    borderColor: "#007BFF",
    margin: 5,
    flex: 1,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  button1: {
    justifyContent: "center",
    height: wp(14),
    borderRadius: wp(7),
    backgroundColor: "#007BFF",
    margin: 5,
    flex: 1,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontFamily: FontFamily?.appMedium,
    fontSize: responsiveFontSize(1.8),
  },
  // Add missing styles for FlatList items
  // Add dark overlay style
  darkOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 0,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: wp(20),
  },
  title: {
    color: "white",
    fontFamily: FontFamily?.appRegular,
    fontSize: responsiveFontSize(2.0),
    lineHeight: 30,
  },
  desc: {
    color: "white",
    fontFamily: FontFamily?.appLight,
    fontSize: responsiveFontSize(1.2),
  },
});

export default HomeMusicPlayer;
