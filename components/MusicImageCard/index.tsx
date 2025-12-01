import { FontFamily } from "@/constants/Fonts";
import { appImages, useTheme, wp } from "@/services";
import { BlurView } from "expo-blur";
import React from "react";
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";

interface ImageCardProps {
  title?: string;

  time?: string;
  image?: ImageSourcePropType;
}

const MusicImageCard: React.FC<ImageCardProps> = ({
  title,

  time,
  image,
}) => {
  const { colors } = useTheme();
  return (
    <ImageBackground
      style={styles.imageBackground}
      source={image || appImages.musicImage}
      resizeMode="cover"
    >
      <BlurView intensity={50} tint="dark" style={styles.blurView}>
        <View style={styles.rowContainer}>
          <Text style={styles.titleText}>{title || "Lion’s breath"}</Text>
          <View style={styles.timeContainer}>
            <Image style={styles.clockIcon} source={appImages.clock} />
            <Text style={styles.timeText}>{time || "25 min"}</Text>
          </View>
        </View>
        <View></View>
      </BlurView>
    </ImageBackground>
  );
};

export default MusicImageCard;

const styles = StyleSheet.create({
  imageBackground: {
    height: wp(42),
    width: wp(33),
    marginRight: wp(3),
    flexDirection: "column-reverse",
    borderRadius: wp(4),
    overflow: "hidden",
  },

  blurView: {
    height: wp(12),

    backgroundColor: "#0F172A33",
    justifyContent: "center",
    paddingVertical: wp(2),
    paddingHorizontal: wp(4),
  },
  rowContainer: {},
  titleText: {
    fontFamily: FontFamily?.appRegular,
    fontSize: responsiveFontSize(1.4),
    color: "white",
    marginBottom: wp(0.5),
  },
  timeContainer: {
    flexDirection: "row",

    alignItems: "center",
  },
  clockIcon: {
    height: wp(3),
    width: wp(3),
  },
  timeText: {
    fontFamily: FontFamily?.appRegular,
    fontSize: responsiveFontSize(1.0),
    color: "white",
    marginLeft: wp(1),
  },
  descriptionText: {
    fontFamily: FontFamily?.appRegular,
    fontSize: responsiveFontSize(1.4),
    color: "white",
    marginTop: wp(1),
  },
});
