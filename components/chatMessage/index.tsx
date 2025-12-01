import { FontFamily } from "@/constants/Fonts";
import { useOrientation, useTheme } from "@/services";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { useSelector } from "react-redux";

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
  inputFieldBackground: string;
}

const ChatMessage = React.memo(
  ({
    item,
  }: {
    item: {
      id: string;
      sender: string;
      image: string;
      text: string;
      time: string;
      type: string;
    };
  }) => {
    const { windowWidth, windowHeight, isPortrait, wp, hp } = useOrientation();
    const { colors } = useTheme();
    const styles = createStyles(
      colors,
      windowWidth,
      windowHeight,
      isPortrait,
      wp,
      hp
    );
    // console.log(JSON.stringify("messesges  component", item));
    const { user } = useSelector((state: any) => state.userData);
    return (
      <View
        style={[
          styles.messageBubble,
          { flexDirection: item?.sender === user?._id ? "row-reverse" : "row" },
        ]}
      >
        {item.type == "text" && (
          <View
            style={
              item?.sender === user?._id
                ? styles.senderBubble
                : styles.receiverBubble
            }
          >
            <Text style={styles.messageText}>{item?.text}</Text>
            <View style={{ alignSelf: "flex-end", marginTop: wp(1) }}>
              <Text style={styles.timeText}>{item?.time}</Text>
              <Text style={styles.dateText}>{item?.date}</Text>
            </View>
          </View>
        )}
        {item.type == "image" && (
          <View
            style={[
              styles.imageView,

              item?.sender === user?._id
                ? styles.senderBubbleImage
                : styles.receiverBubbleImage,
            ]}
          >
            <Image
              source={{ uri: item.text }}
              style={styles.dummyImage}
              contentFit="cover"
            />
            <View style={{ alignSelf: "flex-end", marginTop: wp(1) }}>
              <Text style={styles.timeText}>{item?.time}</Text>
              <Text style={styles.dateText}>{item?.date}</Text>
            </View>
          </View>
        )}
      </View>
    );
  }
);

export default ChatMessage;

const createStyles = (
  colors: ThemeColors,
  windowWidth: number,
  windowHeight: number,
  isPortrait: boolean,
  wp: (percentage: number) => number,
  hp: (percentage: number) => number
) =>
  StyleSheet.create({
    messageBubble: {
      flexDirection: "row",
      // flexDirection:'row-reverse',
      alignItems: "center",
      marginBottom: isPortrait ? wp(3) : hp(3),
    },
    botIcon: {
      width: isPortrait ? wp(8) : hp(8),
      height: isPortrait ? wp(8) : hp(8),
      marginRight: wp(3),
    },
    senderBubble: {
      // flexDirection: "row",
      alignItems: "flex-start",
      backgroundColor: colors.primaryThemeColor,
      padding: isPortrait ? wp(3) : hp(3),
      borderRadius: isPortrait ? wp(4) : hp(4),
      width: isPortrait ? wp(78) : hp(78),
      columnGap: isPortrait ? wp(2) : hp(2),
    },
    senderBubbleImage: {
      // flexDirection: "row",
      alignItems: "flex-start",
      backgroundColor: colors.primaryThemeColor,
      padding: isPortrait ? wp(3) : hp(3),
      borderRadius: isPortrait ? wp(4) : hp(4),
      width: isPortrait ? wp(78) : hp(78),
      columnGap: isPortrait ? wp(2) : hp(2),
    },
    receiverBubble: {
      // flexDirection: "row",
      alignItems: "flex-start",
      backgroundColor: colors.inputFieldBackground,
      padding: isPortrait ? wp(3) : hp(3),
      borderRadius: isPortrait ? wp(4) : hp(4),
      width: isPortrait ? wp(78) : hp(78),
      columnGap: isPortrait ? wp(2) : hp(2),
    },
    receiverBubbleImage: {
      // flexDirection: "row",
      alignItems: "flex-start",
      backgroundColor: colors.inputFieldBackground,
      padding: isPortrait ? wp(3) : hp(3),
      borderRadius: isPortrait ? wp(4) : hp(4),
      width: isPortrait ? wp(78) : hp(78),
      columnGap: isPortrait ? wp(2) : hp(2),
    },
    imageView: {
      width: isPortrait ? wp(44) : hp(44),
      // height: isPortrait ? wp(44) : hp(44),
      borderRadius: isPortrait ? wp(4) : hp(4),
      backgroundColor: colors.inputFieldBackground,
      justifyContent: "center",
      alignItems: "center",
      padding: isPortrait ? wp(2) : hp(2),
    },
    dummyImage: {
      width: isPortrait ? wp(40) : hp(40),
      height: isPortrait ? wp(40) : hp(40),
      borderRadius: isPortrait ? wp(4) : hp(4),
      marginBottom: isPortrait ? wp(1) : hp(1),
    },
    messageText: {
      fontFamily: FontFamily.appRegular,
      fontSize: responsiveFontSize(1.8),
      color: colors.text,
      maxWidth: isPortrait ? wp(63) : hp(63),
      width: "80%",
    },
    timeText: {
      fontSize: responsiveFontSize(1.3),
      fontFamily: FontFamily.appRegular,
      color: colors.text,
    },
    dateText: {
      fontSize: responsiveFontSize(1.3),
      fontFamily: FontFamily.appRegular,
      color: colors.text,
    },
  });
