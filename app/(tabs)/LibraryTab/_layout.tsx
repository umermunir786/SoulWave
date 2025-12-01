import { Stack } from "expo-router";

export default function LibraryTabLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Library" />
      <Stack.Screen name="LibraryList" />
    </Stack>
  );
}
