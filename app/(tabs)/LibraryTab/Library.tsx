import { FlashAlert, Header, MainWrapper, ParentWrapper } from "@/components";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import PlaylistModal from "@/components/PlaylistModal";
import { FontFamily } from "@/constants/Fonts";
import { api } from "@/network/Environment";
import { callApi, Method } from "@/network/NetworkManger";
import { appImages, useTheme, wp } from "@/services";
import { useFocusEffect } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
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

const download = [
  {
    id: 0,
    icon: appImages.downloadSquare,
    title: "Downloads",
    session: "20 Sessions",
  },
  {
    id: 1,
    icon: appImages.heartSquare,
    title: "Likes",
    session: "20 Sessions",
  },
];
const Library = () => {
  const { colors } = useTheme();
  const [playlistModal, setPlaylistModal] = useState(false);
  const [playlist, setPlaylist] = useState<string[]>([]);
  const [newPlaylistTitle, setNewPlaylistTitle] = useState("");
  const [newPlaylistLoading, setNewPlaylistLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      getPlaylist();
    }, [])
  );

  const getPlaylist = async () => {
    try {
      const body = {};
      const onSuccess = (res: any) => {
        setPlaylist(res?.data?.playlists);
        setIsLoading(false);
      };
      const onError = (error: any) => {
        setIsLoading(false);
      };
      const endPoint = api.playlists;
      const method = Method.GET;

      callApi(method, endPoint, body, onSuccess, onError);
    } catch (error) {
      console.log("Error during image uploads:", error);
    }
  };

  const createPlaylist = async () => {
    try {
      setNewPlaylistLoading(true);
      const body = {
        name: newPlaylistTitle,
      };
      const onSuccess = (res: any) => {
        setNewPlaylistTitle("");
        setPlaylistModal(false);
        setNewPlaylistLoading(false);
        FlashAlert({
          title: "Playlist created successfully",
          description: "Your playlist has been created",
          type: "S",
        });
        if (res?.data) {
         setPlaylist((prev) => [res?.data, ...prev]);
        }
      };
      const onError = (error: any) => {
        setNewPlaylistLoading(false);
        FlashAlert({
          title: error?.message,
          description: "Failed to create playlist",
          type: "E",
        });
      };
      const endPoint = api.playlists;
      const method = Method.POST;

      callApi(method, endPoint, body, onSuccess, onError);
    } catch (error) {
      console.log("Error during image uploads:", error);
    }
  };

  const renderItemPlaylist = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        router.navigate({
          pathname: "/(tabs)/LibraryTab/LibraryList",
          params: { type: item?.name, playlistID: item?._id },
        });
      }}
      style={{ overflow: "hidden", borderRadius: 10, marginBottom: wp(4) }}
      activeOpacity={0.8}
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
            source={appImages.playlistImage}
            style={{
              height: wp(16),
              width: wp(16),
              marginRight: wp(3),
              borderRadius: wp(4),
            }}
          />
          <View>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.desc}>{item.session ?? "20 Sessions"}</Text>
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
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        router.navigate({
          pathname: "/(tabs)/LibraryTab/LibraryList",
          params: { type: item?.id == "0" ? "Downloads" : "Likes" },
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
            style={{
              height: wp(16),
              width: wp(16),
              marginRight: wp(3),
            }}
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
        statusBarColor={colors.transparent}
        barStyleWhiteColor={true}
        leftSideIcons={false}
        centerTitle={"My Playlists"}
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
          <Pressable
            onPress={() => {
              setPlaylistModal(true);
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: wp(6),
            }}
          >
            <Image
              source={appImages.plusCircle}
              style={{ height: wp(14), width: wp(14), marginRight: wp(3) }}
            />

            <Text style={styles.create}>{"Create New Playlist"}</Text>
          </Pressable>
          <FlatList
            scrollEnabled={false}
            data={download}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
          <FlatList
            scrollEnabled={false}
            data={playlist}
            renderItem={renderItemPlaylist}
            keyExtractor={(item) => item._id.toString()}
          />
        </View>
      </MainWrapper>
      <PlaylistModal
        title="New Playlist"
        yesTitle={newPlaylistLoading ? "Creating..." : "Save"}
        setModalVisible={() => {
          setPlaylistModal(!playlistModal);
        }}
        playlistName={newPlaylistTitle}
        setPlaylistName={setNewPlaylistTitle}
        handleSave={() => {
          createPlaylist();
        }}
        modalVisible={playlistModal}
      />
      {isLoading && (
        <LoadingOverlay visible={isLoading} message="Getting your playlist..." />
      )}
    </ParentWrapper>
    
  );
};

export default Library;

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
  create: {
    fontFamily: FontFamily.appMedium,
    fontSize: responsiveFontSize(2.0),
    color: "white",
    lineHeight: 30,
  },
});
