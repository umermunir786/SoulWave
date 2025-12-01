import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useOrientation } from '@/services';

interface LineProps {
  colors: {
    text: string;
    greyText2: string;
    lineColor: string;
  };
  changeLineWidth?: number;
}

const Line: React.FC<LineProps> = ({ colors, changeLineWidth }) => {
  const { windowWidth, windowHeight, isPortrait, wp, hp } = useOrientation();
  const styles = createStyles(windowWidth, windowHeight, isPortrait, wp, hp, colors);

  return <View style={[styles.line, { width: changeLineWidth ?? '100%' }]} />;
};

const createStyles = (
  windowWidth: number,
  windowHeight: number,
  isPortrait: boolean,
  wp: (value: number) => number,
  hp: (value: number) => number,
  colors: { text: string; greyText2: string , lineColor: string}
) =>
  StyleSheet.create({
    line: {
      height: isPortrait ? wp(0.4) : hp(0.4),
      marginVertical: isPortrait ? wp(0.4) : hp(0.4),
      backgroundColor: colors.lineColor,
    },
  });

export default Line;
