import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode } from 'react';
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';

interface OnboardingLayoutProps {
  children: ReactNode;
}

const OnboardingLayout = ({ children }: OnboardingLayoutProps) => {
  return (
    <LinearGradient
      colors={['#1976d2', '#3498db', '#d4f1ff']}
      style={styles.gradient}
      locations={[0, 0.1, 2]}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
            bounces={false}
            showsVerticalScrollIndicator={false}>
            <View style={styles.content}>{children}</View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingBottom: 20,
  },
});

export default OnboardingLayout;
