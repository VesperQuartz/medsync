import { useRouter } from 'expo-router';
import { ChevronRight, LogOut } from 'lucide-react-native';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';

import { Header } from '~/components/header';
import Colors from '~/constants/colors';
import { useUserStore } from '~/store';

export default function SettingsScreen() {
  const user = useUserStore();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            user.removeUser();
            router.replace('/(auth)/login');
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const navigateToProfile = () => {
    // In a real app, this would navigate to a profile screen
    Alert.alert('Navigate to profile');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Settings" />

      <ScrollView style={styles.scrollView}>
        <TouchableOpacity style={styles.profileCard} onPress={navigateToProfile}>
          <Image source={{ uri: 'https://avatar.iran.liara.run/public' }} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user.user?.name}</Text>
            <Text style={styles.profileEmail}>{user.user?.email}</Text>
          </View>
          <ChevronRight size={20} color={Colors.light.subtleText} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color="#FFFFFF" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
  },
  profileEmail: {
    fontSize: 14,
    color: Colors.light.subtleText,
    marginTop: 2,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 24,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: Colors.light.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    color: Colors.light.text,
  },
  settingValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValueText: {
    fontSize: 14,
    color: Colors.light.subtleText,
    marginRight: 4,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.danger,
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 32,
    marginBottom: 16,
    padding: 16,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  versionContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  versionText: {
    fontSize: 14,
    color: Colors.light.subtleText,
  },
});
