import { Stack } from "expo-router";

export default function ProfileTabLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" />
      <Stack.Screen name="EditProfile" />
      <Stack.Screen name="UpgradePlan" />
      <Stack.Screen name="Reminders" />
      <Stack.Screen name="changePassword" />
      <Stack.Screen name="Support" />
      <Stack.Screen name="DeleteAccount" />
      <Stack.Screen name="Settings" />
    </Stack>
  );
}
