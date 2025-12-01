import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { hp, useOrientation } from '@/services';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { FontFamily } from '@/constants/Fonts';
import Line from '../line';

interface SocialLoginItem {
  icon: any;
  onPressIcon: () => void;
}

interface OrContinueWithProps {
  colors: {
    text: string;
    greyText2: string;
    lineColor: string;
    fourthThemeColorLight: string;
  };
  socialLoginArray: SocialLoginItem[];
}

const OrContinueWith: React.FC<OrContinueWithProps> = ({ colors, socialLoginArray }) => {
  const { windowWidth, windowHeight, isPortrait, wp, hp } = useOrientation();
  const styles = createStyles(windowWidth, windowHeight, isPortrait, wp, hp, colors);

  return (
    <View style={styles.mainView}>
      <View style={styles.orView}>
        <Line changeLineWidth={ isPortrait ? wp(40) : hp(40)}  colors={colors} />
        <Text  style={styles.or}>Or</Text>
        <Line changeLineWidth={ isPortrait ? wp(40) : hp(40)} colors={colors} />
      </View>

      <Text style={styles.continue}>Continue With</Text>
      <View style={styles.socialLoginView}>
      {socialLoginArray.map((item, index) => (
        <TouchableOpacity style={styles.iconView} activeOpacity={0.8} onPress={item.onPressIcon} key={index}>
          <Image source={item.icon} resizeMode='contain' style={styles.icon} />
        </TouchableOpacity>
      ))}
      </View>

    </View>
  );
};

const createStyles = (
  windowWidth: number,
  windowHeight: number,
  isPortrait: boolean,
  wp: (value: number) => number,
  hp: (value: number) => number,
  colors: { text: string; greyText2: string; fourthThemeColorLight: string }
) =>
  StyleSheet.create({
    orView: {
      flexDirection: 'row',
      alignItems:'center',
      justifyContent:'space-between',
    },
    or: {
      fontSize: responsiveFontSize(2.5),
      fontFamily: FontFamily.appMedium,
      color: colors.text,
    },
    continue: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      fontSize: responsiveFontSize(2),
      fontFamily: FontFamily.appMedium,
      color: colors.greyText2,
      marginVertical: isPortrait ? wp(5) : hp(5),
    },
    socialLoginView: 
    { flexDirection: 'row', justifyContent: 'center', columnGap:isPortrait ? wp(5) : hp(5)}
    ,
    iconView:{
      backgroundColor: colors.fourthThemeColorLight,
      borderRadius: isPortrait ? wp(8) : hp(8),
      paddingHorizontal: isPortrait ? wp(6) : hp(6),
      paddingVertical: isPortrait ? wp(3) : hp(3),

    },
    icon: {
      width: isPortrait ? wp(6) : hp(6),
      height: isPortrait ? wp(6) : hp(6),
    },
    mainView:{
      marginHorizontal: isPortrait ? wp(5) : hp(5),
      marginBottom: isPortrait ? wp(8) : hp(8),
    }
  });

export default OrContinueWith;
