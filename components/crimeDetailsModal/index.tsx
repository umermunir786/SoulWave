import { FontFamily } from "@/constants/Fonts";
import { appImages, useOrientation } from "@/services";
import dayjs from 'dayjs';
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import React from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";

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

interface CrimeData {
  title: string;
  date: string;
  location: string;
  description: string;
  source?: string;
  thumbnail?: string;
  pubDate?: string;
}

interface CrimeDetailModalProps {
  visible: boolean;
  onClose: () => void;
  data: CrimeData;
  colors: ThemeColors;
}

const CrimeDetailModal: React.FC<CrimeDetailModalProps> = ({
  visible,
  onClose,
  data,
  colors,
}) => {
  const { wp, hp, isPortrait } = useOrientation();
  const styles = createStyles(colors, wp, hp, isPortrait);

  if (!data) return null;

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      transparent
      animationType="fade"
    >
      <View style={[StyleSheet.absoluteFill]}>
        <BlurView intensity={50} tint="dark" style={StyleSheet.absoluteFill} />

        <TouchableOpacity onPress={onClose} style={styles.backArrowWrapper} activeOpacity={0.8}>
          <Image
            source={appImages.backArrow}
            contentFit="contain"
            style={styles.backArrowImage}
          />
        </TouchableOpacity>

        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <Image
              source={{uri: data?.thumbnail}}
              style={styles.image}
              contentFit="cover"
            />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
              <View style={styles.titleRow}>
                <Text style={styles.title}>{data.title}</Text>
                <Image source={appImages.shareIcon} style={styles.shareIcon} />
              </View>

              <View style={styles.metaContainer}>
                <View style={styles.metaRow}>
                  <Image
                    source={appImages.calenderAlertIcon}
                    style={styles.metaIcon}
                  />
                <Text style={styles.metaText}>
  {dayjs(data?.pubDate).format('MMM DD, YYYY')}
</Text>

                </View>

                <View style={styles.metaRow}>
                  <Image
                    source={appImages.locationAlertIcon}
                    style={styles.metaIcon}
                  />
                  <Text style={styles.metaText}>{data.location}</Text>
                </View>
              </View>

              <Text style={styles.description}>{data.description}</Text>
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const createStyles = (
  colors: ThemeColors,
  wp: any,
  hp: any,
  isPortrait: boolean
) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalContainer: {
      width: isPortrait ? wp(90) : hp(90),
      height: isPortrait ? hp(85) : wp(85),
      backgroundColor: "rgba(0,0,0,0.8)",
      borderRadius: wp(5),
      padding: wp(5),
      overflow: "hidden",
    },
    image: {
      width: "100%",
      height: isPortrait ? wp(40) : hp(40),
      borderRadius: isPortrait ? wp(3) : hp(3),
      marginBottom: wp(4),
    },
    scrollContent: {
      paddingBottom: wp(10),
    },
    backArrowWrapper: {
      marginTop: wp(13),
      marginLeft: wp(5),
    },
    backArrowImage: {
      width: wp(5),
      height: wp(5),
      marginTop: wp(5),
    },
    titleRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: wp(2),
    },
    title: {
      flex: 1,
      fontSize: responsiveFontSize(2.2),
      fontFamily: FontFamily.appSemiBold,
      color: colors.text,
    },
    shareIcon: {
      width: wp(5),
      height: wp(5),
      resizeMode: "contain",
      marginLeft: wp(2),
    },
    metaContainer: {
      flexDirection: "row",
      alignItems: "center",
      columnGap: wp(4),
      marginBottom: wp(2),
    },
    metaRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    metaIcon: {
      width: wp(4.5),
      height: wp(4.5),
      resizeMode: "contain",
      marginRight: wp(2),
    },
    metaText: {
      fontSize: responsiveFontSize(1.5),
      fontFamily: FontFamily.appRegular,
      color: colors.textGrey,
    },
    description: {
      marginTop: wp(3),
      fontSize: responsiveFontSize(1.7),
      fontFamily: FontFamily.appRegular,
      color: colors.text,
      lineHeight: responsiveFontSize(2.5),
    },
  });

export default CrimeDetailModal;
