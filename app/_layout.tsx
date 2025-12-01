import { AudioProvider } from "@/contexts/AudioContext";
import { FontProvider, ThemeProvider } from "@/services";
import { store } from "@/store/store";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { setAudioModeAsync } from "expo-audio";
export default function RootLayout() {
  let persistor = persistStore(store);

  useEffect(() => {
    const configureAudio = async () => {
      try {
        await setAudioModeAsync({
          playsInSilentMode: true,
          shouldPlayInBackground: true,
          interruptionModeAndroid: "duckOthers",
          interruptionMode: "duckOthers",
        });
      } catch (error) {
        console.error("Error configuring audio mode", error);
      }
    };

    configureAudio();
  }, []);
  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <AudioProvider>
            <ThemeProvider>
              <FontProvider>
                <KeyboardProvider>
                  <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="index" />
                    <Stack.Screen name="OnBoarding" />
                    <Stack.Screen name="auth" />
                    <Stack.Screen name="(tabs)" />
                  </Stack>
                </KeyboardProvider>
              </FontProvider>
            </ThemeProvider>
          </AudioProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}
