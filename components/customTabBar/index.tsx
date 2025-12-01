import { FontFamily } from "@/constants/Fonts";
import { appImages, useOrientation, useTheme, wp } from "@/services";
import { BlurView } from "expo-blur";
import { usePathname } from "expo-router";
import { useState } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AlertModal } from "../alertModal";

export default function CustomTabBar({ state, descriptors, navigation }: any) {
  const { colors } = useTheme();
  const { wp, hp, isPortrait } = useOrientation();
  const insets = useSafeAreaInsets();
  const path = usePathname();

  const height = isPortrait ? wp(18) : hp(18);
  const borderRadius = isPortrait ? wp(12) : hp(12);
  const [showModal, setShowModal] = useState<boolean>(false);

  const CUSTOM_ICONS: Record<string, any> = {
    Home: appImages.homeTabIcon,
    Sounds: appImages.newsTabIcon,
    Library: appImages.alertsTabIcon,
    Profile: appImages.settingsTabIcon,
  };
  const CUSTOM_NAMES: Record<string, any> = {
    Home: "Home",
    Sounds: "Sounds",
    Library: "Library",
    Profile: "Profile",
  };

  const formatLabel = (label: string) => {
    return label.charAt(0).toUpperCase() + label.slice(1).toLowerCase();
  };

  if (
    path !== "/HomeTab/Home" &&
    path !== "/HomeTab" &&
    path !== "/SoundTab/Sounds" &&
    path !== "/SoundTab" &&
    path !== "/LibraryTab/Library" &&
    path !== "/LibraryTab" &&
    path !== "/ProfileTab" &&
    path !== "/ProfileTab/Profile"
  ) {
    return null;
  }

  return (
    <View
      style={[
        styles.container,
        {
          height,
          borderRadius,
          bottom:
            Platform.OS == "ios" ? insets.bottom   : insets.bottom + 20,
        },
      ]}
    >
      <BlurView
        intensity={80}
        tint="dark"
        style={[
          styles.blurContainer,
          {
            shadowColor: "#2927821A ",
            shadowOffset: {
              width: 0,
              height: -5,
            },
            shadowOpacity: 0.1,
            shadowRadius: 30,
            elevation: 5,
          },
        ]}
      >
        <View style={styles.blurContent}>
          {state.routes.map((route: any, index: number) => {
            const { options } = descriptors[route.key];
            const label = options.tabBarLabel ?? options.title ?? route.name;
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <TouchableOpacity
                key={index}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                onPress={onPress}
                style={styles.tabButton}
                activeOpacity={0.8}
              >
                <Image
                  source={CUSTOM_ICONS[label]}
                  style={{
                    width: wp(10),
                    height: wp(10),
                    paddingBottom: wp(2.2),
                  }}
                />
                <Text
                  style={{
                    color: colors.text,
                    fontFamily: FontFamily.appMedium,
                    fontSize: responsiveFontSize(1.5),
                  }}
                >
                  {formatLabel(label)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </BlurView>

      <AlertModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        colors={colors}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 15,
    right: 15,
    overflow: "hidden",
    zIndex: 100,
   marginHorizontal:wp(1),
   
  },
  blurContainer: {
    flex: 1,
  },
  blurContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
     paddingHorizontal:wp(2),
      
    width: "100%",
    height: "100%",
  },
  tabContent: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%",
    paddingHorizontal: 10,
  },
  tabButton: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  tabButtonText: {
    color: "#fff",
    fontFamily: FontFamily.appRegular,
    fontSize: responsiveFontSize(1.6),
  },
});
