import { FontFamily } from "@/constants/Fonts";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { createShimmerPlaceHolder } from "expo-shimmer-placeholder";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { appImages, useOrientation } from "../../services";

const ShimmerPlaceHolder = createShimmerPlaceHolder(LinearGradient);

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
}

interface HeaderProps {
  changeHeaderView?: object;
  hideHeader?: boolean;
  inVisibleHeader?: boolean;
  extraMarginAtTop?: boolean;
  extraMarginAtBottom?: boolean;
  colors: ThemeColors;
  barStyleWhiteColor?: boolean;
  statusBarColor?: string;
  leftSideLogo?: boolean;
  leftSideProfile?: boolean;
  leftSideIcons?: boolean;
  noIconSpaceFillLeftSide?: number;
  backIcon?: boolean;
  onPressBackIcon?: () => void;
  profileImage?: boolean;
  welcomeTitle?: string;
  userName?: string;
  handImage?: boolean;
  centerIcons?: boolean;
  centerTitle?: string;
  rightSideIcons?: boolean;
  noIconSpaceFillRightSide?: number;
  notification?: boolean;
  rightSideText?: string;
  onPressRight?: () => void;
}
interface UserDataState {
  user: {
    email?: string;
    profile: {
      lastName?: string;
      firstName?: string;
      phone?: string;
      profilePicture?: string;
    };

    device?: string;
  };
}

interface RootState {
  userData: UserDataState;
  // other slices...
}
const Header: React.FC<HeaderProps> = (props) => {
  const {
    changeHeaderView,
    hideHeader,
    inVisibleHeader,
    extraMarginAtTop,
    extraMarginAtBottom,
    colors,
    barStyleWhiteColor,
    statusBarColor,
    leftSideLogo,
    leftSideProfile,
    leftSideIcons,
    noIconSpaceFillLeftSide,
    backIcon,
    onPressBackIcon,
    profileImage,
    welcomeTitle,
    userName,
    handImage,
    centerIcons,
    centerTitle,
    rightSideIcons,
    noIconSpaceFillRightSide,
    notification,
    rightSideText,
    onPressRight,
  } = props;
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(true);

  const { windowWidth, windowHeight, isPortrait, wp, hp } = useOrientation();
  const styles = createStyles(
    colors,
    windowWidth,
    windowHeight,
    isPortrait,
    wp,
    hp
  );
  const { user } = useSelector((state: RootState) => state.userData);
  // console.log(user);
  return (
    <View
      style={[
        styles.headerMainView,
        {
          backgroundColor: hideHeader ? colors.background : colors.transparent,
          marginTop: hideHeader
            ? 0
            : extraMarginAtTop
            ? isPortrait
              ? insets.top + 30
              : insets.top + 6
            : isPortrait
            ? insets.top
            : insets.top,

          marginBottom: extraMarginAtBottom ? (isPortrait ? wp(3) : hp(3)) : 0,
        },
        changeHeaderView,
      ]}
    >
      {leftSideLogo && !hideHeader && (
        <Image
          source={appImages.logo}
          contentFit="contain"
          style={styles.imageLogo}
        />
      )}

      {leftSideProfile && !hideHeader && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            columnGap: wp(2),
          }}
        >
          <ShimmerPlaceHolder
            visible={!isLoading}
            style={styles.dummyImage}
            shimmerStyle={styles.dummyImage}
            shimmerColors={["#1c1c1c", "#666666", "#1c1c1c"]}
          >
            <Image
              source={{ uri: user?.profile?.profilePicture }}
              contentFit="cover"
              style={styles.dummyImage}
              onLoadStart={() => setIsLoading(true)}
              onLoadEnd={() => setIsLoading(false)}
            />
          </ShimmerPlaceHolder>

          <View>
            <Text
              style={styles.name}
            >{`${user?.profile?.firstName} ${user?.profile?.lastName}`}</Text>
            <Text style={styles.email}>{user?.email}</Text>
          </View>
        </View>
      )}

      {leftSideIcons && !hideHeader ? (
        <View style={[styles.row, { columnGap: isPortrait ? wp(12) : hp(12) }]}>
          {backIcon && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={
                {
                  //  marginTop: rightSideText ? wp(1) : 0,
                }
              }
              onPress={() =>
                onPressBackIcon ? onPressBackIcon() : router?.back()
              }
            >
              <Image
                source={appImages.backArrow}
                contentFit="contain"
                style={styles.backArrowImage}
              />
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View
          style={{
            width: isPortrait
              ? wp(noIconSpaceFillLeftSide ?? 12)
              : hp(noIconSpaceFillLeftSide ?? 12),
          }}
        />
      )}

      {centerTitle && !hideHeader && (
        <Text style={[styles.centerTitle, { color: colors.text }]}>
          {centerTitle}
        </Text>
      )}

      {rightSideIcons && !hideHeader ? (
        <View style={[styles.row, { columnGap: isPortrait ? wp(6) : hp(6) }]}>
          {/* {notification && ( */}
          <TouchableOpacity activeOpacity={0.8} onPress={onPressRight}>
            <Image
              source={appImages.dots}
              style={styles.notificationIcon}
              contentFit="contain"
            />
          </TouchableOpacity>
          {/* )} */}
        </View>
      ) : rightSideText && !hideHeader ? (
        <View style={styles.pillView}>
          <Image
            source={appImages.coinIcon}
            contentFit="contain"
            style={styles.coinIcon}
          />
          <Text style={[styles.coinsQuanityt, { color: colors.text }]}>
            {rightSideText}
          </Text>
        </View>
      ) : (
        <View
          style={{
            width: isPortrait
              ? wp(noIconSpaceFillRightSide ?? 6)
              : hp(noIconSpaceFillRightSide ?? 6),
          }}
        />
      )}
    </View>
  );
};

