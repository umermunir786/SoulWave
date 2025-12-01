// components/MiniPlayer/MiniPlayer.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useAudio } from "@/contexts/AudioContext";
import { useAudioPlayerStatus } from "expo-audio";
import { useRouter, usePathname } from "expo-router";
import { wp } from "@/services";
import { appImages } from "@/services";
import { FontFamily } from "@/constants/Fonts";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const MiniPlayer = () => {
  const { player, currentTrack, setCurrentTrack, isVisible, setIsVisible } =
    useAudio();
  const playerStatus = useAudioPlayerStatus(player);
  const router = useRouter();
  const pathname = usePathname();
  const { bottom } = useSafeAreaInsets();

  if (!currentTrack || !player || !isVisible) {
    return null;
  }

  if (
    pathname.includes("music-player") ||
    pathname.includes("HomeMusicPlayer")
  ) {
    return null;
  }

  const isPlaying = playerStatus?.playing || false;

  const isTabScreen =
    pathname === "/HomeTab/Home" ||
    pathname === "/SoundTab/Sounds" ||
    pathname === "/SoundTab" ||
    pathname === "/LibraryTab/Library" ||
    pathname === "/LibraryTab" ||
    pathname === "/ProfileTab/Profile" ||
    pathname === "/ProfileTab";

  const handlePress = () => {
    router.push("/HomeTab/HomeMusicPlayer");
  };

  const togglePlayback = () => {
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
  };

  const handleClose = () => {
    player.pause();
    setIsVisible(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <View
      style={[
        styles.container,
        isTabScreen ? styles.aboveTabBar : styles.atBottom,
        !isTabScreen && { paddingBottom: bottom || 10 },
      ]}
    >
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBar,
            {
              width: `${
                playerStatus?.duration
                  ? (playerStatus.currentTime / playerStatus.duration) * 100
                  : 0
              }%`,
            },
          ]}
        />
      </View>

      <TouchableOpacity
        style={styles.content}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        {currentTrack.artwork ? (
          <Image source={currentTrack.artwork} style={styles.artwork} />
        ) : (
          <View style={styles.artworkPlaceholder}>
            <Image
              source={appImages.musicIcon || appImages.logo}
              style={styles.musicIcon}
            />
          </View>
        )}

        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={1}>
            {currentTrack.title}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {currentTrack.artist}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {formatTime(playerStatus?.currentTime || 0)}
          </Text>
        </View>

        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation();
            togglePlayback();
          }}
          style={styles.playButton}
        >
          <Image
            source={isPlaying ? appImages.pause : appImages.play}
            style={styles.playIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          style={styles.closeButton}
        >
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderTopWidth: 1,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    zIndex: 999,
  },
  aboveTabBar: {
    bottom: wp(30),
    marginHorizontal: wp(5),
    borderRadius: wp(1.5),

  },
  atBottom: {
    bottom: 0,
  },
  progressBarContainer: {
    height: 2,
    backgroundColor: "#333",
    width: "100%",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#1E90FF",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp(3),
    paddingVertical: wp(2),
    height: wp(18),
  },
  artwork: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(1.5),
  },
  artworkPlaceholder: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(1.5),
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  musicIcon: {
    width: wp(6),
    height: wp(6),
    tintColor: "#fff",
  },
  info: {
    flex: 1,
    marginLeft: wp(3),
    marginRight: wp(2),
  },
  title: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: "600",
    color: "#fff",
    marginBottom: wp(0.5),
    fontFamily: FontFamily.appMedium,
  },
  artist: {
    fontSize: responsiveFontSize(1.3),
    color: "#999",
    fontFamily: FontFamily.appRegular,
  },
  playButton: {
    width: wp(10),
    height: wp(10),
    justifyContent: "center",
    alignItems: "center",
    marginRight: wp(2),
  },
  playIcon: {
    width: wp(6),
    height: wp(6),
    tintColor: "#fff",
  },
  closeButton: {
    width: wp(8),
    height: wp(8),
    justifyContent: "center",
    alignItems: "center",
  },
  closeText: {
    color: "#999",
    fontSize: responsiveFontSize(2),
    fontWeight: "300",
  },
});
