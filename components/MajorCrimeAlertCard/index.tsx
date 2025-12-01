import { FontFamily } from "@/constants/Fonts";
import { appImages, useOrientation } from "@/services";
import dayjs from 'dayjs';
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
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

interface AlertCardProps {
  item?: any;
  colors: ThemeColors;
  onReadMore?: () => void;
}

const MajorCrimeAlertCard: React.FC<AlertCardProps> = ({
  item,
  colors,
  onReadMore,
}) => {
  const { wp, hp, isPortrait } = useOrientation();
  const styles = createStyles(colors, wp, hp, isPortrait);
  const MAX_DESCRIPTION_LENGTH = 100;
  const trimmedText =
    item?.description?.length > MAX_DESCRIPTION_LENGTH
      ? item.description.slice(0, MAX_DESCRIPTION_LENGTH) + "..."
      : item.description;

  return (
    <View style={styles.card}>
      <Image
        source={{uri: item?.thumbnail}}
        style={styles.image}
        contentFit="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.description} numberOfLines={3} ellipsizeMode="tail">
          {trimmedText + " "}
         {item?.description?.length > MAX_DESCRIPTION_LENGTH &&<Text style={styles.readMore} onPress={onReadMore}>
            Read More
          </Text>}
        </Text>

        <View style={styles.bottomPart}>
          <View style={styles.rowItem}>
            <Image source={appImages.calenderAlertIcon} style={styles.icon} />
            <Text style={styles.meta}>
  {dayjs(item?.pubDate).format('MMM DD, YYYY')}
</Text>
          </View>
          <View style={styles.rowItem}>
            <Image source={appImages.locationAlertIcon} style={styles.icon} />
            <Text style={styles.meta}>{item?.location}</Text>
          </View>
          <View style={styles.rowItem}>
            <Image
              source={appImages.sourceAlertIcon}
              style={styles.sourceIcon}
            />
            <Text style={styles.meta}>{item?.source}</Text>
            <Image
              source={appImages.verifyAlertIcon}
              style={styles.verifyIcon}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const createStyles = (
  colors: ThemeColors,
  wp: any,
  hp: any,
  isPortrait: boolean
) =>
  StyleSheet.create({
    card: {
      marginBottom: isPortrait ? wp(4) : hp(4),
      marginHorizontal: isPortrait ? wp(5) : hp(5),
    },
    image: {
      width: "100%",
      height: isPortrait ? wp(40) : hp(40),
    },
    content: {
      paddingVertical: isPortrait ? wp(3) : hp(3),
      //   padding: isPortrait ? wp(4) : hp(4),
    },
    title: {
      fontFamily: FontFamily.appSemiBold,
      fontSize: responsiveFontSize(2.2),
      color: colors.text,
      marginBottom: isPortrait ? wp(1) : hp(1),
    },
    description: {
      fontFamily: FontFamily.appRegular,
      fontSize: responsiveFontSize(1.8),
      color: colors.textGrey,
    },
    readMore: {
      color: colors.secondaryThemeColor,
      fontFamily: FontFamily.appMedium,
    },
    rowItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: wp(1),
    },
    icon: {
      width: wp(4),
      height: wp(4),
      marginRight: wp(1.5),
    },
    sourceIcon: {
      width: wp(8),
      height: wp(8),
      marginRight: wp(2),
    },
    verifyIcon: {
      width: wp(4),
      height: wp(4),
      marginLeft: wp(1),
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: isPortrait ? wp(3) : hp(3),
    },
    meta: {
      fontFamily: FontFamily.appRegular,
      fontSize: responsiveFontSize(1.5),
      color: colors.textGrey,
    },
    bottomPart: {
      marginTop: isPortrait ? wp(1) : hp(1),
      rowGap: isPortrait ? wp(2) : hp(2),
    },
  });

export default MajorCrimeAlertCard;
