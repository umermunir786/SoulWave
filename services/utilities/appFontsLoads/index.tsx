import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { LogBox } from "react-native";
import FlashMessage from "react-native-flash-message";
import { useSelector } from "react-redux";

// Define context type
interface FontContextType {
  fontsLoaded: boolean;
}

const FontUpToDate = createContext<FontContextType | undefined>(undefined);

// Define provider props
interface FontProviderProps {
  children: ReactNode;
}

const FontProvider: React.FC<FontProviderProps> = ({ children }) => {
  SplashScreen.preventAutoHideAsync();

  const [status, setStatus] = useState<boolean>(false);
  LogBox.ignoreAllLogs();

  const [fontsLoaded] = useFonts({
    appRegular: require("../../../assets/fonts/Inter-Regular.ttf"),
    appBlack: require("../../../assets/fonts/Inter-Black.ttf"),
    appBlackItalic: require("../../../assets/fonts/Inter-BlackItalic.ttf"),
    appBold: require("../../../assets/fonts/Inter-Bold.ttf"),
    appBoldItalic: require("../../../assets/fonts/Inter-BoldItalic.ttf"),
    appExtraBold: require("../../../assets/fonts/Inter-ExtraBold.ttf"),
    appExtraBoldItalic: require("../../../assets/fonts/Inter-ExtraBoldItalic.ttf"),
    appItalic: require("../../../assets/fonts/Inter-Italic.ttf"),
    appLightItalic: require("../../../assets/fonts/Inter-LightItalic.ttf"),
    appExtraLightItalic: require("../../../assets/fonts/Inter-ExtraLightItalic.ttf"),
    appLight: require("../../../assets/fonts/Inter-ExtraLight.ttf"),
    appExtraLight: require("../../../assets/fonts/Inter-ExtraLight.ttf"),
    appMedium: require("../../../assets/fonts/Inter-Medium.ttf"),
    appMediumItalic: require("../../../assets/fonts/Inter-MediumItalic.ttf"),
    appSemiBold: require("../../../assets/fonts/Inter-SemiBold.ttf"),
    appSemiBoldItalic: require("../../../assets/fonts/Inter-SemiBoldItalic.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
      // router.replace("/Splash");
      // router.navigate('/appFlow/(userDrawer)/(userTabs)/home')
    }
  }, [fontsLoaded]);

  const auth = useSelector((state: any) => state.auth);

  return (
    <FontUpToDate.Provider value={{ fontsLoaded }}>
      {fontsLoaded ? children : null}
      <FlashMessage position="top" />
      <FlashMessage position="bottom" />
    </FontUpToDate.Provider>
  );
};

const useLoadedFont = (): FontContextType => {
  const context = useContext(FontUpToDate);
  if (!context) {
    throw new Error("useLoadedFont must be used within a FontProvider");
  }
  return context;
};

export { FontProvider, useLoadedFont };
