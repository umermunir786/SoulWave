import { FontFamily } from "@/constants/Fonts";
import { hp, wp } from "@/services";
import { BlurView } from "expo-blur";
import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { responsiveFontSize } from "react-native-responsive-dimensions";

const PlaylistModal = ({
  modalVisible,
  setModalVisible,
  playlistName,
  setPlaylistName,
  handleSave,
  title = "New Playlist",
  placeholder = "Give your playlist a title",
  subtitle = "",
  titleStyle = {},
  noTitle = "Cancel",
  yesTitle = "Save",
}: {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  playlistName: string;
  setPlaylistName: (name: string) => void;
  handleSave: () => void;
  title?: string;
  placeholder?: string;
  subtitle: string;
  titleStyle: object;
  noTitle: string;
  yesTitle: string;
}) => {
  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      statusBarTranslucent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalBackground}>
        <BlurView
          intensity={30}
          tint="dark"
          style={[
            {
              borderRadius: wp(6),
              overflow: "hidden",
              height: hp(32),
              backgroundColor: "#101010CC",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <View style={styles.modalContainer}>
            <Text style={[styles.modalTitle, titleStyle]}>{title}</Text>
            {subtitle ? (
              <Text style={styles.modalSubTitle}>{subtitle}</Text>
            ) : (
              <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={playlistName}
                placeholderTextColor="#8A9A9D"
                onChangeText={setPlaylistName}
                
              />
            )}
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleCancel} style={styles.button} activeOpacity={0.8}>
                <Text style={styles.buttonText}>{noTitle}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave} style={styles.button1} activeOpacity={0.8}>
                <Text style={styles.buttonText}>{yesTitle}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      </View>
    </Modal>
  );
};

export default PlaylistModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    backgroundColor: "transparent",
    width: "90%",
    padding: wp(4),
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: responsiveFontSize(2.0),
    fontFamily: FontFamily?.appMedium,
    color: "white",
    marginBottom: 10,
    textAlign: "left",
    lineHeight: 30,
  },
  modalSubTitle: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: FontFamily?.appRegular,
    color: "#8A9A9D",

    marginBottom: 10,
    textAlign: "center",
    lineHeight: 30,
  },
  input: {
    width: wp(82),
    borderColor: "#8A9A9D",
    borderBottomWidth: wp(0.3),
    borderRadius: 5,
    marginBottom: 20,
    color:"white"
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
});
