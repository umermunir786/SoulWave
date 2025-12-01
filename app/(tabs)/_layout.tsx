import { Tabs, usePathname } from "expo-router";
import React from "react";

import { CustomTabBar } from "@/components";
import { useOrientation, useTheme } from "@/services";
import { MiniPlayer } from "@/components/MiniPlayer/MiniPlayer";
import { View } from "react-native";

export default function TabLayout() {
  const pathname = usePathname();
  const isWithOutTabsScreen = pathname?.includes("withOutTabs");
  const { colors } = useTheme();
  const { windowWidth, windowHeight, isPortrait, wp, hp } = useOrientation();
  // console.log(pathname);
  return (
    <View style={{ flex: 1 }}>
      <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        // tabBarActiveTintColor: colors.primary,
        headerShown: false,
        // tabBarButton: HapticTab,
        // tabBarBackground: TabBarBackground,
        tabBarLabelStyle: {
          // fontSize: responsiveFontSize(1.5),
          // fontFamily: FontFamily.appMedium,
        },
      }}
    >
      <Tabs.Screen
        name="HomeTab"
        options={{
          title: "Home",
          tabBarStyle: {
            display: pathname == "/HomeTab/Home" ? "flex" : "none",
          },
        }}
      />
      <Tabs.Screen
        name="SoundTab"
        options={{
          title: "Sounds",
          tabBarStyle: {
            display: pathname == "/SoundTab/Sounds" ? "flex" : "none",
          },
        }}
      />
      <Tabs.Screen
        name="LibraryTab"
        options={{
          title: "Library",
          tabBarStyle: {
            display: pathname == " /LibraryTab/Library" ? "flex" : "none",
          },
        }}
      />
      <Tabs.Screen
        name="ProfileTab"
        options={{
          title: "Profile",
          tabBarStyle: {
            display: pathname == "/ProfileTab/Profile" ? "flex" : "none",
          },
        }}
      />
      </Tabs>
      <MiniPlayer />
    </View>
  );
}
