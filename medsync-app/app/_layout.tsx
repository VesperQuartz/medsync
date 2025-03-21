import '../global.css';
import {
  focusManager,
  QueryClient,
  onlineManager,
  QueryClientProvider,
} from '@tanstack/react-query';
import * as Network from 'expo-network';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Platform, AppStateStatus, AppState } from 'react-native';

import { useOnBoardStore } from '~/store';

onlineManager.setEventListener(setOnline => {
  const eventSubscription = Network.addNetworkStateListener(state => {
    setOnline(!!state.isConnected);
  });
  return eventSubscription.remove;
});

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

export default function Layout() {
  const onAppStateChange = (status: AppStateStatus) => {
    if (Platform.OS !== 'web') {
      focusManager.setFocused(status === 'active');
    }
  };

  React.useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);

    return () => subscription.remove();
  }, []);
  const router = useRouter();

  const onboard = useOnBoardStore();
  React.useEffect(() => {
    if (!onboard.hasSeen) {
      router.replace('/onboarding');
    }
  }, [onboard.hasSeen]);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="onboarding"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(users)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(doctor)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="appointments-modal"
          options={{ presentation: 'modal', headerShown: false }}
        />
        <Stack.Screen name="add-appointment" options={{ headerShown: false }} />
        <Stack.Screen name="results" options={{ headerShown: false }} />
        <Stack.Screen name="history" options={{ headerShown: false }} />
      </Stack>
    </QueryClientProvider>
  );
}
