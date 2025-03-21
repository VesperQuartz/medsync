import { router } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { match } from 'ts-pattern';

import { useUserStore } from '~/store';

const Home = () => {
  const user = useUserStore();

  React.useEffect(() => {
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
    <View className="flex h-full items-center justify-center bg-[#1976d2]"></View>
  );
};

export default Home;
