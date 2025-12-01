import React, { PropsWithChildren, useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, ScrollView } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { appImages, useOrientation } from '@/services';
import { FontFamily } from '@/constants/Fonts';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { Image } from 'expo-image';

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

interface CollapsibleProps extends PropsWithChildren {
  title: string;
  colors: ThemeColors;
  description?: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Collapsible: React.FC<CollapsibleProps> = ({ description, title, colors, isOpen,setIsOpen }) => {
  const { windowWidth, windowHeight, isPortrait, wp, hp } = useOrientation();
  const styles = createStyles(colors, windowWidth, windowHeight, isPortrait, wp, hp,isOpen);


  return (
    <View  style={styles.container}>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen(prev => !prev)}
        activeOpacity={0.8}
      >
        <Text style={styles.title}>{title}</Text>
        {/* <IconSymbol
          name="chevron.right"
          size={20}
          weight="medium"
          color={colors.text}
          style={{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }}
        /> */}
        <Image
         contentFit='contain'
         source={appImages?.arrowDown}
         style={styles.arrowIcon}
        />
      </TouchableOpacity>

      {/* {isOpen && <View style={styles.content}>{children}</View>} */}
      {isOpen && 
      // <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
      <View style={styles.content}>
      <Text style={styles.description}>{description}</Text>
        </View>
        // {/* </ScrollView>  */}
      }
    </View>
  );
};

export default Collapsible;

const createStyles = (
  colors: ThemeColors,
  windowWidth: number,
  windowHeight: number,
  isPortrait: boolean,
  wp: (value: number) => number,
  hp: (value: number) => number,
  isOpen: boolean,
) =>
  StyleSheet.create({
    container: {
      marginHorizontal: isPortrait ? wp(5) : hp(5),
    },
    heading: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'space-between',
    },
    title: {
      fontFamily: FontFamily.appSemiBold,
      fontSize: responsiveFontSize(2.5),
      color: colors.text,
    },
    content: {
      // height: isPortrait ? wp(40) : hp(40),
      // maxHeight:isPortrait ? wp(50) : hp(50),
      // marginVertical: isPortrait ? wp(2) : hp(2),
      // marginBottom: isPortrait ? wp(20) : hp(4),
      // marginLeft: isPortrait ? wp(6) : hp(6),
    },
    description:{
      fontFamily: FontFamily.appRegular,
      fontSize: responsiveFontSize(1.8),
      color: colors.text,
    },
    arrowIcon:{
      width: isPortrait ? wp(5) : hp(5),
      height: isPortrait ? wp(5) : hp(5),
      transform: [{ rotate: isOpen ? '270deg' : '0deg' }]
    }
  });
