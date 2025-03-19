import { Link, router } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { match } from 'ts-pattern';

import { useUserStore } from '~/store';

const Home = () => {
  const user = useUserStore();

  React.useEffect(() => {
    // Add a small delay to ensure router is fully mounted
    const redirectTimer = setTimeout(() => {
      match(user.user?.role)
        .with('patient', () => {
          router.replace('/(users)');
        })
        .with('doctor', () => {
          router.replace('/(doctor)');
        })
        .otherwise(() => {
          router.push('/(auth)/login');
        });
    }, 100);

    return () => clearTimeout(redirectTimer);
  }, [user.user?.role]);

  return (
    <View className="flex h-full items-center justify-center">
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Home</Text>
      <Link href="/onboarding">onboarding</Link>
    </View>
  );
};

export default Home;
