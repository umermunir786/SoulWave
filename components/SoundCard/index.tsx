import { FontFamily } from "@/constants/Fonts";
import { appImages, useTheme, wp } from "@/services";
import React from "react";
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";

interface ImageCardProps {
  title?: string;
  description?: string;
  time?: string;
  image?: ImageSourcePropType;
  lock?: boolean;
  data?: { lock?: boolean };
  onPress?: () => void;
}

const SoundCard: React.FC<ImageCardProps> = ({
  title,
  description,
  time,
  image,
  lock,
  data,
  onPress,
}) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <ImageBackground
        style={styles.imageBackground}
        source={data?.image || appImages.soundBackground}
        resizeMode="cover"
      >
        <Text style={styles.titleText}>{data?.title || "Rain Sound"}</Text>
        <Text style={styles.descriptionText}>
          {data?.description ||
            "Sometimes the most\nproductive thing you can do is\nrelax."}
        </Text>

        {/* <BlurView intensity={15} tint="dark" style={styles.blurView}> */}
        {/* <View style={styles.timeContainer}> */}
        <Image style={styles.clockIcon} source={appImages.playNow} />
        {/* <Text style={styles.timeText}>{"Play Now"}</Text> */}
        {/* </View>
        </BlurView> */}
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default SoundCard;

const styles = StyleSheet.create({
  imageBackground: {
    height: wp(55),
    paddingHorizontal: wp(6),
    padding: wp(10),
    borderRadius: wp(4),
    marginBottom: wp(10),
    overflow: "hidden",
  },

  blurView: {
    backgroundColor: "#0F172A33",

    padding: wp(2),
    borderRadius: wp(5),
    marginTop: wp(2),
    overflow: "hidden",
  },

  titleText: {
    fontFamily: FontFamily?.appMedium,
    fontSize: responsiveFontSize(2.8),
    color: "white",
    lineHeight: responsiveFontSize(4.2),
  },
  timeContainer: {
    flexDirection: "row",

    alignItems: "center",
  },
  clockIcon: {
    height: wp(8),
    width: wp(28),
    marginTop: wp(2),
  },
  timeText: {
    fontFamily: FontFamily?.appRegular,
    fontSize: responsiveFontSize(1.6),
    color: "white",
    marginLeft: wp(1),
  },
  descriptionText: {
    fontFamily: FontFamily?.appRegular,
    fontSize: responsiveFontSize(1.8),
    color: "white",
    marginTop: wp(1),
  },
});
