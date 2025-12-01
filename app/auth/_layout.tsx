import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" />
      <Stack.Screen name="SignUp" />
      <Stack.Screen name="OTP" />
      <Stack.Screen name="ForgotPassword" />
      <Stack.Screen name="ResetPassword" />
      <Stack.Screen name="Profile" />
    </Stack>
  );
}
