import { useRouter } from 'expo-router';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SpecialityText } from '~/components/name';
import { Button } from '~/components/weak-button';
import Colors from '~/constants/colors';
import { useUserStore } from '~/store';

const SettingsPage = () => {
  const user = useUserStore();
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView>
        <View style={styles.header}>
          <Image
            source={{
              uri: 'https://avatar.iran.liara.run/public',
            }}
            style={styles.avatar}
          />
          <Text style={styles.name}>{user.user?.name}</Text>
          <SpecialityText style={styles.role} id={user.user!.id} />
        </View>

        <View style={styles.footer}>
          <Button
            title="Sign Out"
            variant="outline"
            onPress={() => {
              user.removeUser();
              router.replace('/(auth)/login');
            }}
            style={styles.signOutButton}
            textStyle={styles.signOutText}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  header: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: Colors.background,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  role: {
    fontSize: 16,
    color: Colors.textLight,
  },
  section: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 24,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuTitle: {
    fontSize: 16,
    color: Colors.text,
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  signOutButton: {
    width: '100%',
  },
  signOutText: {
    color: Colors.error,
  },
});

export default SettingsPage;
