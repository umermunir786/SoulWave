import { FontFamily } from "@/constants/Fonts";
import { appImages, useOrientation } from "@/services";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";

interface UploadPhotoCircleProps {
  colors: { text: string };
  title?: string;
  changeUploadphotoCircleView?: object;
  image?: any;
  onPressImage?: () => void;
  editable?: boolean;
  showUserName?: boolean;
  onPressTouchingMainImage?: () => void;
}

const UploadphotoCircle: React.FC<UploadPhotoCircleProps> = ({
  colors,
  title,
  changeUploadphotoCircleView,
  image,
  onPressImage,
  onPressTouchingMainImage,
  editable = false,
  showUserName = false,
}) => {
  // console.log("image", image);
  const { windowWidth, windowHeight, isPortrait, wp, hp } = useOrientation();
  const styles = createStyles(windowWidth, windowHeight, isPortrait, wp, hp, colors);

  return (
    <View style={[changeUploadphotoCircleView]}>
      {title && <Text style={styles.title}>{title}</Text>}
      <TouchableOpacity activeOpacity={onPressTouchingMainImage ? 0.8 : 1 } onPress={onPressTouchingMainImage} style={styles.mainView}>
        {image.length > 0 ? (
          <Image
            source={{ uri: image }}
            contentFit="cover"
            style={styles.imageStyle}
          />
        ) : (
          <Image
            source={image ? appImages.dummyImage : appImages.createProfile}
            contentFit="contain"
            style={styles.imageStyle}
          />
        )}
        {editable && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPressImage}
            style={styles.cameraIconView}
          >
            <Image
              source={appImages.cameraIcon}
              contentFit="contain"
              style={styles.cameraIconStyle}
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      {showUserName && (
        <Text style={[styles.nameStyle, { color: colors.text }]}>Mike Torello</Text>
      )}
    </View>
  );
};

const createStyles = (
  windowWidth: number,
  windowHeight: number,
  isPortrait: boolean,
  wp: (value: number) => number,
  hp: (value: number) => number,
  colors: { text: string }
) =>
  StyleSheet.create({
    title:{
       fontFamily:FontFamily.appRegular,
        fontSize:responsiveFontSize(2),
        color: colors.text,
        marginBottom: isPortrait ? wp(2.5) : hp(2.5),
    },
    mainView: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    imageStyle: {
      height: isPortrait ? wp(35) : hp(35),
      width: isPortrait ? wp(35) : hp(35),
      borderRadius: isPortrait ? wp(17) : hp(17),
      resizeMode: "cover",
    },
    cameraIconView: {
      position: "absolute",
      bottom: isPortrait ? hp(0.5) : wp(2),
      paddingLeft: isPortrait ? wp(22) : hp(28),
    },
    cameraIconStyle: {
      width: isPortrait ? wp(10) : hp(10),
      height: isPortrait ? wp(10) : hp(10),
      resizeMode: "contain",
    },
    nameStyle: {
      marginTop: isPortrait ? hp(2) : wp(2),
      fontFamily: FontFamily.appRegular,
      fontSize: responsiveFontSize(2.2),
      textAlign: "center",
    },
  });

export default UploadphotoCircle;
