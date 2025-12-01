import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import { useOrientation, useTheme } from '@/services';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { FontFamily } from '@/constants/Fonts';
import InputField from '../inputField';

interface ThemeColors {
    text: string;
    placeholder: string;
    primaryThemeColor: string;
    background: string;
    inputBackground: string;
    redColor: string;
    border: string;
    textInverse: string;
  }

interface LeaveModalProps {
    colors: ThemeColors;
    visible: boolean;
    onClose: () => void;
    onSelect: (option: string) => void;
}

const LeaveModal: React.FC<LeaveModalProps> = ({
        colors,
        visible,
        onClose,
        onSelect,
      }) => {
  const { windowWidth, windowHeight, isPortrait, wp, hp } = useOrientation();
  const styles = createStyles(colors, windowWidth, windowHeight, isPortrait, wp, hp);
  const [description, setDescription] = React.useState<string>('');
  const [inputHeight, setInputHeight] = useState<number | undefined>(undefined);



  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <Text style={styles.reason}>Reason</Text>

             <InputField
              colors={colors}
              value={description}
              onChangeText={setDescription}
              placeholder={"Add Reason"}
              changeMainContainer={{ marginHorizontal: 0 }}
              multiLineStatus={true}
              numberOfLinesToShow={10}
              changeInputStyle={{
                minHeight: isPortrait ? wp(30) : hp(30),
                maxHeight: isPortrait ? wp(60) : hp(60),
                height: inputHeight,
                paddingTop: isPortrait ? wp(4) : hp(4),
                paddingBottom: isPortrait ? wp(4) : hp(0),
                // marginBottom: isPortrait ? wp(4) : hp(4),
              }}
              changeContainer={{
                borderRadius: isPortrait ? wp(5) : hp(5),
              }}
              textAlign={"top"}
             />

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => onSelect(description)}
                style={[styles.button]}
              >
                <Text style={[styles.buttonText]}>Leave</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default LeaveModal;

const createStyles = (
    colors: ThemeColors,
    windowWidth: number,
    windowHeight: number,
    isPortrait: boolean,
    wp: (percentage: number) => number,
    hp: (percentage: number) => number
  ) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      width: '90%',
      backgroundColor: colors.background,
      borderRadius: isPortrait ? wp(5) : hp(5),
      padding: isPortrait ? wp(7) : hp(7),
      rowGap: isPortrait ? wp(3) : hp(3),
    },
    reason:{
      fontFamily: FontFamily.appSemiBold,
      fontSize: responsiveFontSize(2),
      color: colors.text,
    },
    button: {
      backgroundColor: colors.primaryThemeColor,
      borderRadius: isPortrait ? wp(3) : hp(3),
      paddingVertical: isPortrait ? wp(4) : hp(4),
      alignSelf:'flex-end',
      width: isPortrait ? wp(30) : hp(30),
    },
    buttonText: {
      fontFamily:FontFamily.appSemiBold,
      textAlign: 'center',
      fontSize: responsiveFontSize(2),
      color: colors.textInverse,
    },
  });
