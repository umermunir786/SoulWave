import { Stack } from "expo-router";

export default function SoundTabLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Sounds" />
      <Stack.Screen name="SoundLibrary" />
      <Stack.Screen name="SoundMusicPlayer" />
    </Stack>
  );
}
