import { FontFamily } from "@/constants/Fonts";
import { api } from "@/network/Environment";
import { callApi, Method } from "@/network/NetworkManger";
import { appImages, useOrientation } from "@/services";
import { BlurView } from "expo-blur";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { FlashAlert } from "../flashMessage";
import Spinner from "../Spinner";

interface ThemeColors {
  background: string;
  backgroundInverse: string;
  primaryThemeColor: string;
  secondaryThemeColor: string;
  linearGradientOrangeColor: string;
  linearGradientBlackColor: string;
  text: string;
  textGrey: string;
  redColor: string;
  transparent: string;
  disabled: string;
  onBoardingButton: string;
  inputFieldBackground: string;
  placeholderTextColor: string;
  graphBackground: string;
}

interface AlertModalProps {
  visible: boolean;
  onClose: () => void;
  colors: ThemeColors;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  visible,
  onClose,
  colors,
}) => {
  const { windowWidth, windowHeight, isPortrait, wp, hp } = useOrientation();
  const styles = createStyles(
    colors,
    windowWidth,
    windowHeight,
    isPortrait,
    wp,
    hp
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [notifications, setNotifications] = useState<any[]>([]);

  const handleFetchNotifications = async (): Promise<void> => {
    try {
      await callApi(
        Method.GET,
        api.notification,
        {},
        (res: any) => {
          console.log(res);
          setNotifications(res.data); // Setting the response data directly to state
          setIsLoading(false);
        },
        (error: any) => {
          console.log("error", error);
          FlashAlert({ type: "E", title: error.message, description: "" });
          setIsLoading(false);
        }
      );
    } catch (error: any) {
      console.log("catch-error", error);
      setIsLoading(false);
    }
  };

  // Trigger fetching notifications when the modal is opened
  useFocusEffect(
    useCallback(() => {
      if (visible) {
        handleFetchNotifications();
      }
    }, [visible])
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {visible && (
        <StatusBar
          barStyle="light-content"
          backgroundColor="rgba(0,0,0,0.3)"
          animated
        />
      )}
      <BlurView intensity={80} tint="dark" style={StyleSheet.absoluteFill} />
      <Pressable onPress={onClose} style={styles.overlay}>
        <TouchableWithoutFeedback>
          <View style={styles.modalContainer}>
            <BlurView
              intensity={20}
              tint="dark"
              style={StyleSheet.absoluteFill}
            />

            <View style={styles.titleUnderline} />
            <Text style={styles.title}>Alerts</Text>
            {isLoading ? (
              <Spinner style={{ flex: 1 }} />
            ) : notifications.length === 0 ? (
              <Text style={styles.noNotificationText}>
                There are no notifications at the moment. Please check back
                later.
              </Text>
            ) : (
              <FlatList
                data={notifications}
                scrollEnabled
                keyExtractor={(item) => item._id} // Ensure the keyExtractor uses unique ID
                contentContainerStyle={{
                  paddingBottom: isPortrait ? wp(10) : hp(10),
                }}
                renderItem={({ item }) => (
                  <View style={styles.card}>
                    <Image
                      source={
                        item?.notifyType === "weather"
                          ? appImages.heavyRainIcon
                          : appImages.robberyIcon
                      } // Add appropriate icons based on the notifyType
                      resizeMode="contain"
                      style={styles.imageStyle}
                    />
                    <View style={styles.cardContent}>
                      <Text style={styles.cardTitle}>{item.title}</Text>
                      <View style={styles.lineWithDescriptionView}>
                        <View style={styles.line} />
                        <Text style={styles.cardDesc}>{item.body}</Text>
                      </View>
                      <Text style={styles.cardTime}>
                        {new Date(item.createdAt).toLocaleString()}{" "}
                        {/* Formatting the time */}
                      </Text>
                    </View>
                  </View>
                )}
              />
            )}
          </View>
        </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  );
};

const createStyles = (
  colors: ThemeColors,
  windowWidth: number,
  windowHeight: number,
  isPortrait: boolean,
  wp: any,
  hp: any
) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(0,0,0,0.3)",
    },
    modalContainer: {
      height: "80%",
      borderTopLeftRadius: isPortrait ? wp(10) : hp(5),
      borderTopRightRadius: isPortrait ? wp(10) : hp(5),
      overflow: "hidden",
      paddingTop: isPortrait ? wp(2) : hp(2),
      paddingHorizontal: isPortrait ? wp(5) : hp(5),
      backgroundColor: "rgba(0,0,0,0.8)",
    },
    imageStyle: {
      width: isPortrait ? wp(10) : hp(10),
      height: isPortrait ? wp(10) : hp(10),
    },
    title: {
      fontFamily: FontFamily.appBold,
      fontSize: responsiveFontSize(2.2),
      textAlign: "center",
      color: colors.text,
      marginBottom: isPortrait ? wp(1) : hp(1),
    },
    titleUnderline: {
      width: isPortrait ? wp(10) : hp(10),
      height: isPortrait ? wp(1) : hp(1),
      backgroundColor: colors.textGrey,
      borderRadius: isPortrait ? wp(0.5) : hp(0.5),
      alignSelf: "center",
      marginBottom: isPortrait ? wp(2) : hp(2),
    },
    card: {
      flexDirection: "row",
      paddingVertical: isPortrait ? wp(3) : hp(3),
      borderBottomWidth: isPortrait ? wp(0.1) : hp(0.1),
      borderBottomColor: colors.text,
      columnGap: isPortrait ? wp(3) : hp(3),
    },
    cardContent: {
      flex: 1,
    },
    cardTitle: {
      fontFamily: FontFamily.appRegular,
      fontSize: responsiveFontSize(2),
      color: colors.text,
      marginBottom: isPortrait ? wp(3) : hp(3),
    },
    lineWithDescriptionView: {
      flexDirection: "row",
      width: "95%",
      columnGap: isPortrait ? wp(3) : hp(3),
    },
    line: {
      width: isPortrait ? wp(0.5) : hp(0.5),
      height: isPortrait ? wp(15) : hp(15),
      backgroundColor: colors.textGrey,
    },
    cardDesc: {
      fontFamily: FontFamily.appRegular,
      fontSize: responsiveFontSize(1.8),
      color: colors.textGrey,
      marginBottom: isPortrait ? wp(1) : hp(1),
    },
    cardTime: {
      fontFamily: FontFamily.appRegular,
      fontSize: responsiveFontSize(1.8),
      color: colors.textGrey,
    },
    noNotificationText: {
      fontFamily: FontFamily.appRegular,
      fontSize: responsiveFontSize(1.8),
      color: colors.textGrey,
      textAlign: "center",
      marginTop: hp(10),
    },
  });
