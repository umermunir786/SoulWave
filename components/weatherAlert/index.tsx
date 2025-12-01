import { FontFamily } from "@/constants/Fonts";
import { useOrientation } from "@/services";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";

interface ThemeColors {
  background: string;
  backgroundInverse: string;
  primaryThemeColor: string;
  primaryThemeColorLight: string;
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

interface WeatherInterface {
  icon?: string;
  text?: string;
  code?: any;
  postalCode?: string;
}

export const WeatherAlert = ({
  colors,
  weather,
}: {
  weather?: WeatherInterface;
  colors: ThemeColors;
}) => {
  const { windowWidth, windowHeight, isPortrait, wp, hp } = useOrientation();
  const styles = createStyles(
    colors,
    windowWidth,
    windowHeight,
    isPortrait,
    wp,
    hp
  );

  // Check if weather data is available
  const hasWeatherData = weather && weather.icon && weather.text;

  return (
    <View style={styles.mainView}>
      <ImageBackground
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlayContent}>
          {hasWeatherData ? (
            <>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingRight: wp(5),
                }}
              >
                <View style={styles.iconTextRow}>
                  <View style={styles.alertDot} />
                  <Text style={styles.alertTitle}>{weather.text}</Text>
                </View>
                <Image
                  style={{
                    height: wp(25),
                    width: wp(25),
                    resizeMode: "cover",
                  }}
                  source={{ uri: `https:${weather.icon}` }}
                />
              </View>
              <View style={styles.footerOuterRow}>
                <View style={styles.footerRow}>
                  <Text style={styles.postcodeLabel}>Postcode</Text>
                  <Text style={styles.postcodeValue}>
                    {weather.postalCode || "N/A"}
                  </Text>
                </View>
                <Text style={styles.sourceText}>{"Source:\nweatherapi"}</Text>
              </View>
            </>
          ) : (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>Weather data not available</Text>
              <Text style={styles.errorSubText}>Please try again later</Text>
            </View>
          )}
        </View>
      </ImageBackground>
      <Text style={styles.bottomLabel}>Weather Alert</Text>
    </View>
  );
};

export default WeatherAlert;

const createStyles = (
  colors: ThemeColors,
  windowWidth: number,
  windowHeight: number,
  isPortrait: boolean,
  wp: any,
  hp: any
) =>
  StyleSheet.create({
    mainView: {
      marginHorizontal: isPortrait ? wp(5) : hp(5),
      borderRadius: isPortrait ? wp(5) : hp(5),
      overflow: "hidden",
      backgroundColor: colors.inputFieldBackground,
      marginTop: isPortrait ? wp(2) : hp(2),
    },
    imageBackground: {
      width: "98%",
      marginLeft: isPortrait ? wp(3) : hp(0),
    },
    imageStyle: {},
    overlayContent: {
      borderRadius: wp(4),
      paddingTop: wp(5),
      paddingHorizontal: wp(4),
    },
    iconTextRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    alertDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: "orange",
      marginRight: wp(2),
    },
    alertTitle: {
      fontFamily: FontFamily.appBold,
      fontSize: responsiveFontSize(2.3),
      color: "#fff",
      width: "70%",
    },
    footerOuterRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: wp(4),
    },
    footerRow: {
      marginTop: wp(2),
    },
    postcodeLabel: {
      color: "#fff",
      fontSize: responsiveFontSize(1.8),
      fontFamily: FontFamily.appMedium,
    },
    postcodeValue: {
      color: "#fff",
      fontSize: responsiveFontSize(2),
      fontFamily: FontFamily.appBold,
    },
    sourceText: {
      marginTop: wp(2),
      marginRight: wp(4),
      fontSize: responsiveFontSize(1.5),
      textAlign: "center",
      color: "#bbb",
    },
    bottomLabel: {
      textAlign: "center",
      marginTop: wp(8),
      fontFamily: FontFamily.appBold,
      fontSize: responsiveFontSize(2.2),
      color: colors.text,
      marginBottom: isPortrait ? wp(8) : hp(8),
    },
    errorContainer: {
      paddingVertical: wp(8),
      alignItems: "center",
      justifyContent: "center",
    },
    errorText: {
      fontFamily: FontFamily.appBold,
      fontSize: responsiveFontSize(2),
      color: colors.text,
      textAlign: "center",
    },
    errorSubText: {
      fontFamily: FontFamily.appRegular,
      fontSize: responsiveFontSize(1.8),
      color: colors.textGrey,
      textAlign: "center",
      marginTop: wp(2),
    },
  });
