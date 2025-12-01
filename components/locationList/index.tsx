import { FontFamily } from '@/constants/Fonts';
import { useOrientation } from '@/services';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

interface LocationItem {
  id: string;
  postcode: string;
  label: string;
  icon?: any; 
}

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
  modalBackgroundColor: string;
}

interface LocationListProps {
  colors: ThemeColors;
  locations: LocationItem[];
  onSelect: (item: LocationItem) => void;
}

const LocationList: React.FC<LocationListProps> = ({ colors, locations, onSelect }) => {
  const { isPortrait, wp, hp, windowWidth, windowHeight } = useOrientation();
  const styles = createStyles(colors, windowWidth, windowHeight, isPortrait, wp, hp);

  const renderItem = ({ item }: { item: LocationItem }) => (
    <TouchableOpacity style={styles.itemContainer} activeOpacity={0.8} onPress={() => onSelect(item)}>
      <Image
        source={item.icon} 
        style={styles.icon}
        resizeMode="contain"
      />
      <View style={styles.textWrapper}>
        <Text style={styles.postcode}>{item.postcode}</Text>
        <Text style={styles.location}>{item.label}</Text>
      </View>
    </TouchableOpacity>
  );

  return <FlatList data={locations} keyExtractor={(item) => item.id} renderItem={renderItem} />;
};

const createStyles = (
  colors: ThemeColors,
  windowWidth: number,
  windowHeight: number,
  isPortrait: boolean,
  wp: (val: number) => number,
  hp: (val: number) => number
) =>
  StyleSheet.create({
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: isPortrait ? wp(4) : hp(4),
      borderBottomWidth: 0.5,
      borderBottomColor: colors.textGrey,
      marginHorizontal: isPortrait ? wp(5) : hp(5),
    },
    icon: {
      width: isPortrait ? wp(8): hp(6),
      height: isPortrait ? wp(8) : hp(6),
      marginRight: isPortrait ? wp(4) : hp(4),
    },
    textWrapper: {
      flex: 1,
    },
    postcode: {
      fontFamily:FontFamily.appRegular,
      color:colors.text,
      fontSize:responsiveFontSize(2),
      marginBottom:isPortrait ? wp(0.5) : hp(0.5),
    },
    location: {
      fontFamily: FontFamily.appRegular,
      color: colors.textGrey,
      fontSize:responsiveFontSize(1.6)
    }
  });

export default LocationList;
