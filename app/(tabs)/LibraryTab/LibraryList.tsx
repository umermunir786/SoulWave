import { FlashAlert, Header, MainWrapper, ParentWrapper } from "@/components";
import MusicPlayerBottomSheet from "@/components/BottomSheet";
import PlaylistModal from "@/components/PlaylistModal";

import { FontFamily } from "@/constants/Fonts";
import { api } from "@/network/Environment";
import { callApi, Method } from "@/network/NetworkManger";
import { appImages, useTheme, wp } from "@/services";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";

const experience = [
  {
    id: 0,
    icon: appImages.playlistImage,
    title: "Sleep Meditation",
    session: "Meditation Session",
  },
  {
    id: 1,
    icon: appImages.playlistImage,
    title: "Sleep Meditation",
    session: "Meditation Session",
  },
  {
    id: 2,
    icon: appImages.playlistImage,
    title: "Sleep Meditation",
    session: "Meditation Session",
  },
  {
    id: 3,
    icon: appImages.playlistImage,
    title: "Sleep Meditation",
    session: "Meditation Session",
  },
];
const LibraryList = () => {
  const { colors } = useTheme();
  const { type, playlistID } = useLocalSearchParams();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isBottomSheetOpen1, setIsBottomSheetOpen1] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const bottomSheetRef1 = useRef<BottomSheet>(null);
  const [newPlaylistTitle, setNewPlaylistTitle] = useState(type ?? "");
  const [playlistModal, setPlaylistModal] = useState(false);
  const [playlistModal1, setPlaylistModal1] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);

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

  const renderItemExperience = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        // router.navigate({ pathname: "/(tabs)/SoundTab/SoundLibrary" });
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
            style={{
              height: wp(16),
              width: wp(16),
              marginRight: wp(3),
              borderRadius: wp(4),
            }}
            resizeMode="cover"
          />
          <View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.session}</Text>
          </View>
        </View>
        {/* Toggle tick icon background based on selection */}
        <Pressable onPress={openBottomSheet1}>
          <Image
            style={{
              height: wp(7),
              width: wp(7),
            }}
            source={appImages.dots}
          />
        </Pressable>
      </BlurView>
    </TouchableOpacity>
  );

  const updatePlayList = async () => {
    try {
      setIsLoading(true);
      const body = {
         name: newPlaylistTitle,
      };
      const onSuccess = (res: any) => {
        console.log("res---------", res);
        setIsLoading(false);
        setPlaylistModal(false);
        FlashAlert({
          title: "Playlist updated",
          type: "I",
          position: "bottom",
        });
      };
      const onError = (error: any) => {
        console.log("error", error);
        setIsLoading(false);
        setPlaylistModal(false);
        setNewPlaylistTitle(type ?? "");
      };
      const endPoint = `${api.playlists}/${playlistID}`;
      const method = Method.PATCH;

      callApi(method, endPoint, body, onSuccess, onError);
    } catch (error) {
      console.log("Error during image uploads:", error);
    }
  };

  const deletePlayList = async () => {
    try {
      setIsLoading(true);
      const body = {};
      const onSuccess = (res: any) => {
        console.log("res---------", res);
        setIsLoading(false);
        setPlaylistModal1(false);
        FlashAlert({
          title: "Playlist deleted",
          type: "I",
          position: "bottom",
        });
        router.back();
      };
      const onError = (error: any) => {
        console.log('error', error)
        setIsLoading(false);
      };
      const endPoint = `${api.playlists}/${playlistID}`;
      const method = Method.DELETE;

      callApi(method, endPoint, body, onSuccess, onError);
    } catch (error) {
      console.log("Error during image uploads:", error);
    }
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
        centerTitle={""}
        backIcon={true}
        rightSideIcons={true}
        extraMarginAtTop={true}
        onPressRight={openBottomSheet}
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
          <Image
            style={{
              height: wp(65),
              width: wp(65),
              overflow: "hidden",
              borderRadius: wp(4),
              alignSelf: "center",
            }}
            resizeMode="stretch"
            source={appImages.playlistTumb}
          />

          <Text style={styles.name}>{newPlaylistTitle}</Text>
          <FlatList
            scrollEnabled={false}
            data={experience}
            renderItem={renderItemExperience}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </MainWrapper>
      <MusicPlayerBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={closeBottomSheet}
        bottomSheetRef={bottomSheetRef}
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
              bottomSheetRef.current?.close();
              setPlaylistModal(true);
            }}
            style={[
              {
                color: colors.white,
                fontFamily: FontFamily.appMedium,
                fontSize: responsiveFontSize(2.0),
                marginTop: wp(3),
              },
            ]}
          >
            Edit Playlist
          </Text>
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
              },
            ]}
          >
            Delete Playlist
          </Text>
          <Text
            onPress={() => {
              router.navigate({ pathname: "/(tabs)/HomeTab/HomeMusicPlayer" });
            }}
            style={[
              {
                color: colors.white,
                fontFamily: FontFamily.appMedium,
                fontSize: responsiveFontSize(2.0),
                marginTop: wp(3),
              },
            ]}
          >
            Play Playlist
          </Text>
        </View>
      </MusicPlayerBottomSheet>
      <MusicPlayerBottomSheet
        isOpen={isBottomSheetOpen1}
        onClose={closeBottomSheet1}
        bottomSheetRef={bottomSheetRef1}
      >
        {/* Your music player content goes here */}

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
              bottomSheetRef1.current?.close();
              router.navigate({ pathname: "/(tabs)/HomeTab/HomeMusicPlayer" });
            }}
            style={[
              {
                color: colors.white,
                fontFamily: FontFamily.appMedium,
                fontSize: responsiveFontSize(2.0),
                marginTop: wp(3),
              },
            ]}
          >
            Play Session
          </Text>
          <Text
            onPress={() => {
              bottomSheetRef1.current?.close();
              // setTimeout(() => {
              //   setPlaylistModal1(true);
              // }, 200);
            }}
            style={[
              {
                color: colors.white,
                fontFamily: FontFamily.appMedium,
                fontSize: responsiveFontSize(2.0),
                marginTop: wp(3),
              },
            ]}
          >
            Remove from Playlist
          </Text>
          <Text
            onPress={() => {
              bottomSheetRef1.current?.close();
              FlashAlert({
                title: "Downloading...",
                type: "I",
                position: "bottom",
              });
            }}
            style={[
              {
                color: colors.white,
                fontFamily: FontFamily.appMedium,
                fontSize: responsiveFontSize(2.0),
                marginTop: wp(3),
              },
            ]}
          >
            Download Session
          </Text>
        </View>
      </MusicPlayerBottomSheet>

      <PlaylistModal
        title="Edit Playlist Name"
        setModalVisible={() => {
          setPlaylistModal(!playlistModal);
        }}
        yesTitle={IsLoading ? "Updating..." : "Save"}
        playlistName={newPlaylistTitle}
        setPlaylistName={setNewPlaylistTitle}
        handleSave={() => {
          updatePlayList();
        }}
        modalVisible={playlistModal}
      />
      <PlaylistModal
        titleStyle={{ textAlign: "center" }}
        noTitle="No"
        yesTitle={IsLoading ? "Deleting..." : "Yes"}
        title="Delete Playlist"
        subtitle={"Are you sure you want to delete playlist?"}
        setModalVisible={() => {
          setPlaylistModal1(!playlistModal1);
        }}
        handleSave={() => {
          deletePlayList();
        }}
        modalVisible={playlistModal1}
      />
    </ParentWrapper>
  );
};

export default LibraryList;

const styles = StyleSheet.create({
  title: {
    fontFamily: FontFamily.appRegular,
    fontSize: responsiveFontSize(2.0),
    color: "white",
    lineHeight: 30,
  },
  name: {
    fontFamily: FontFamily.appMedium,
    fontSize: responsiveFontSize(2.8),
    color: "white",
    lineHeight: 42,
    textAlign: "center",
    marginVertical: wp(4),
  },
  desc: {
    fontFamily: FontFamily.appLight,
    fontSize: responsiveFontSize(1.2),
    color: "white",
  },
});
