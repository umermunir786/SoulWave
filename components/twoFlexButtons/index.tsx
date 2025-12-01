import React from 'react';
import Button from '../button';
import { useOrientation } from '@/services';
import { StyleSheet, View } from 'react-native';

export interface ThemeColors {
    primaryThemeColor: string;
    text: string;
    textInverse: string;
    transparent: string;
    disabled: string;
    red: string;
    buttonColor: string;
  }

interface TwoFlexButtonProps {
  colors: ThemeColors ; 
  leftButtonText: string;
  onPressLeftButton: () => void;
  rightButtonText: string;
  disableRightButton?: boolean;
  onPressRightButton: () => void;
}

const TwoFlexButton: React.FC<TwoFlexButtonProps> = ({ colors,leftButtonText,onPressLeftButton,rightButtonText,disableRightButton,onPressRightButton }) => {
      const { windowWidth, windowHeight, isPortrait, wp, hp } = useOrientation();
  const styles = createStyles(colors,windowWidth, windowHeight, isPortrait, wp, hp);

    
  return (
    <View style={styles.mainView}>
    <Button colors={colors} onPress={onPressLeftButton}
     changeMainContainerStyle={styles.mainContainer}
     changeContainerStyle={styles.buttonContainer}
     lablelStyle={{color:colors.primaryThemeColor}}
     showBorder
     transparentWithJustBorder
    >
     {leftButtonText} 
    </Button>
    <Button colors={colors} onPress={onPressRightButton}
    disable={disableRightButton}
     changeMainContainerStyle={styles.mainContainer}
     changeContainerStyle={styles.buttonContainer}    
    >
       {rightButtonText}
    </Button>
    </View>
  );
};



export default TwoFlexButton;

const createStyles = (
  colors: ThemeColors,
  windowWidth: number,
  windowHeight: number,
  isPortrait: boolean,
  wp: (percentage: number) => number,
  hp: (percentage: number) => number
) =>
  StyleSheet.create({ 
   mainView:{
    flexDirection:'row',
    justifyContent:'space-between'
   },
   mainContainer:{
    width:'50%',
    paddingTop: isPortrait ?  wp(0) : hp(0),
   },
   buttonContainer:{
    height:isPortrait ? hp(6) : hp(6),
    borderRadius:isPortrait ?  wp(10) : hp(10),
   },

  })
