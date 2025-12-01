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
  TouchableOpacity,
  View,
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
  pause?:boolean
}

const ImageCard: React.FC<ImageCardProps> = ({
  title,
  description,
  time,
  image,
  lock,
  data,
  pause,
  onPress,
}) => {
  
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <ImageBackground
        style={styles.imageBackground}
        source={data?.image || appImages.background}
        resizeMode="cover"
      >
        {data?.lock && (
          <Image style={styles.lockImage} source={appImages.lock} />
        )}
        <BlurView intensity={15} tint="dark" style={styles.blurView}>
          <View style={styles.rowContainer}>
            <Text style={styles.titleText}>{data?.title || "Deep Sleep"}</Text>
            {pause?<View style={styles.timeContainer}>
              <Image style={[styles.palyIcon,{tintColor:"white"}]} source={appImages.play} />
            
            </View>:<View style={styles.timeContainer}>
              <Image style={styles.clockIcon} source={appImages.clock} />
              <Text style={styles.timeText}>{data?.time || "8 min"}</Text>
            </View>}
          </View>
          <View>
            <Text style={styles.descriptionText}>
              {data?.description || "Calm your mind and drift off easily."}
            </Text>
          </View>
        </BlurView>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default ImageCard;

const styles = StyleSheet.create({
  imageBackground: {
    height: wp(55),
    flexDirection: "column-reverse",
    borderRadius: wp(4),
    overflow: "hidden",
  },
  lockImage: {
    height: wp(20),
    width: wp(20),
    position: "absolute",
    right: wp(1),
    top: wp(1.5),
  },
  blurView: {
    height: wp(20),

    backgroundColor: "#0F172A33",
    justifyContent: "center",
    padding: wp(4),
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleText: {
    fontFamily: FontFamily?.appSemiBold,
    fontSize: responsiveFontSize(1.8),
    color: "white",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  clockIcon: {
    height: wp(3),
    width: wp(3),
  },
  palyIcon:{
     height: wp(4),
    width: wp(4),tintColor:"white"
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
