// import { Stack } from 'expo-router';

// export default function AuthLayout() {
//   return (
//     <Stack>
//       <Stack.Screen name="login" options={{ headerShown: false }} />
//       <Stack.Screen name="signup" options={{ headerShown: false }} />
//     </Stack>
//   );
// }


import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="welcome" />
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
    </Stack>
  );
}