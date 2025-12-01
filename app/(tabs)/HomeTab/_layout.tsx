import { Stack } from "expo-router";

export default function HomeTabLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" />
      <Stack.Screen name="HomeSearch" />
      <Stack.Screen name="MeditationLibrary" />
    </Stack>
  );
}
