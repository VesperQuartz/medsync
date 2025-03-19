import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';

import Colors from '~/constants/colors';

export default function UserLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.tint,
        tabBarInactiveTintColor: Colors.light.subtleText,
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: Colors.light.divider,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: () => <Ionicons name="home" size={32} color="#0954B0" />,
        }}
      />
      <Tabs.Screen
        name="result"
        options={{
          title: 'Results',
          tabBarIcon: () => <Ionicons name="document-text" size={32} color="#0954B0" />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: () => <Ionicons name="settings" size={32} color="#0954B0" />,
        }}
      />
    </Tabs>
  );
}
