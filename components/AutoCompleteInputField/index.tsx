import { FontFamily } from "@/constants/Fonts";
import { appImages, useOrientation } from "@/services";
import { Image } from "expo-image";
import React, { useEffect, useRef } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { GooglePlaceData, GooglePlaceDetail, GooglePlacesAutocomplete, GooglePlacesAutocompleteRef } from "react-native-google-places-autocomplete";
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
}

type InputFieldProps = {
  onPressInputField?: () => void;
  colors: ThemeColors;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  rightPress?: () => void;
  title?: string;
  leftIcon?: any;
  errorText?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  maxLength?: number;
  changeContainer?: object;
  changeMainContainer?: object;
  address?: string;
};

const AutoCompleteInputField: React.FC<InputFieldProps> = ({
  onPressInputField,
  colors,
  placeholder,
  value,
  onChangeText,
  title,
  leftIcon,
  errorText,
  onFocus,
  onBlur,
  maxLength,
  changeContainer,
  changeMainContainer,
  rightPress,
  address,
}) => {
  const { windowWidth, windowHeight, isPortrait, wp, hp } = useOrientation();
  const styles = createStyles(windowWidth, windowHeight, isPortrait, wp, hp);
  const ref = useRef<GooglePlacesAutocompleteRef>(null);

  const handlePress = (data: GooglePlaceData, details: GooglePlaceDetail | null) => {
    
    if (details) {
      const { geometry } = details;
      const location = {
        latitude: geometry?.location.lat,
        longitude: geometry?.location.lng,
        address: data?.description,
      };
      console.log("Location details:", location);
      onChangeText(location.address);
    }
  };

  useEffect(() => {
    if (value) {
      ref?.current?.setAddressText(value);
    }
  }, [value]);

  return (
    <View style={styles.outerContainer}>
      <View style={[styles.mainContainer, changeMainContainer]}>
        {title && <Text style={[styles.titleStyle, { color: colors.text }]}>{title}</Text>}

        <View
          style={[
            styles.Container,
            {
              backgroundColor: colors.inputFieldBackground,
              borderColor: colors.inputFieldBackground,
              ...changeContainer,
            },
          ]}
        >
          {leftIcon && (
            <Image source={leftIcon} contentFit="contain" style={[styles.leftIconStyle]} />
          )}

          <GooglePlacesAutocomplete
            ref={ref}
            placeholder={placeholder}
            fetchDetails={true}
            onPress={handlePress}
            onFail={(error) => console.error("Autocomplete Error:", error)}
            onTimeout={() => console.warn("Request timed out")}
            debounce={300}
             minLength={2}
            listViewDisplayed="auto"
            enablePoweredByContainer={false}
            query={{
              key: process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY || "api_key",
              language: "en",
              types: "geocode",
            }}
            styles={{
              container: {
                flex: 1,
                zIndex: 1,
              },
              textInputContainer: {
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'transparent',
                borderTopWidth: 0,
                borderBottomWidth: 0,
              },
              textInput: {
                height: isPortrait ? wp(12) : hp(12),
                borderColor: "transparent",
                borderWidth: 0,
                paddingLeft: leftIcon ? 0 : 10,
                fontSize: 16,
                color: colors.text,
                backgroundColor: 'transparent',
                flex: 1,
              },
              listView: {
                backgroundColor: colors.background,
                borderRadius: isPortrait ? wp(2.5) : hp(2.5),
                marginTop: 5,
                elevation: 3,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                maxHeight: 200,
              },
              row: {
                backgroundColor: colors.background,
                padding: 13,
                height: 44,
                flexDirection: 'row',
              },
              separator: {
                height: 0.5,
                backgroundColor: colors.textGrey,
              },
              description: {
                color: colors.text,
                fontSize: 14,
              },
              predefinedPlacesDescription: {
                color: colors.textGrey,
              },
            }}
            textInputProps={{
              onFocus,
              onBlur,
              maxLength,
              placeholderTextColor: colors.placeholderTextColor,
              returnKeyType: "search"
            }}
            predefinedPlaces={[]}
            predefinedPlacesAlwaysVisible={false}
            nearbyPlacesAPI="GooglePlacesSearch"
            GooglePlacesSearchQuery={{
              rankby: 'distance',
            }}
            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
            renderRightButton={() => <Pressable onPress={rightPress}> <Image source={appImages.editProfile} contentFit="contain" style={styles.leftIconStyle} /></Pressable>}
          />
        </View>

        {errorText && (
          <View style={styles.pt5}>
            <Text style={[styles.errorText, { color: colors.redColor }]}>{errorText}</Text>
          </View>
        )}
      </View>
      
      {address && (
        <View style={styles.addressContainer}>
          <Text style={[styles.address, { color: colors.text }]}>{address}</Text>
        </View>
      )}
    </View>
  );
};

const createStyles = (windowWidth: number, windowHeight: number, isPortrait: boolean, wp: any, hp: any) =>
  StyleSheet.create({
    outerContainer: {
      width: '100%',
    },
    mainContainer: {
      paddingBottom: 0,
      zIndex: 1,
    },
    Container: {
      flexDirection: "row",
      alignItems: "center",
      columnGap: isPortrait ? wp(2) : hp(2),
      borderRadius: isPortrait ? wp(2.5) : hp(2.5),
      paddingHorizontal: isPortrait ? wp(5) : hp(5),
      width: "100%",
      borderWidth: isPortrait ? wp(0.3) : hp(0.3),
      zIndex: 1,
    },
    titleStyle: {
      fontFamily: FontFamily.appRegular,
      fontSize: responsiveFontSize(2),
      marginBottom: isPortrait ? wp(2.5) : hp(2.5),
    },
    leftIconStyle: {
      width: isPortrait ? wp(6) : hp(6),
      height: isPortrait ? wp(6) : hp(6),
    },
    addressContainer: {
      marginTop: isPortrait ? wp(2) : hp(2),
      paddingHorizontal: isPortrait ? wp(5) : hp(5),
    },
    address: {
      fontSize: responsiveFontSize(1.8),
      fontFamily: FontFamily.appRegular,
    },
    pt5: {
      paddingTop: isPortrait ? wp(2) : hp(2),
    },
    errorText: {
      fontSize: responsiveFontSize(1.6),
      fontFamily: FontFamily.appRegular,
    },
  });

export default AutoCompleteInputField;