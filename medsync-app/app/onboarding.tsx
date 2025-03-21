/* eslint-disable @typescript-eslint/no-require-imports */
import { useAssets } from 'expo-asset';
import { Image } from 'expo-image';
import { Link, useRouter } from 'expo-router';
import { Text, View, StyleSheet } from 'react-native';

import OnboardingButton from '~/components/onboard-button';
import OnboardingLayout from '~/components/onboard-layout';
import Colors from '~/constants/colors';
import { useOnBoardStore } from '~/store';

const WelcomeScreen = () => {
  const router = useRouter();

  const handleStart = () => {
    router.push('/');
  };
  const [assets] = useAssets([require('../assets/doctor.png')]);
  const onboard = useOnBoardStore();

  return (
    <OnboardingLayout>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {assets && <Image source={assets[0]} style={styles.image} />}
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>
            WELCOME TO{' '}
            <Text style={styles.brandName}>
              MED<Text style={styles.brandAccent}>SYNC</Text>
            </Text>
          </Text>
          <Text style={styles.subtitle}>
            Your healthcare journey simplified
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Link
            href="/(auth)/login"
            asChild
            onPress={() => {
              onboard.setHasSeen(true);
            }}>
            <OnboardingButton title="Start for Free" onPress={handleStart} />
          </Link>
        </View>
      </View>
    </OnboardingLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 40,
  },
  image: {
    width: 280,
    height: 280,
  },
  textContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.medsync.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  brandName: {
    fontWeight: '800',
    color: Colors.medsync.text,
  },
  brandAccent: {
    color: Colors.medsync.primary,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.medsync.lightText,
    textAlign: 'center',
    marginTop: 8,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 40,
  },
});

export default WelcomeScreen;