const createStyles = (
  colors: ThemeColors,
  windowWidth: number,
  windowHeight: number,
  isPortrait: boolean,
  wp: (percentage: number) => number,
  hp: (percentage: number) => number
) =>
  StyleSheet.create({
    headerMainView: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginHorizontal: isPortrait ? wp(4) : hp(4),
    },
    backArrowImage: {
      width: isPortrait ? wp(6) : hp(6),
      height: isPortrait ? wp(6) : hp(6),
    },
    profileImage: {
      width: isPortrait ? wp(4) : hp(4),
      height: isPortrait ? wp(4) : hp(4),
      borderRadius: isPortrait ? wp(10) : hp(10),
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
    },
    notificationIcon: {
      width: isPortrait ? wp(6) : hp(6),
      height: isPortrait ? wp(6) : hp(6),
    },
    aiBotIcon: {
      width: isPortrait ? wp(8) : hp(8),
      height: isPortrait ? wp(8) : hp(8),
    },
    centerTitle: {
      fontFamily: FontFamily.appRegular,
      fontSize: responsiveFontSize(2.0),
    },
    dummyImage: {
      width: wp(15),
      height: wp(15),
      borderRadius: wp(8),
    },
    name: {
      fontFamily: FontFamily.appBold,
      fontSize: responsiveFontSize(2.2),
      color: colors.text,
      marginBottom: wp(1),
    },
    email: {
      fontFamily: FontFamily.appRegular,
      fontSize: responsiveFontSize(1.5),
      color: colors.textGrey,
    },
    imageLogo: {
      width: wp(50),
      height: wp(20),
      resizeMode: "contain",
    },
    pillView: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.background,
      borderRadius: isPortrait ? wp(3) : hp(3),
      paddingVertical: isPortrait ? wp(1.5) : hp(1.5),
      paddingHorizontal: isPortrait ? wp(4) : hp(4),
      columnGap: isPortrait ? wp(2) : hp(2),
      borderWidth: isPortrait ? wp(0.3) : hp(0.3),
      borderColor: colors.textGrey,
    },
    coinIcon: {
      width: isPortrait ? wp(4) : hp(4),
      height: isPortrait ? wp(4) : hp(4),
    },
    coinsQuanityt: {
      fontFamily: FontFamily.appRegular,
      fontSize: responsiveFontSize(1.8),
    },
    logoStyle: {
      width: isPortrait ? wp(4) : hp(4),
      height: isPortrait ? wp(4) : hp(4),
    },
  });

export default Header;
