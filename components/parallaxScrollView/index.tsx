import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, StatusBar } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import { Image, ImageBackground } from 'expo-image';
import { useOrientation, appImages } from '@/services';
import { Ionicons } from '@expo/vector-icons';
import { FontFamily } from '@/constants/Fonts';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const HEADER_HEIGHT = 250;

interface ThemeColors {
  background: string;
  text: string;
  textInverse: string;
  transparent: string;
  backgroundInverse: string;
  lineColor: string;
  greyText2: string;
  greyText: string;
  ratingText: string;
}

interface ParallaxScrollViewProps {
  colors: ThemeColors;
  children: React.ReactNode;
  onBackPress?: () => void;
}

const ParallaxScrollView: React.FC<ParallaxScrollViewProps> = ({
  colors,
  children,
  onBackPress,
}) => {
  const { windowWidth, windowHeight, isPortrait, wp, hp } = useOrientation();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const styles = createStyles(colors, windowWidth, windowHeight, isPortrait, wp, hp);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 3, 0, HEADER_HEIGHT * 0.57]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  return (
    <View style={styles.mainView}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hp(5) }}>
        <Animated.View style={[styles.fitnessImage, headerAnimatedStyle]}>
          <ImageBackground
            source={appImages.fitness}
            contentFit="cover"
            style={StyleSheet.absoluteFillObject}
            imageStyle={{ borderTopLeftRadius: wp(5), borderTopRightRadius: wp(5) }}
          >
            <View style={styles.overlay} />
            <View style={styles.headerContent}>
            <View style={styles.headerContentSubView}>
              <TouchableOpacity activeOpacity={0.8} onPress={onBackPress}>
                <Image source={appImages.backArrow} contentFit='contain' style={styles.backIcon} />
              </TouchableOpacity>
              <Text style={styles.title}>Chest Workout</Text>
              <View style={styles.backIcon}></View>
            </View>
              <View style={styles.rightTextContainer}>
                <Text style={styles.rightText}>Time Here</Text>
                <Text style={styles.rightText}>6 workouts</Text>
              </View>
              </View>
          </ImageBackground>
        </Animated.View>
        <View style={{ paddingTop: isPortrait ? wp(72) : hp(72) }}>
               {children}
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const createStyles = (
  colors: ThemeColors,
  windowWidth: number,
  windowHeight: number,
  isPortrait: boolean,
  wp: (value: number) => number,
  hp: (value: number) => number
) =>
  StyleSheet.create({
    mainView: {
      overflow: 'hidden',
      width: '100%',
      alignSelf: 'center',
    },
    fitnessImage: {
      position: 'absolute',
      zIndex: 1,
      height: isPortrait ? wp(70) : hp(70),
      width: '100%',
      overflow: 'hidden',
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.4)',
    },
    headerContent:
    {flexDirection:'column',marginTop:isPortrait? wp(33):hp(33),marginHorizontal: isPortrait ? wp(5) : hp(5)},
    headerContentSubView:{flexDirection:'row',justifyContent:'space-between'},
    title: {
      fontFamily:FontFamily.appSemiBold,
      fontSize: responsiveFontSize(2.5),
      color: colors.textInverse,
    },
    rightTextContainer: {
      alignItems: 'flex-end',
      marginTop: isPortrait ? wp(10) : hp(10),
    },
    rightText: {
      fontFamily:FontFamily.appRegular,
      fontSize: responsiveFontSize(2),
      color: colors.textInverse,
      lineHeight: isPortrait ? wp(7) : hp(7),
    },
    backIcon:{
      width: isPortrait ? wp(7) : hp(7),
      height: isPortrait ? wp(7) : hp(7),
      tintColor:colors.textInverse,
    },
  });

export default ParallaxScrollView;
